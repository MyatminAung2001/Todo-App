import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useState } from "react";

export const ModeContext = createContext();

const ThemeApp = ({ children }) => {
    const [mode, setMote] = useState("dark");

    const changeMode = () => {
        setMote(mode === "dark" ? "light" : "dark");
    };

    const theme = createTheme({
        palette: {
            mode,
            ...(mode === "dark" ? {
                text: {
                    fade: '#888',
                    light: '#fff'
                }
            } : {
                text: {
                    fade: '#888',
                    light: '#000'
                }
            })
        }
    });

    return (
        <ModeContext.Provider value={changeMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ModeContext.Provider>
    )
};

export default ThemeApp;