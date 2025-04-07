import { useState } from "react";

import {
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";

const cinemas = [
  "CGV Giga Mall Thủ Đức",
  "CGV Aeon Bình Tân",
  "CGV Sư Vạn Hạnh",
  "CGV Vincom Mega Mall Grand Park",
  "CGV Pearl Plaza",
  "CGV Vincom Thủ Đức",
  "CGV Liberty Citypoint",
];

const movies = [
  {
    title: "Nàng Bạch Tuyết",
    poster: "https://via.placeholder.com/150",
    showtimes: ["11:00", "15:10", "16:00", "22:10"],
  },
  {
    title: "Nhà Gia Tiên",
    poster: "https://via.placeholder.com/150",
    showtimes: ["11:30", "12:50", "18:50"],
  },
];

const MovieSchedule = () => {
  const [selectedCinema, setSelectedCinema] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 3, fontWeight: "bold", color: "#E91E63" }}
      >
        Lịch chiếu phim
      </Typography>

      {/* Chọn rạp */}
      <Tabs
        value={selectedCinema}
        onChange={(e, newValue) => setSelectedCinema(newValue)}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        sx={{ mb: 3, bgcolor: "#FCE4EC" }}
      >
        {cinemas.map((cinema, index) => (
          <Tab key={index} label={cinema} />
        ))}
      </Tabs>

      {/* Chọn ngày */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        {["25", "26", "27", "28", "29", "30", "31"].map((day, index) => (
          <Button
            key={index}
            variant={selectedDate === index ? "contained" : "outlined"}
            color="secondary"
            onClick={() => setSelectedDate(index)}
          >
            {day}
          </Button>
        ))}
      </Box>

      {/* Danh sách phim */}
      <Grid container spacing={2}>
        {movies.map((movie, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={movie.poster}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {movie.title}
                </Typography>
                <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {movie.showtimes.map((time, idx) => (
                    <Button key={idx} variant="outlined" color="primary">
                      {time}
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieSchedule;
