import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import theme from "./theme";

// Components
import Footer from "./components/Global/Footer";
import Body from "./components/Body";
import ShowTime from "./components/Showtimes";
import Film from "./components/ShowFilm";
import Cinema from "./components/Cinema";
import FilmList from "./components/DataConTrol/Film/FilmList";
import FilmAdd from "./components/DataConTrol/Film/FilmAdd";
import FilmEdit from "./components/DataConTrol/Film/FilmEdit";
import TheaterList from "./components/DataConTrol/Cinema/TheaterList";
import TheaterAdd from "./components/DataConTrol/Cinema/TheaterAdd";
import ShowtimeList from "./components/DataConTrol/ShowTime/ShowtimeList";
import ShowtimeAdd from "./components/DataConTrol/ShowTime/ShowtimeAdd";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Navbar from "./components/Global/Header"; // Import Navbar
import UserList from "./components/DataConTrol/Users/UserList";
import UserAdd from "./components/DataConTrol/Users/UserAdd";
import UserEdit from "./components/DataConTrol/Users/UserEdit";
import News from "./components/News/index";
import MovieDetail from "./components/BuyTicket/MovieDetail";
import ConfirmTicket from "./components/ConfirmTicket/index";
import MyTickets from "./components/MyTicket/index";
import { Navigate } from "react-router-dom";
import SeatSelection from "./components/SeatSelection/SeatSelection";
function AppWrapper() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Kiểm tra token khi load app

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserData(null);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        if (storedUser) {
          setUserData(storedUser); // Cập nhật userData nếu tồn tại
        }
      } catch (error) {
        console.error("Lỗi khi đọc userData từ localStorage:", error);
      }
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar userData={userData} onLogout={handleLogout} />

      <Box component="main" flexGrow={1} mt={2}>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/lichchieu" element={<ShowTime />} />
          <Route path="/phim" element={<Film />} />
          <Route path="/rap" element={<Cinema />} />
          <Route path="/thanh-vien" element={<Body />} />
          {/* Trang dành cho Admin */}
          <Route path="/quan-ly-phim" element={<FilmList />} />
          <Route path="/phim/them" element={<FilmAdd />} />
          <Route path="/phim/sua/:id" element={<FilmEdit />} />
          <Route path="/rap/them" element={<TheaterAdd />} />
          <Route path="/quan-ly-rap" element={<TheaterList />} />
          <Route path="/quan-ly-suat-chieu" element={<ShowtimeList />} />
          <Route path="/suatchieu/them" element={<ShowtimeAdd />} />
          {/* Đăng nhập, đăng ký */}
          <Route path="/login" element={<Login setUserData={setUserData} />} />
          <Route
            path="/register"
            element={<Register setUserData={setUserData} />}
          />
          <Route path="/quan-ly-nguoi-dung" element={<UserList />} />
          <Route path="/them-nguoi-dung" element={<UserAdd />} />
          <Route path="/sua-nguoi-dung/:email" element={<UserEdit />} />
          <Route path="/news" element={<News />} />
          <Route path="/movie-detail/:id" element={<MovieDetail />} />\
          <Route path="/confirm-ticket" element={<ConfirmTicket />} />
          <Route
            path="/my-ticket"
            element={
              userData ? (
                <MyTickets email={userData.email} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/select-seat" element={<SeatSelection />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppWrapper />
      </Router>
    </ThemeProvider>
  );
}

export default App;
