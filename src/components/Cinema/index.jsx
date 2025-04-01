import {useState} from "react";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

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

const cinemas = [
  {id: 1, name: "CGV Hùng Vương Plaza"},
  {id: 2, name: "CGV Crescent Mall"},
  {id: 3, name: "CGV Vincom Thủ Đức"},
];

const movies = {
  1: [
    {
      id: 101,
      title: "Nàng Bạch Tuyết",
      showtimes: ["08:50 AM", "11:30 AM", "16:00 PM"],
    },
    {id: 102, title: "Cô Gái Năm Ấy", showtimes: ["12:50 PM"]},
  ],
  2: [
    {id: 103, title: "Nghề Siêu Khó", showtimes: ["11:50 AM", "14:00 PM"]},
    {id: 104, title: "Yêu Vì Tiền", showtimes: ["20:40 PM"]},
  ],
  3: [{id: 105, title: "Siêu Anh Hùng", showtimes: ["10:00 AM", "13:00 PM"]}],
};

export default function MovieSchedule() {
  const [selectedCinema, setSelectedCinema] = useState(cinemas[0].id);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container sx={{mt: 4}}>
        <Typography variant='h4' gutterBottom>
          Lịch Chiếu Phim
        </Typography>

        <FormControl fullWidth sx={{mb: 3}}>
          <InputLabel>Chọn Rạp</InputLabel>
          <Select
            value={selectedCinema}
            onChange={(e) => setSelectedCinema(e.target.value)}>
            {cinemas.map((cinema) => (
              <MenuItem key={cinema.id} value={cinema.id}>
                {cinema.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DatePicker
          label='Chọn Ngày'
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          sx={{mb: 3, width: "100%"}}
        />

        <Grid container spacing={2}>
          {movies[selectedCinema]?.map((movie) => (
            <Grid item xs={12} md={6} key={movie.id}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>{movie.title}</Typography>
                  <Typography color='text.secondary'>
                    Suất chiếu: {movie.showtimes.join(", ")}
                  </Typography>
                  <Button variant='contained' sx={{mt: 1}}>
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
