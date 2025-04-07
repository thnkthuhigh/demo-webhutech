import { useState, useEffect } from "react";
import { db } from "../../../db.config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore"; // Thêm import cho Timestamp
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const ShowtimeAdd = () => {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const snapshot = await getDocs(collection(db, "movie"));
      const movieList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(movieList);
    };

    const fetchTheaters = async () => {
      const snapshot = await getDocs(collection(db, "theaters"));
      const theaterList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTheaters(theaterList);
    };

    fetchMovies();
    fetchTheaters();
  }, []);

  const handleAddShowtime = async () => {
    if (!date || !time || !selectedMovie || !selectedTheater) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const showDate = new Date(date);
    if (isNaN(showDate.getTime())) {
      alert("Ngày không hợp lệ.");
      return;
    }

    const showTimeParts = time.split(":");
    if (showTimeParts.length !== 2) {
      alert("Giờ không hợp lệ.");
      return;
    }

    showDate.setHours(showTimeParts[0], showTimeParts[1], 0, 0);

    await addDoc(collection(db, "showtimes"), {
      movieId: selectedMovie,
      theaterId: selectedTheater,
      date: Timestamp.fromDate(showDate),
      time,
    });

    setSelectedMovie("");
    setSelectedTheater("");
    setDate("");
    setTime("");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Thêm Suất Chiếu
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Chọn Phim</InputLabel>
        <Select
          label="Chọn Phim"
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
        >
          {movies.map((movie) => (
            <MenuItem key={movie.id} value={movie.id}>
              {movie.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Chọn Rạp</InputLabel>
        <Select
          label="Chọn Rạp"
          value={selectedTheater}
          onChange={(e) => setSelectedTheater(e.target.value)}
        >
          {theaters.map((theater) => (
            <MenuItem key={theater.id} value={theater.id}>
              {theater.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Ngày Chiếu"
        fullWidth
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Giờ Chiếu"
        fullWidth
        value={time}
        onChange={(e) => setTime(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={handleAddShowtime} sx={{ mt: 2 }}>
        Thêm Suất Chiếu
      </Button>
    </Box>
  );
};

export default ShowtimeAdd;
