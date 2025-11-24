import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // --- LIGHT MODE ---
            primary: {
              main: "#0077ff",
              light: "#66aaff",
              dark: "#005acc",
            },
            secondary: {
              main: "#9d9d9d",
            },
            background: {
              default: "#f7f9fc",
              paper: "#ffffff",
            },
            text: {
              primary: "#1a1a1a",
              secondary: "#555",
            },
          }
        : {
            // --- DARK MODE ---
            primary: {
              main: "#4dabf7",
              light: "#82c0ff",
              dark: "#1a73e8",
            },
            secondary: {
              main: "#b5b5b5",
            },
            background: {
              default: "#0e1117",
              paper: "#161b22",
            },
            text: {
              primary: "#e6edf3",
              secondary: "#9ba3af",
            },
          }),
    },

    typography: {
      fontFamily: "'Roboto Variable', sans-serif",
    },

    shape: {
      borderRadius: 8,
    },
  });
