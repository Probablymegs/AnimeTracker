# AnimeTracker

AnimeTracker is a web application designed to help users manage and track their anime collections. This application allows users to perform CRUD operations on their anime lists, ensuring real-time syncing and management. The project uses Next.js for the frontend, Express.js for the backend, and Firebase for authentication and database operations.

# Frontend 

## MUI documentation

https://mui.com/

The mui documentation is organized into guides, reference materials, and samples which cover a lot of topics like themeproviders, icons, and components.

### Key Concepts Learned:

-   ThemeProvider: This helped me maintain consistent styling across the application. The documentation provided clear examples on how to override default styles and apply a cohesive look.
-   Components and Props: MUI has a lot of components such as buttons, cards, dialogs, and more. Each component is highly customizable with numerous properties (props), allowing for detailed adjustments to behavior and appearance. The documentation helped me understand how to effectively use these components.

## Next.js documentation

https://nextjs.org/

Using the Next.js documentation helped me a lot. It simplified routing and page management and made creating/installing the application easy.

### Key Concepts Learned:

-   Simplified Project Setup: The documentation offers a guide on setting up a new Next.js project, including details on configuration options. This made the initial project setup quick.

## Context

I found a really cool resource that helped me use the context for managing my users.

https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/

### Key Concepts Learned:

-   Context API Basics: The documentation provided a solid foundation on the basics of the Context API, a React structure that enables components to share some data without having to pass props down manually at every level. This was essential for managing global state like user authentication.

# Frontend Tutorial

## How to handle a click event listener and how to post data to a secured REST API.

### Handling Click Events

In the provided example, the handleSubmit function is an event handler attached to a form’s onSubmit event.

```javascript
const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!ratingError && !titleError && anime) {
        try {
            let response = await createAnime(anime, user.userToken);
            if (response) {
                router.push("/animeList");
            }
        } catch (error: any) {
            setUpdateError(`${JSON.parse(error.error).error}`);
        }
    }
};

<form onSubmit={handleSubmit}>
    <Button fullWidth type="submit" sx={{ bgcolor: "#c265d6" }} disabled={ratingError}>
        Submit
    </Button>
</form>
```

handleSubmit first calls event.preventDefault() to stop the form from submitting in the traditional way, which would cause the page to reload. The function then checks for validation errors before proceeding with the data submission. If all checks are passed, it calls createAnime, which performs the API request.

### Posting Data to a Secured REST API

To ensure data is securely posted to a REST API, the createAnime function is used to send a POST request including authorization headers.

```javascript
const createAnime = async (anime: Anime, token: string) => {
    let response = await fetch(`${baseUrl}/createAnime`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: anime.title, rating: anime.rating, watched: anime.watched }),
    });

    if (!response.ok) {
        return false;
    } else {
        return true;
    }
};
```

Here, createAnime sends a POST request to a server endpoint. The Authorization header includes a JWT (Bearer token) that the server uses to verify that the request is coming from an authenticated user. This pattern ensures that only valid, authenticated requests can post data, thereby securing the API from unauthorized access.

## How to fetch data from a REST API and display the returned content to the page

Fetching data from a REST API and displaying it on a webpage involves making an API call, processing the response, and rendering the data dynamically on the page

### Fetching Data with useEffect

The useEffect hook in React is used to perform side effects in function components. In the given example, useEffect is triggered on component mount (as indicated by the empty dependency array []), where it calls a function to fetch anime data from a REST API:

```javascript
useEffect(() => {
    if (user.userToken == "") {
        return;
    }
    (async () => {
        let animeData = (await getAllAnime(user.userToken)) ?? [];
        setAnimeList(convertAnimeData(animeData));
    })();
}, []);
```

getAllAnime is an asynchronous function that fetches anime data from my backend. The function checks if the user is authenticated (by checking user.userToken). If the token is not present, it skips the fetch operation. Otherwise, it retrieves the data and stores it in the animeList state after transforming it through convertAnimeData, which is a function to format the data.

### Displaying Data

Once data is fetched and stored in the state, it can be rendered using JSX.

```javascript
{
    animeList.map((anime) => (
        <TableRow key={anime.id}>
            <TableCell component="th" scope="row">
                {anime.title}
            </TableCell>
            <TableCell align="right">{anime.rating.toString()}</TableCell>
            <TableCell align="right">{anime.watched ? "Yes" : "No"}</TableCell>
            <TableCell align="right">
                <IconButton onClick={() => router.push(`/viewAnime?animeId=${anime.id}`)} color="primary">
                    <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => router.push(`/editAnime?animeId=${anime.id}`)} color="primary">
                    <AutoFixHighIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(anime.id)} color="primary">
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    ));
}
```

