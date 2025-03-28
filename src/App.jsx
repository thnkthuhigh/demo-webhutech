import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Box, ThemeProvider} from "@mui/material";
import theme from "./theme";
import AppBar from "./components/Global/Header";
import Body from "./components/Body/index";
import Footer from "./components/Global/Footer";
import ShowTime from "./components/Showtimes/index";
import Film from "./components/ShowFilm/index";
// import Cinema from "./components/Cinema/index";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box>
          <AppBar />
          <Routes>
            <Route path='/' element={<Body />} />
            <Route path='/lich-chieu' element={<ShowTime />} />
            <Route path='/phim-dang-chieu' element={<Film />} />
            {/* <Route path='/rap-chieu' element={<Cinema />} /> */}
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
