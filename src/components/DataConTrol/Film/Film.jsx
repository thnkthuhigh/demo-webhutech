// src/components/ShowFilm/index.jsx
import { useEffect, useState } from "react";
import { db } from "../../../db.config";
import { collection, getDocs } from "firebase/firestore";
import { Typography, Box } from "@mui/material";

const Film = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "movie"));
        const movieData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(movieData);
      } catch (error) {
        console.error("❌ Lỗi lấy phim:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h4">Danh sách phim</Typography>
      {movies.map((movie) => (
        <Box key={movie.id} mt={2}>
          <Typography variant="h6">{movie.title}</Typography>
          <Typography>{movie.description}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Film;
