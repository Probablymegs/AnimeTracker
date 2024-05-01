"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const admin = __importStar(require("firebase-admin"));
var serviceAccount = require("../courseproject-8e4b3-firebase-adminsdk-tncqu-9ff5e10e9a.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://courseproject-8e4b3-default-rtdb.firebaseio.com",
});
const firebaseConfig = {
    apiKey: "AIzaSyDRfuPOWdv0D2assCnHRx2ClfqZ1CGF21w",
    authDomain: "courseproject-8e4b3.firebaseapp.com",
    projectId: "courseproject-8e4b3",
    storageBucket: "courseproject-8e4b3.appspot.com",
    messagingSenderId: "243068431126",
    appId: "1:243068431126:web:98b56b64b52540c71a7e37",
};
const firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
const auth = (0, auth_1.getAuth)(firebaseApp);
const db = admin.database();
const ref = db.ref();
function extractToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: "No credentials sent!" });
    }
    if (authorizationHeader.startsWith("Bearer ")) {
        const token = authorizationHeader.substring(7, authorizationHeader.length);
        req.token = token;
        next();
    }
    else {
        res.status(401).json({ error: "Invalid Authorization header. Use Bearer token." });
    }
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3000;
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userCredential = yield (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
        const token = yield userCredential.user.getIdToken();
        res.json({ token: token });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}));
app.post("/logout", extractToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let decodedToken = yield admin.auth().verifyIdToken(req.token, true);
        yield admin.auth().revokeRefreshTokens(decodedToken.uid);
        res.status(200).json("Logout successful.");
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}));
app.post("/verifyAuth", extractToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield admin.auth().verifyIdToken(req.token, true);
        res.status(200).json("Authorized!");
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}));
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userCredential = yield (0, auth_1.createUserWithEmailAndPassword)(auth, email, password);
        const token = yield userCredential.user.getIdToken();
        res.json({ token });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}));
app.post("/createAnime", extractToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let decodedToken = yield admin.auth().verifyIdToken(req.token, true);
        const usersRef = ref.child(decodedToken.uid);
        usersRef.push({
            title: req.body.title,
            rating: req.body.rating,
            watched: req.body.watched,
        });
        res.status(200).json({ status: "Create was successful." });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}));
app.get("/getAnime", extractToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let decodedToken = yield admin.auth().verifyIdToken(req.token, true);
        const usersRef = ref.child(decodedToken.uid);
        const animeRef = usersRef.child((_a = req.query.animeId) !== null && _a !== void 0 ? _a : "");
        let anime;
        yield animeRef.once("value", (data) => {
            anime = data.val();
        });
        res.status(200).json(anime);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}));
app.get("/getAllAnime", extractToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let decodedToken = yield admin.auth().verifyIdToken(req.token, true);
        const usersRef = ref.child(decodedToken.uid);
        let userAnime;
        yield usersRef.once("value", (data) => {
            userAnime = data.val();
        });
        res.status(200).json(userAnime);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}));
app.post("/updateAnime", extractToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        let decodedToken = yield admin.auth().verifyIdToken(req.token, true);
        const usersRef = ref.child(decodedToken.uid);
        const animeRef = usersRef.child((_b = req.query.animeId) !== null && _b !== void 0 ? _b : "");
        yield animeRef.update(req.body);
        res.status(200).json({ status: "Update was successful." });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}));
app.post("/deleteAnime", extractToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        let decodedToken = yield admin.auth().verifyIdToken(req.token, true);
        const usersRef = ref.child(decodedToken.uid);
        const animeRef = usersRef.child((_c = req.query.animeId) !== null && _c !== void 0 ? _c : "");
        yield animeRef.remove();
        res.status(200).json({ status: "Delete was successful." });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
