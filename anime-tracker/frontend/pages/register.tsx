import React, { useState, useEffect, useContext } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { register } from "@/utils/api/userApi";
import { useRouter } from "next/router";
import { useUser } from "./_app";

const RegisterPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [passwordValidation, setPasswordValidation] = useState<boolean>(true);
    const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>("");
    const [accountCreationError, setAccountCreationError] = useState<string>("");

    const router = useRouter();
    const user = useUser();

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (passwordValidation && passwordMatch) {
            try {
                let token = await register(email, password);
                if (token) {
                    user.setUserToken(token);
                    router.push("/");
                }
            } catch (error: any) {
                setAccountCreationError(`${JSON.parse(error.error).error}`);
            }
        }
    };

    useEffect(() => {
        if (password && confirmPassword && password !== confirmPassword) {
            setPasswordMatch(false);
            setErrorMessage("Passwords do not match. Please try again.");
        } else {
            setPasswordMatch(true);
            setErrorMessage("");
        }
    }, [password, confirmPassword]);

    useEffect(() => {
        if (password.length !== 0 && password.length < 7) {
            setPasswordValidation(false);
            setErrorPasswordMessage("Password must be greater than 6 characters.");
        } else {
            setPasswordValidation(true);
            setErrorPasswordMessage("");
        }
    }, [password]);

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
                    Register
                </Typography>
                <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                        error={!passwordValidation}
                        helperText={errorPasswordMessage}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!passwordMatch}
                        helperText={errorMessage}
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
                        Sign Up
                    </Button>
                    <Typography
                        sx={{
                            display: accountCreationError == "" ? "none" : "default",
                            textAlign: "center",
                            backgroundColor: "#3e3561",
                            borderRadius: ".25rem",
                            padding: ".5rem",
                        }}
                    >
                        {accountCreationError}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;
