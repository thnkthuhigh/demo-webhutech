import { useState, useEffect } from "react";
import { db } from "../../../db.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
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
import { getDocs, collection } from "firebase/firestore"; // Thêm getDocs và collection

const ShowtimeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    // Fetch showtime to populate the form fields
    const fetchShowtime = async () => {
      const docRef = doc(db, "showtimes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSelectedMovie(data.movieId);
        setSelectedTheater(data.theaterId);
        setDate(data.date);
        setTime(data.time);
      }
    };

    // Fetch movies
    const fetchMovies = async () => {
      const snapshot = await getDocs(collection(db, "movie"));
      const movieList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(movieList);
    };

    // Fetch theaters
    const fetchTheaters = async () => {
      const snapshot = await getDocs(collection(db, "theaters"));
      const theaterList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTheaters(theaterList);
    };

    fetchShowtime();
    fetchMovies();
    fetchTheaters();
  }, [id]);

  const handleUpdateShowtime = async () => {
    await updateDoc(doc(db, "showtimes", id), {
      movieId: selectedMovie,
      theaterId: selectedTheater,
      date,
      time,
    });
    navigate("/suatchieu");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Chỉnh sửa Suất Chiếu
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Chọn Phim</InputLabel>
        <Select
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
      />

      <TextField
        label="Giờ Chiếu"
        fullWidth
        value={time}
        onChange={(e) => setTime(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={handleUpdateShowtime} sx={{ mt: 2 }}>
        Lưu
      </Button>
    </Box>
  );
};

export default ShowtimeEdit;
