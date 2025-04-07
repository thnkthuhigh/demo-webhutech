import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Button,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import { db } from "../../db.config"; // Ensure the path is correct
import { collection, getDocs } from "firebase/firestore";

export default function MovieSchedule() {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);

  // Fetch cinemas from Firestore
  useEffect(() => {
    const fetchCinemas = async () => {
      const snapshot = await getDocs(collection(db, "theaters"));
      const cinemaData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCinemas(cinemaData);
    };
    fetchCinemas();
  }, []);

  // Fetch showtimes for the selected cinema and date from Firestore
  useEffect(() => {
    if (selectedCinema) {
      const fetchShowtimes = async () => {
        const snapshot = await getDocs(collection(db, "showtimes"));
        const showtimeData = snapshot.docs
          .filter((doc) => doc.data().theaterId === selectedCinema)
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        setShowtimes(showtimeData);
      };
      fetchShowtimes();
    }
  }, [selectedCinema, selectedDate]);

  // Fetch movies for the selected cinema from Firestore
  useEffect(() => {
    const fetchMovies = async () => {
      const snapshot = await getDocs(collection(db, "movie"));
      const movieData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(movieData);
    };
    fetchMovies();
  }, []);

  // Combine data to get movies with their showtimes and cinema names
  const filteredMovies = movies
    .map((movie) => {
      if (!selectedCinema) return null;

      // Find showtimes for this movie on the selected date
      const movieShowtimes = showtimes.filter(
        (showtime) =>
          showtime.movieId === movie.id &&
          dayjs(showtime.date).isSame(selectedDate, "day")
      );

      // If the movie has showtimes on the selected date, combine with cinema and showtime
      if (movieShowtimes.length > 0) {
        return {
          ...movie,
          showtimes: movieShowtimes.map((showtime) => ({
            time: showtime.time,
            cinema: cinemas.find((cinema) => cinema.id === showtime.theaterId),
          })),
        };
      }

      return null;
    })
    .filter((movie) => movie !== null);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lịch Chiếu Phim
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Chọn Rạp</InputLabel>
          <Select
            value={selectedCinema}
            onChange={(e) => setSelectedCinema(e.target.value)}
            label="Chọn Rạp"
          >
            {cinemas.map((cinema) => (
              <MenuItem key={cinema.id} value={cinema.id}>
                {cinema.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DatePicker
          label="Chọn Ngày"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          sx={{ mb: 3, width: "100%" }}
        />

        <Grid container spacing={3}>
          {filteredMovies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id || index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={movie.img || "https://via.placeholder.com/150"}
                  alt={movie.title}
                  sx={{
                    padding: "8px",
                    height: "auto",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "8px",
                  }}
                />
                <CardContent sx={{ flexGrow: 1, paddingTop: 2 }}>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thể loại: {movie.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thời lượng: {movie.duration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Khởi chiếu:{" "}
                    {movie.releaseDate instanceof Date
                      ? formatDate(movie.releaseDate)
                      : "N/A"}
                  </Typography>

                  {/* Hiển thị showtimes cho từng phim */}
                  {movie.showtimes && movie.showtimes.length > 0 ? (
                    movie.showtimes.map((showtime, index) => (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        key={index}
                      >
                        {showtime.cinema.name} - {showtime.time}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Không có lịch chiếu cho ngày này.
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ marginTop: "auto", padding: "16px" }}>
                  <Button variant="contained" sx={{ width: "100%" }}>
                    Mua Vé
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </LocalizationProvider>
  );
}
