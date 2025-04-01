import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Box, ThemeProvider} from "@mui/material";
import theme from "./theme";
import AppBar from "./components/Global/Header";
import Body from "./components/Body/index";
import Footer from "./components/Global/Footer";
import ShowTime from "./components/Showtimes/index";
import Film from "./components/ShowFilm/index";
import Cinema from "./components/Cinema/index";
import {db} from "./db.config"; // Kiểm tra xem file này có đúng không
import {collection, getDocs} from "firebase/firestore";

function App() {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "movie"));
        const movies = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("🔥 Dữ liệu từ Firestore:", movies);
      } catch (error) {
        console.error("❌ Lỗi khi lấy dữ liệu Firestore:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box>
          <AppBar />
          <Routes>
            <Route path='/' element={<Body />} />
            <Route path='/lichchieu' element={<ShowTime />} />
            <Route path='/phim' element={<Film />} />
            <Route path='/rap' element={<Cinema />} />
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
