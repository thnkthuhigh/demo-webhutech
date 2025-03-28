import {useState} from "react";
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

const moviesNowShowing = [
  {
    title: "QUỶ NHẬP TRÀNG",
    genre: "Kinh Dị",
    duration: "121 phút 51 giây",
    releaseDate: "07-03-2025",
    img: "https://via.placeholder.com/150",
  },
  {
    title: "NÀNG BẠCH TUYẾT",
    genre: "Gia Đình, Phiêu Lưu",
    duration: "108 phút",
    releaseDate: "21-03-2025",
    img: "https://via.placeholder.com/150",
  },
  {
    title: "CÔ GÁI NĂM ẤY CHÚNG TA CÙNG THEO ĐUỔI",
    genre: "Hài, Tâm Lý, Tình Cảm",
    duration: "202 phút",
    releaseDate: "21-03-2025",
    img: "https://via.placeholder.com/150",
  },
  {
    title: "QUỶ NHẬP TRÀNG",
    genre: "Kinh Dị",
    duration: "121 phút 51 giây",
    releaseDate: "07-03-2025",
    img: "https://via.placeholder.com/150",
  },
  {
    title: "NÀNG BẠCH TUYẾT",
    genre: "Gia Đình, Phiêu Lưu",
    duration: "108 phút",
    releaseDate: "21-03-2025",
    img: "https://via.placeholder.com/150",
  },
  {
    title: "CÔ GÁI NĂM ẤY CHÚNG TA CÙNG THEO ĐUỔI",
    genre: "Hài, Tâm Lý, Tình Cảm",
    duration: "202 phút",
    releaseDate: "21-03-2025",
    img: "https://via.placeholder.com/150",
  },
];

const moviesComingSoon = [
  {
    title: "NGHỀ SIÊU KHÓ NÓI",
    genre: "Hài, Tình Cảm",
    duration: "120 phút",
    releaseDate: "21-03-2025",
    img: "https://via.placeholder.com/150",
  },
  {
    title: "NGHI LỄ TRỤC QUỶ",
    genre: "Kinh Dị",
    duration: "96 phút",
    releaseDate: "19-03-2025",
    img: "https://via.placeholder.com/150",
  },
  {
    title: "ANH KHÔNG ĐAU",
    genre: "Hài, Hành Động, Hỗn Hợp",
    duration: "110 phút",
    releaseDate: "14-03-2025",
    img: "https://via.placeholder.com/150",
  },
];

export default function MovieList() {
  const [tabIndex, setTabIndex] = useState(0);
  const movies = tabIndex === 0 ? moviesNowShowing : moviesComingSoon;

  return (
    <Container sx={{marginY: "5rem"}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          marginY: "3rem",
        }}>
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}>
          <Tab label='Phim Đang Chiếu' />
          <Tab label='Phim Sắp Chiếu' />
        </Tabs>
      </Box>
      <Grid container spacing={3}>
        {movies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component='img'
                height='200'
                image={movie.img}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant='h6'>{movie.title}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Thể loại: {movie.genre}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Thời lượng: {movie.duration}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Khởi chiếu: {movie.releaseDate}
                </Typography>
                <Button variant='contained' color='primary' sx={{mt: 1}}>
                  Mua Vé
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
