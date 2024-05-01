export type Anime = {
    id: string;
    title: string;
    rating: number;
    watched: boolean;
};

export type AnimeData = {
    [key: string]: {
        title: string;
        rating: number;
        watched: boolean;
    };
};
