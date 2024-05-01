# Resources

The guides I used to complete the frontend was the MUI documentation, Next.js documentation, and other online resources for specific problems I encountered. I also used the information I learnt within Capstone and my other javascript classes.

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
