import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useUser } from "../_app";
import { logout } from "@/utils/api/userApi";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function Header() {
    const [animeAnchorEl, setAnimeAnchorEl] = useState(null);
    const openAnime = Boolean(animeAnchorEl);

    const router = useRouter();
    const user = useUser();

    const handleLogout = async () => {
        await logout(user.userToken);
        user.setUserToken("");
        router.push("/");
    };

    return (
        <AppBar position="fixed" color="default">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }} href="/">
                    <img
                        src="https://emojis.slackmojis.com/emojis/images/1621024394/39092/cat-roll.gif?1621024394"
                        width="28"
                    />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Button
                        endIcon={<AutoAwesomeIcon />}
                        sx={{
                            color: "text.primary",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            textTransform: "none",
                        }}
                        onClick={() => router.push("/animeList")}
                    >
                        Anime List
                    </Button>
                    <Button
                        endIcon={<AutoAwesomeIcon />}
                        sx={{
                            color: "text.primary",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            textTransform: "none",
                        }}
                        onClick={() => router.push("/createAnime")}
                    >
                        Create Anime
                    </Button>
                </Typography>
                {user.userToken == "" ? (
                    <>
                        <Button
                            endIcon={<AutoAwesomeIcon />}
                            sx={{ color: "text.primary", fontWeight: "bold" }}
                            onClick={() => router.push("/login")}
                        >
                            Login
                        </Button>
                        <Button
                            endIcon={<AutoAwesomeIcon />}
                            sx={{ color: "text.primary", fontWeight: "bold" }}
                            onClick={() => router.push("/register")}
                        >
                            Register
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            endIcon={<AutoAwesomeIcon />}
                            sx={{ color: "text.primary", fontWeight: "bold" }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
