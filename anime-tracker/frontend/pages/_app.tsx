import "@/styles/globals.css";
import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { createContext, useState, useContext, useEffect } from "react";
import Header from "./components/Header";

interface UserContextType {
    userToken: string;
    setUserToken: (token: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);
export const useUser = () => {
    const context = useContext(UserContext);

    if (context === null) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
};

export default function App({ Component, pageProps }: AppProps) {
    const [userToken, setUserToken] = useState<string>("");

    useEffect(() => {
        setUserToken(localStorage.getItem("userToken") ?? "");
    }, []);

    const updateUserToken = (token: string) => {
        setUserToken(token);
        localStorage.setItem("userToken", token);
    };

    return (
        <UserContext.Provider value={{ userToken: userToken, setUserToken: updateUserToken }}>
            <ThemeProvider theme={theme}>
                <Head>
                    <title>Anime App</title>
                    <meta name="description" content="Anime app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link
                        rel="icon"
                        href="https://emojis.slackmojis.com/emojis/images/1621024394/39092/cat-roll.gif?1621024394"
                    />
                </Head>
                <Header></Header>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: "url('/background.gif')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        paddingTop: "5rem",
                    }}
                >
                    <Component {...pageProps} />
                </div>
            </ThemeProvider>
        </UserContext.Provider>
    );
}
