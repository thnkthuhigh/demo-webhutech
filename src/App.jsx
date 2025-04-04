// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

// Components
import AppBar from "./components/Global/Header";
import Footer from "./components/Global/Footer";
import Body from "./components/Body";
import ShowTime from "./components/Showtimes";
import Film from "./components/ShowFilm";
import Cinema from "./components/Cinema";
import FilmList from "./components/DataConTrol/FilmList";
import FilmAdd from "./components/DataConTrol/FilmAdd";
import FilmEdit from "./components/DataConTrol/FilmEdit";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <AppBar />

          <Box component="main" flexGrow={1} mt={2}>
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/lichchieu" element={<ShowTime />} />
              <Route path="/phimx" element={<FilmList />} />
              <Route path="/phim/them" element={<FilmAdd />} />
              <Route path="/phim/sua/:id" element={<FilmEdit />} />
              <Route path="/phim" element={<Film />} />
              <Route path="/rap" element={<Cinema />} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
