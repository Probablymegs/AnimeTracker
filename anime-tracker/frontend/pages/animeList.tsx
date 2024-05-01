// AnimeList.tsx
import React, { useEffect, useState } from "react";
import { Anime, AnimeData } from "../types";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { deleteAnime, getAllAnime } from "@/utils/api/animeApi";
import { useUser } from "./_app";
import { useRouter } from "next/router";

const AnimeList = () => {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const user = useUser();
    const router = useRouter();

    function convertAnimeData(animeData: AnimeData): Anime[] {
        return Object.entries(animeData).map(([id, { title, rating, watched }]) => ({
            id,
            title,
            rating,
            watched,
        }));
    }

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
            let animeData = (await getAllAnime(user.userToken)) ?? [];
            setAnimeList(convertAnimeData(animeData));
        })();
    }, []);

    const handleDelete = async (id: string) => {
        let response = await deleteAnime(user.userToken, id);
        if (response) {
            let animeData = (await getAllAnime(user.userToken)) ?? [];
            setAnimeList(convertAnimeData(animeData));
        }
    };

    return animeList.length !== 0 ? (
        <TableContainer component={Paper} sx={{ maxWidth: "md", margin: "auto", marginTop: 4 }}>
            <Table aria-label="anime table">
                <TableHead sx={{ bgcolor: "#595078" }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Rating
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Watched
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {animeList.map((anime) => (
                        <TableRow key={anime.id}>
                            <TableCell component="th" scope="row">
                                {anime.title}
                            </TableCell>
                            <TableCell align="right">{anime.rating.toString()}</TableCell>
                            <TableCell align="right">{anime.watched ? "Yes" : "No"}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    onClick={() => router.push(`/viewAnime?animeId=${anime.id}`)}
                                    color="primary"
                                >
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => router.push(`/editAnime?animeId=${anime.id}`)}
                                    color="primary"
                                >
                                    <AutoFixHighIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(anime.id)} color="primary">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) : (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 4, padding: 2, width: "100%" }}>
            <Typography variant="h6">Anime not found</Typography>
        </div>
    );
};

export default AnimeList;