I am using the .map() function to create a TableRow for each item in animeList. Each row displays the anime's title, rating, and watched status. Additionally, action buttons are included to allow the user to view, edit, or delete an anime, which are linked to different routes or functions.

### Making the API Call

The getAllAnime function shows the logic to make the GET request to the REST API

```javascript
const getAllAnime = async (token: string) => {
    let response = await fetch(`${baseUrl}/getAllAnime`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        return null;
    } else {
        return await response.json();
    }
};
```

This function demonstrates how to use the Fetch API to make a GET request with authorization headers. The use of a bearer token (Authorization: Bearer ${token}) ensures that the request is authenticated, and the API responds with data specific to the authenticated user.


# Backend

## Firebase documentation

https://firebase.google.com/docs

The Firebase documentation is organized into guides, reference materials, and samples which cover a lot of topics including user authentication, realtime databases, and cloud functions.

### Key Concepts Learned:

-   User Authentication: Firebase Auth provided support for secure user authentication, which I utilized to manage user sessions. Learning to implement registration, login, and user session management using Firebase's SDK was easy thanks to the docs.

-   Realtime Database Operations: The documentation helped me understand how to interact with Firebase Realtime Database. It covered CRUD operations which were essential for storing and retrieving user data in real time.

## Express.js documentation

https://expressjs.com/en/guide/routing.html

By exploring the express.js website, I was able to find resources for installing express.js, routing, and creating/using middleware.

### Key Concepts Learned:

-   Routing: The documentation detailed how to define routes using Express.js. I learned how to manage different HTTP methods at various endpoints effectively.
-   Middleware: Understanding middleware in Express.js was critical. It helped me implement functions that can execute any code, modify request and response objects, and finish the request-response cycle. This concept was very very useful for integrating authentication checks and logging request details.

# Backend Tutorial

## Perform CRUD operations and write queries on Anime data

The Firebase Admin SDK enables server-side interactions with Firebase services, allowing developers to manage authentication, databases, and other Firebase features programmatically. You can use the Admin SDK to perform Create, Read, Update, and Delete (CRUD) operations on Firebase Realtime Database.

### Creating Data

To create data in the Firebase Realtime Database using the Admin SDK, you can use the push() method. This method generates a unique key for each new child. Here's an example from the provided code where a new anime record is created under a specific user node:

```javascript
const usersRef = ref.child(decodedToken.uid);
usersRef.push({
    title: req.body.title,
    rating: req.body.rating,
    watched: req.body.watched,
});
```

In this snippet, decodedToken.uid uniquely identifies a user, and the push() method adds a new anime with title, rating, and watched status under this user's node in the database.

### Reading Data

For reading data, you can retrieve either a single item or multiple items. To fetch a single item, you use the child() method to specify the path and once('value') to get the data:

```javascript
const animeRef = usersRef.child(req.query.animeId);
animeRef.once("value", (data) => {
    res.json(data.val());
});
```

This code retrieves a specific anime identified by req.query.animeId.

### Reading a list of records

For fetching multiple items, you query the entire collection under a user node as follows:

```javascript
usersRef.once("value", (data) => {
    res.json(data.val());
});
```

### Updating Data

Updating data is straightforward with the update() method. You specify the node you want to update using the child() method and then call update() with the new data:

```javascript
const animeRef = usersRef.child(req.query.animeId);
animeRef.update({
    title: req.body.title,
    rating: req.body.rating,
    watched: req.body.watched,
});
```

This code updates the anime's details at the specified node.

### Deleting Data

To delete data, you use the remove() method. It deletes the specified node and all data within it:

```javascript
const animeRef = usersRef.child(req.query.animeId);
animeRef.remove();
```

This removes the anime record completely from the database.

## Create REST API endpoints to perform CRUD operations and execute queries on Anime data

Creating REST API endpoints for CRUD operations using Express.js involves setting up a server, defining routes to handle requests, and integrating with a database for persistent data storage. Below is a tutorial on how to do this within a Node.js environment using Express.js and Firebase for user authentication and data management.

To begin, you initialize an Express application and define middleware like cors() and express.json() to handle cross-origin requests and parse JSON request bodies

```javascript
const app = express();
app.use(cors());
app.use(express.json());
```

