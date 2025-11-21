import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#007FFF",
      },
      secondary: {
        main: "#9d9d9d",
      },
    },
    typography: {
      fontFamily: "'Roboto Variable', sans-serif",
    },
  });
