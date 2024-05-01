import { createTheme } from "@mui/material/styles";
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#c7c8d9",
        },
        secondary: {
            main: "#9798bf",
        },
        background: {
            default: "#141414",
            paper: "#736899",
        },
        text: {
            primary: "#ffffff",
            secondary: "#d1d1d1",
        },
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root.Mui-error": {
                        "& fieldset": {
                            borderColor: "#d93fb0",
                        },
                    },
                    "& .MuiFormHelperText-root.Mui-error": {
                        color: "#d93fb0",
                    },
                    "& .MuiInputLabel-root.Mui-error": {
                        color: "#d93fb0",
                    },
                    "& .MuiInputLabel-asterisk.Mui-error": {
                        color: "#d93fb0",
                    },
                },
            },
        },
    },
});

export default theme;