Next, you define endpoints for each CRUD operation. For instance, the createAnime endpoint allows users to add new anime entries to their collection. This POST route expects the user to be authenticated, which is checked using the extractToken middleware. If authentication is successful, the user's unique ID from Firebase is used to save their anime data to a Firebase Realtime Database:

```javascript
app.post("/createAnime", extractToken, async (req, res) => {
    try {
        let decodedToken = await admin.auth().verifyIdToken(req.token, true);
        const usersRef = ref.child(decodedToken.uid);
        usersRef.push({
            title: req.body.title,
            rating: req.body.rating,
            watched: req.body.watched,
        });
        res.status(200).json({ status: "Create was successful." });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});
```

For reading, updating, and deleting data, the application includes routes like getAnime, updateAnime, and deleteAnime. Each route uses the same extractToken middleware to ensure that requests are authenticated. The getAnime route, for example, retrieves specific anime data based on the anime ID provided in the query parameters. It uses Firebase's .once('value') method to fetch data once from the specified database reference:

```javascript
app.get("/getAnime", extractToken, async (req, res) => {
    try {
        let decodedToken = await admin.auth().verifyIdToken(req.token, true);
        const usersRef = ref.child(decodedToken.uid);
        const animeRef = usersRef.child(req.query.animeId ?? "");
        let anime;
        await animeRef.once("value", (data) => {
            anime = data.val();
        });
        res.status(200).json(anime);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});
```

## Authenticating users with JWT

### User Login and JWT Generation

To authenticate a user and generate a JSON Web Token (JWT), the /login endpoint is used. When a user submits their credentials (email and password) via a POST request, the signInWithEmailAndPassword function from the Firebase Auth library is utilized to authenticate the user. If the credentials are correct, Firebase returns a user object, from which you can retrieve the JWT. This token serves as a secure means to manage sessions and authorize subsequent requests made by the authenticated user.

```javascript
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});
```

signInWithEmailAndPassword checks the user's credentials against those stored in Firebase. Upon successful authentication, it retrieves a JWT (getIdToken()), which is then returned to the client. This token can be used to authenticate API requests by including it in the Authorization header of subsequent requests.

### Middleware for Token Verification

To ensure that a user is authenticated for certain actions, middleware can be used to verify the JWT from the request's Authorization header. The extractToken middleware checks for the presence of the token and validates it. If the token is valid, the middleware allows the request to proceed; if not, it sends an error response.

```javascript
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
```

### Verifying the Token

In subsequent requests where authentication is required, such as fetching user-specific data or performing actions that require user identity, the application verifies the JWT using admin.auth().verifyIdToken. This Firebase Admin SDK function checks the validity of the token against Firebase’s authentication backend.

```javascript
app.post("/verifyAuth", extractToken, async (req: any, res) => {
    try {
        await admin.auth().verifyIdToken(req.token, true);
        res.status(200).json("Authorized!");
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});
```

## Logout or revoke a JWT

### Endpoint for Logout

The /logout endpoint demonstrates how to revoke a JWT. When this endpoint is accessed, it ensures that any further use of the JWT will be unauthorized.

```javascript
app.post("/logout", extractToken, async (req: any, res) => {
    try {
        let decodedToken = await admin.auth().verifyIdToken(req.token, true);

        await admin.auth().revokeRefreshTokens(decodedToken.uid);
        res.status(200).json("Logout successful.");
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});
```

The extractToken middleware first retrieves the token from the request header and verifies its integrity and authenticity. Once the token is confirmed to be valid, admin.auth().verifyIdToken() decodes the token to extract user details, specifically the user ID (UID). The next step is admin.auth().revokeRefreshTokens(), which invalidates all refresh tokens issued to the user, preventing new access tokens from being issued. By revoking the refresh tokens, Firebase ensures that no new access tokens can be generated using the compromised or outdated refresh tokens.

## How to restrict access to REST API endpoints

Below are the steps to ensure the endpoint is secure. 

### 1. Using middleware to extract the token
This middleware function extractToken checks for the presence of an Authorization header and validates its format to ensure it contains a Bearer token.

```javascript 
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
```

### 2. Token Verification
In the /createAnime endpoint, after the token is extracted by the middleware, it is verified using Firebase Admin SDK. This verification checks the authenticity of the token and whether it has expired.

```javascript 
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
```
Here, verifyIdToken decodes and verifies the ID token. If verification fails (e.g., if the token is invalid or expired), it will throw an error that is caught in the catch block, resulting in a 401 Unauthorized response.


