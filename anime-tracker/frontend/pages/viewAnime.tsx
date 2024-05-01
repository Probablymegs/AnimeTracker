import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Anime } from "../types";
import { Card, CardContent, Typography, Box, TextField } from "@mui/material";
import { useUser } from "./_app";
import { getAnime } from "@/utils/api/animeApi";

const ViewAnime = () => {
    const [anime, setAnime] = useState<Anime>();
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
                setAnime({ ...animeData, Id: animeId });
            }

            console.log(animeData);
        })();
    }, []);

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
                        <Typography variant="h5" component="div" sx={{ mb: "1rem", fontWeight: "bold" }}>
                            Anime Details
                        </Typography>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={anime.title}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Rating"
                            variant="outlined"
                            fullWidth
                            value={anime.rating.toString()}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Watched"
                            variant="outlined"
                            fullWidth
                            value={anime.watched ? "Yes" : "No"}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ marginBottom: 2 }}
                        />
                    </CardContent>
                </Card>
            ) : (
                <Typography variant="h6">Anime not found</Typography>
            )}
        </Box>
    );
};

export default ViewAnime;
