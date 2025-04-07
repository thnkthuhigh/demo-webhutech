import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { db } from "../../db.config";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
  const [category, setCategory] = useState("Phim Đang Chiếu");
  const [visibleMovies, setVisibleMovies] = useState(8);
  const [moviesData, setMoviesData] = useState({
    "Phim Đang Chiếu": [],
    "Phim Sắp Chiếu": [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "movie"));
        const now = new Date();
        const nowShowing = [];
        const comingSoon = [];

        querySnapshot.forEach((doc) => {
          const movie = doc.data();
          let releaseDate = movie.releaseDate;

          if (releaseDate instanceof Timestamp) {
            releaseDate = releaseDate.toDate();
          } else if (typeof releaseDate === "string") {
            releaseDate = new Date(releaseDate);
          }

          if (!(releaseDate instanceof Date) || isNaN(releaseDate)) {
            releaseDate = new Date(0);
          }

          const movieWithId = { id: doc.id, ...movie, releaseDate };

          if (releaseDate <= now) {
            nowShowing.push(movieWithId);
          } else {
            comingSoon.push(movieWithId);
          }
        });

        setMoviesData({
          "Phim Đang Chiếu": nowShowing,
          "Phim Sắp Chiếu": comingSoon,
        });
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu phim:", err);
      }
    };

    fetchMovies();
  }, []);

  const handleLoadMore = () => {
    setVisibleMovies((prev) => prev + 8);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4, px: { xs: 2, md: 10 } }}>
      {/* Tabs */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
        {Object.keys(moviesData).map((key) => (
          <Button
            key={key}
            variant={category === key ? "contained" : "outlined"}
            onClick={() => {
              setCategory(key);
              setVisibleMovies(8);
            }}
          >
            {key}
          </Button>
        ))}
      </Box>

      {/* Movie Grid */}
      <Grid container spacing={4}>
        {moviesData[category].slice(0, visibleMovies).map((movie) => (
          <Grid item xs={12} sm={6} md={3} key={movie.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#fff",
                boxShadow: 3,
                borderRadius: 3,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardMedia
                component="img"
                height="260"
                image={movie.img || "/images/placeholder.jpg"}
                alt={movie.title}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: "left" }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ⏱ {movie.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📅{" "}
                  {movie.releaseDate.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Typography>
              </CardContent>
              <Box sx={{ px: 2, pb: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/movie-detail/${movie.id}`)}
                >
                  Mua vé
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Load More */}
      {visibleMovies < moviesData[category].length && (
        <Button
          variant="outlined"
          sx={{ mt: 4, borderRadius: 10, px: 4 }}
          onClick={handleLoadMore}
        >
          Xem thêm
        </Button>
      )}
    </Box>
  );
};

export default MovieList;
