import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useRouter } from "next/router";
import { login } from "@/utils/api/userApi";
import { useUser } from "./_app";

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [accountError, setAccountError] = useState<string>("");
    const router = useRouter();
    const user = useUser();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            let token = await login(email, password);
            if (token) {
                user.setUserToken(token);
                router.push("/");
            }
        } catch (error: any) {
            setAccountError(`${JSON.parse(error.error).error}`);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                bgcolor: "rgba(68, 47, 87, 0.7)",
                backdropFilter: "blur(4px)",
                borderRadius: ".75rem",
                mt: "5rem",
                paddingY: "2rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            bgcolor: "#c265d6",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            color: "text.primary",
                        }}
                    >
                        Sign In
                    </Button>
                    <Typography
                        sx={{
                            display: accountError == "" ? "none" : "default",
                            textAlign: "center",
                            backgroundColor: "#3e3561",
                            borderRadius: ".25rem",
                            padding: ".5rem",
                        }}
                    >
                        {accountError}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
