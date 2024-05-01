import express, { Response, NextFunction } from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import * as admin from "firebase-admin";

var serviceAccount = require("../courseproject-8e4b3-firebase-adminsdk-tncqu-9ff5e10e9a.json");
require("dotenv").config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://courseproject-8e4b3-default-rtdb.firebaseio.com",
});

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = admin.database();
const ref = db.ref();

function extractToken(req: any, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ error: "No credentials sent!" });
    }

    if (authorizationHeader.startsWith("Bearer ")) {
        const token = authorizationHeader.substring(7, authorizationHeader.length);
        req.token = token;
        next();
    } else {
        res.status(401).json({ error: "Invalid Authorization header. Use Bearer token." });
    }
}

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        res.json({ token: token });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

app.post("/logout", extractToken, async (req: any, res) => {
    try {
        let decodedToken = await admin.auth().verifyIdToken(req.token, true);
        await admin.auth().revokeRefreshTokens(decodedToken.uid);

        res.status(200).json("Logout successful.");
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

app.post("/verifyAuth", extractToken, async (req: any, res) => {
    try {
        await admin.auth().verifyIdToken(req.token, true);

        res.status(200).json("Authorized!");
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        res.json({ token });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

app.post("/createAnime", extractToken, async (req: any, res) => {
    try {
        let decodedToken = await admin.auth().verifyIdToken(req.token, true);
        const usersRef = ref.child(decodedToken.uid);
        usersRef.push({
            title: req.body.title,
            rating: req.body.rating,
            watched: req.body.watched,
        });

        res.status(200).json({ status: "Create was successful." });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

app.get("/getAnime", extractToken, async (req: any, res) => {
    try {
        let decodedToken = await admin.auth().verifyIdToken(req.token, true);
        const usersRef = ref.child(decodedToken.uid);
        const animeRef = usersRef.child((req.query.animeId as string | undefined) ?? "");
        let anime;
        await animeRef.once("value", (data) => {
            anime = data.val();
        });

        res.status(200).json(anime);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

app.get("/getAllAnime", extractToken, async (req: any, res) => {
    try {
        let decodedToken = await admin.auth().verifyIdToken(req.token, true);
        const usersRef = ref.child(decodedToken.uid);
        let userAnime;

        await usersRef.once("value", (data) => {
            userAnime = data.val();
        });

        res.status(200).json(userAnime);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

app.post("/updateAnime", extractToken, async (req: any, res) => {
    try {
        let decodedToken = await admin.auth().verifyIdToken(req.token, true);
        const usersRef = ref.child(decodedToken.uid);
        const animeRef = usersRef.child((req.query.animeId as string | undefined) ?? "");

        await animeRef.update(req.body);

        res.status(200).json({ status: "Update was successful." });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

app.post("/deleteAnime", extractToken, async (req: any, res) => {
    try {
        let decodedToken = await admin.auth().verifyIdToken(req.token, true);
        const usersRef = ref.child(decodedToken.uid);
        const animeRef = usersRef.child((req.query.animeId as string | undefined) ?? "");

        await animeRef.remove();

        res.status(200).json({ status: "Delete was successful." });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
