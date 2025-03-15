// src/theme.js
import {createTheme} from "@mui/material/styles";
import {red} from "@mui/material/colors";

// Tạo theme
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#000000",
      secondary: red.A400,
    },
  },
  components: {
    MuiAppBar: {
      height: "100px",
    },
  },
});

export default theme;
