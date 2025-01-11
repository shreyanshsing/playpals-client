import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "rgba(77, 136, 255, 1)"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "5px",
                    textTransform: "none",
                    padding: "10px 20px",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    fontFamily: "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif"
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "5px",
                    fontFamily: "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif"
                },
            }
        }
    },
    typography: {
        fontFamily: "Rubik Vinyl, sans-serif",
        'body2': {
            fontFamily: "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif",
            fontSize: "1rem",
            fontWeight: 300,
        },
        'h3': {
            color: 'rgba(77, 136, 255, 1)',
            fontSize: '1.5rem',
            fontWeight: 400,
        }
    },
});

export default theme;