import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Anime } from "../types";
import { Card, CardContent, Typography, Box, TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
import { useUser } from "./_app";
import { getAnime, updateAnime } from "@/utils/api/animeApi";

const EditAnime = () => {
    const [anime, setAnime] = useState<Anime>();
    const [ratingError, setRatingError] = useState(false);
    const [ratingText, setRatingText] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [updateError, setUpdateError] = useState<string>("");

    const user = useUser();
    const router = useRouter();
    const { animeId } = router.query;

    useEffect(() => {
        if (user.userToken == "") {
            router.push("/login");
        }
    }, [user.userToken]);

    useEffect(() => {
        if (user.userToken == "") {
            return;
        }
        (async () => {
            let animeData = await getAnime(user.userToken, animeId as string);
            if (animeData) {
                setAnime({ ...animeData, Id: 0 });
            }
        })();
    }, []);

    useEffect(() => {
        if (!anime) {
            return;
        }
        if (anime.rating < 1 || anime.rating > 10) {
            setRatingError(true);
            setRatingText("Rating must be between 1 and 10");
        } else {
            setRatingError(false);
            setRatingText("");
        }
    }, [anime?.rating]);

    useEffect(() => {
        if (!anime) {
            return;
        }
        if (anime.title.trim().length < 1) {
            setTitleError(true);
            setTitleText("Title cannot be blank");
        } else {
            setTitleError(false);
            setTitleText("");
        }
    }, [anime?.title]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!ratingError && !titleError && anime && typeof animeId == "string") {
            try {
                let response = await updateAnime(anime, user.userToken, animeId);
                if (response) {
                    router.push("/animeList");
                }
            } catch (error: any) {
                setUpdateError(`${JSON.parse(error.error).error}`);
            }
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 4,
                padding: 2,
                width: "100%",
            }}
        >
            {anime ? (
                <Card
                    sx={{
                        maxWidth: 600,
                        width: "100%",
                        boxShadow: 4,
                        m: 1,
                        bgcolor: "rgba(68, 47, 87, 0.7)",
                        backdropFilter: "blur(4px)",
                        borderRadius: ".75rem",
                    }}
                >
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Typography variant="h5" component="div" sx={{ mb: "1rem", fontWeight: "bold" }}>
                                Edit Anime Details
                            </Typography>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={anime.title}
                                sx={{ marginBottom: 2 }}
                                helperText={titleText}
                                error={titleError}
                                onChange={(event: any) =>
                                    setAnime((prevAnime) =>
                                        prevAnime ? { ...prevAnime, title: event.target.value } : prevAnime
                                    )
                                }
                            />
                            <TextField
                                type="number"
                                label="Rating"
                                variant="outlined"
                                fullWidth
                                value={anime.rating.toString()}
                                sx={{ marginBottom: 2 }}
                                inputProps={{
                                    min: "0",
                                    max: "10",
                                }}
                                helperText={ratingText}
                                error={ratingError}
                                onChange={(event: any) =>
                                    setAnime((prevAnime) =>
                                        prevAnime ? { ...prevAnime, rating: event.target.value } : prevAnime
                                    )
                                }
                            />
                            <FormControlLabel
                                label="Watched"
                                control={
                                    <Checkbox
                                        checked={anime.watched}
                                        color="primary"
                                        inputProps={{ "aria-label": "Watched checkbox" }}
                                    />
                                }
                                sx={{ marginBottom: 2 }}
                                onChange={(event: any) =>
                                    setAnime((prevAnime) =>
                                        prevAnime ? { ...prevAnime, watched: event.target.checked } : prevAnime
                                    )
                                }
                            />
                            <Button fullWidth type="submit" sx={{ bgcolor: "#c265d6" }} disabled={ratingError}>
                                Submit
                            </Button>
                            <Typography
                                sx={{
                                    display: updateError == "" ? "none" : "default",
                                    textAlign: "center",
                                    backgroundColor: "#3e3561",
                                    borderRadius: ".25rem",
                                    padding: ".5rem",
                                }}
                            >
                                {updateError}
                            </Typography>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <Typography variant="h6">Anime not found</Typography>
            )}
        </Box>
    );
};

export default EditAnime;
