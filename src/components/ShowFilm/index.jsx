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
} from "@mui/material";
import { db } from "../../db.config";
import { collection, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

export default function MovieList() {
  const [tabIndex, setTabIndex] = useState(0);
  const [moviesNowShowing, setMoviesNowShowing] = useState([]);
  const [moviesComingSoon, setMoviesComingSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

          // Kiểm tra nếu releaseDate là Timestamp
          if (releaseDate instanceof Timestamp) {
            releaseDate = releaseDate.toDate(); // Chuyển đổi Timestamp thành Date object
          } else if (typeof releaseDate === "string") {
            releaseDate = new Date(releaseDate); // Nếu là chuỗi, chuyển thành Date
          }

          // Kiểm tra trường hợp nếu releaseDate không hợp lệ
          if (!(releaseDate instanceof Date) || isNaN(releaseDate)) {
            releaseDate = new Date(0); // Nếu không hợp lệ, mặc định là 01/01/1970
          }

          const movieWithId = { id: doc.id, ...movie, releaseDate };

          // Phân loại phim dựa trên releaseDate
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
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const movies = tabIndex === 0 ? moviesNowShowing : moviesComingSoon;

  return (
    <Container sx={{ marginY: "5rem" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
        >
          <Tab label="Phim Đang Chiếu" />
          <Tab label="Phim Sắp Chiếu" />
        </Tabs>
      </Box>

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
          {movies.map((movie, index) => (
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
                    padding: "8px", // Thêm padding xung quanh ảnh
                    height: "auto",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "8px", // Để ảnh có góc bo tròn nếu cần
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
                </CardContent>
                {/* Nút mua vé nằm ở dưới cùng, căn chỉnh flex */}
                <Box sx={{ marginTop: "auto", padding: "16px" }}>
                  <Button variant="contained" sx={{ width: "100%" }}>
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
