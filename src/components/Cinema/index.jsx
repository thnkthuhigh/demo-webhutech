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
  Grid,
} from "@mui/material";
import { db } from "../../db.config"; // Đảm bảo rằng đường dẫn đúng
import { collection, getDocs } from "firebase/firestore";

export default function MovieSchedule() {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [movies, setMovies] = useState({});

  // Fetch cinemas from Firestore
  useEffect(() => {
    const fetchCinemas = async () => {
      const snapshot = await getDocs(collection(db, "theaters"));
      const cinemaData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCinemas(cinemaData);
      if (cinemaData.length > 0) {
        setSelectedCinema(cinemaData[0].id); // Set default cinema
      }
    };
    fetchCinemas();
  }, []);

  // Fetch movies for the selected cinema from Firestore
  useEffect(() => {
    if (selectedCinema) {
      const fetchMovies = async () => {
        const snapshot = await getDocs(collection(db, "movies"));
        const movieData = snapshot.docs
          .filter((doc) => doc.data().cinemaId === selectedCinema)
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        const moviesByCinema = {};
        movieData.forEach((movie) => {
          if (!moviesByCinema[movie.cinemaId]) {
            moviesByCinema[movie.cinemaId] = [];
          }
          moviesByCinema[movie.cinemaId].push(movie);
        });

        setMovies(moviesByCinema);
      };
      fetchMovies();
    }
  }, [selectedCinema]);

  if (!cinemas.length) {
    return <div>Loading cinemas...</div>;
  }

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

        <Grid container spacing={2}>
          {movies[selectedCinema]?.map((movie) => (
            <Grid item xs={12} md={6} key={movie.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography color="text.secondary">
                    Suất chiếu: {movie.showtimes.join(", ")}
                  </Typography>
                  <Button variant="contained" sx={{ mt: 1 }}>
                    Mua Vé
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </LocalizationProvider>
  );
}
