import { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { db } from "../../db.config"; // Make sure the path to your Firebase config is correct
import { collection, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

const MovieList = () => {
  const [category, setCategory] = useState("Phim Đang Chiếu");
  const [visibleMovies, setVisibleMovies] = useState(8); // Initially show 8 movies
  const [moviesData, setMoviesData] = useState({
    "Phim Đang Chiếu": [],
    "Phim Sắp Chiếu": [],
  });

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

          // If releaseDate is a Timestamp, convert it to Date
          if (releaseDate instanceof Timestamp) {
            releaseDate = releaseDate.toDate();
          } else if (typeof releaseDate === "string") {
            releaseDate = new Date(releaseDate);
          }

          // If releaseDate is invalid, set it to a default date
          if (!(releaseDate instanceof Date) || isNaN(releaseDate)) {
            releaseDate = new Date(0);
          }

          const movieWithId = { id: doc.id, ...movie, releaseDate };

          // Categorize the movies
          if (releaseDate <= now) {
            nowShowing.push(movieWithId); // Movie is now showing
          } else {
            comingSoon.push(movieWithId); // Movie is coming soon
          }
        });

        setMoviesData({
          "Phim Đang Chiếu": nowShowing,
          "Phim Sắp Chiếu": comingSoon,
        });
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  const handleLoadMore = () => {
    setVisibleMovies((prev) => prev + 8); // Show 8 more movies when button is clicked
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4, marginX: "4rem" }}>
      {/* Tab to select movie categories */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        {Object.keys(moviesData).map((key) => (
          <Button
            key={key}
            variant={category === key ? "contained" : "outlined"}
            onClick={() => {
              setCategory(key);
              setVisibleMovies(8); // Reset the number of visible movies when switching categories
            }}
          >
            {key}
          </Button>
        ))}
      </Box>

      {/* Display the movie list */}
      <Grid container spacing={3} justifyContent="center">
        {moviesData[category].slice(0, visibleMovies).map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex", // Ensure the content is flexible and aligns correctly
                flexDirection: "column", // Arrange children elements vertically
                justifyContent: "space-between", // Ensure elements are spaced out evenly
                height: "100%", // Ensure all items have equal height
                textAlign: "center",
                p: 2,
                bgcolor: "#FBE9E7",
                borderRadius: 2,
              }}
            >
              <img
                src={movie.img || "/images/placeholder.jpg"} // Fallback to placeholder image if none exists
                alt={movie.title}
                width="100%"
                style={{ borderRadius: "10px" }}
              />
              <Typography variant="h6" sx={{ mt: 1 }}>
                {movie.title}
              </Typography>
              <Typography variant="body2">
                Thời lượng {movie.duration}
              </Typography>
              <Typography variant="body2">
                Ngày khởi chiếu {movie.releaseDate.toLocaleDateString()}
              </Typography>
              <Button variant="contained" sx={{ mt: 1 }}>
                Đặt Vé
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* "Load More" button */}
      {visibleMovies < moviesData[category].length && (
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleLoadMore}>
          Xem Thêm
        </Button>
      )}
    </Box>
  );
};

export default MovieList;
