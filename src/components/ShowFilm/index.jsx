import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { db } from "../../db.config";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function MovieList() {
  const [tabIndex, setTabIndex] = useState(0);
  const [moviesNowShowing, setMoviesNowShowing] = useState([]);
  const [moviesComingSoon, setMoviesComingSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

          // Chuyển đổi releaseDate
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

        setMoviesNowShowing(nowShowing);
        setMoviesComingSoon(comingSoon);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu phim.");
        console.error("Lỗi khi tải phim:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const formatDate = (date) => {
    return date instanceof Date && !isNaN(date)
      ? `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`
      : "N/A";
  };

  const movies = tabIndex === 0 ? moviesNowShowing : moviesComingSoon;

  return (
    <Container sx={{ my: 6 }}>
      <Paper elevation={2} sx={{ mb: 4, p: 2, textAlign: "center" }}>
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Phim Đang Chiếu" />
          <Tab label="Phim Sắp Chiếu" />
        </Tabs>
      </Paper>

      {loading ? (
        <Typography variant="h6" align="center">
          Đang tải dữ liệu...
        </Typography>
      ) : error ? (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      ) : movies.length === 0 ? (
        <Typography variant="h6" align="center">
          Không có phim nào để hiển thị.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={movie.img || "https://via.placeholder.com/300x400"}
                  alt={movie.title}
                  sx={{ height: 300, objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thể loại: {movie.category || "Không rõ"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thời lượng: {movie.duration || "Không rõ"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Khởi chiếu: {formatDate(movie.releaseDate)}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/movie-detail/${movie.id}`)}
                  >
                    Mua Vé
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
