import { useState, useEffect } from "react";
import { db } from "../../../db.config";
import { collection, getDocs } from "firebase/firestore";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShowtimeList = () => {
  const [showtimes, setShowtimes] = useState([]);
  const navigate = useNavigate(); // Đưa useNavigate ra ngoài useEffect

  useEffect(() => {
    const fetchShowtimes = async () => {
      const showtimeSnapshot = await getDocs(collection(db, "showtimes"));
      const movieSnapshot = await getDocs(collection(db, "movie"));
      const theaterSnapshot = await getDocs(collection(db, "theaters"));

      // Tạo một object movies và cinemas từ các snapshots
      const movies = movieSnapshot.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data().title;
        return acc;
      }, {});

      const cinemas = theaterSnapshot.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data().name;
        return acc;
      }, {});

      // Xử lý danh sách suất chiếu
      const showtimesData = showtimeSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          movieTitle: movies[data.movieId] || "Không rõ phim",
          theaterName: cinemas[data.theaterId] || "Không rõ rạp",
          date: data.date
            ? data.date.toDate().toLocaleDateString()
            : "Không rõ ngày",
          time: data.time || "Không rõ giờ",
        };
      });

      setShowtimes(showtimesData);
    };

    fetchShowtimes();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Danh Sách Suất Chiếu
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/suatchieu/them")}
        sx={{ mb: 2 }}
      >
        Thêm Suất Chiếu
      </Button>
      {showtimes.length === 0 ? (
        <Typography variant="body1">Không có suất chiếu nào.</Typography>
      ) : (
        showtimes.map((showtime) => (
          <Box key={showtime.id} sx={{ mb: 2 }}>
            <Typography variant="h6">
              {showtime.movieTitle} - {showtime.theaterName}
            </Typography>
            <Typography variant="body2">
              Ngày: {showtime.date} - Giờ: {showtime.time}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default ShowtimeList;
