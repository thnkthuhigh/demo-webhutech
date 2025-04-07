import { useEffect, useState } from "react";
import { db } from "../../../db.config";
import { collection, getDocs } from "firebase/firestore";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShowtimeList = () => {
  const [showtimes, setShowtimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowtimes = async () => {
      const [showtimeSnap, movieSnap, cinemaSnap] = await Promise.all([
        getDocs(collection(db, "showtimes")),
        getDocs(collection(db, "movie")),
        getDocs(collection(db, "theaters")),
      ]);

      const movies = movieSnap.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data().title;
        return acc;
      }, {});

      const cinemas = cinemaSnap.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data().name;
        return acc;
      }, {});

      const showtimesData = showtimeSnap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          movieTitle: movies[data.movieId] || "Không rõ phim",
          theaterName: cinemas[data.theaterId] || "Không rõ rạp",
        };
      });
      console.log("Movies:", movies);
      console.log("Cinemas:", cinemas);
      console.log(
        "Showtimes raw:",
        showtimeSnap.docs.map((doc) => doc.data())
      );

      setShowtimes(showtimesData);
    };

    fetchShowtimes();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
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
