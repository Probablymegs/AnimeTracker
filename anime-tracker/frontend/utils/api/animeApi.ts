import { Anime } from "@/types";
import { baseUrl } from "../apiUrl";

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

const getAnime = async (token: string, animeId: string) => {
    let response = await fetch(`${baseUrl}/getAnime?animeId=${animeId}`, {
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

const updateAnime = async (anime: Anime, token: string, animeId: string) => {
    let response = await fetch(`${baseUrl}/updateAnime?animeId=${animeId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: anime.title, rating: anime.rating, watched: anime.watched }),
    });

    if (response.ok) {
        return true;
    } else {
        const errorBody = await response.text();
        try {
            const errorData = JSON.parse(errorBody);

            throw { status: response.status, error: errorData };
        } catch {
            throw { status: response.status, error: errorBody };
        }
    }
};

const deleteAnime = async (token: string, animeId: string) => {
    let response = await fetch(`${baseUrl}/deleteAnime?animeId=${animeId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        return false;
    } else {
        return true;
    }
};

export { createAnime, getAnime, getAllAnime, updateAnime, deleteAnime };
