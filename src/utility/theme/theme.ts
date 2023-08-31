import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      light: "#42a5f5",
      main: "#1976d2",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ba68c8",
      main: "#9c27b0",
      dark: "#7b1fa2",
      contrastText: "#000",
    },
    error: {
      light: "#ef5350",
      main: "#d32f2f",
      dark: "#c62828",
      contrastText: "#fff",
    },
    warning: {
      light: "#ff9800",
      main: "#fb8c00",
      dark: "#f57c00",
      contrastText: "#000",
    },
    info: {
      light: "#009688",
      main: "#00897b",
      dark: "#00796b",
      contrastText: "#fff",
    },
    success: {
      light: "#009900",
      main: "#008000",
      dark: "#006600",
      contrastText: "#fff",
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
