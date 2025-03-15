import {useState} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";

const movies = {
  "Phim Đang Chiếu": [
    {
      id: 1,
      title: "Nhà Gia Tiên",
      time: "11:00PM",
      date: "20/02/2025",
      img: "/images/nhagiatien.jpg",
    },
    {
      id: 2,
      title: "Cưới Ma",
      time: "9:37PM",
      date: "28/12/2025",
      img: "/images/cuoima.jpg",
    },
    {
      id: 3,
      title: "Nhà Gia Tiên",
      time: "11:00PM",
      date: "20/02/2025",
      img: "/images/nhagiatien.jpg",
    },
    {
      id: 4,
      title: "Cưới Ma",
      time: "9:37PM",
      date: "28/12/2025",
      img: "/images/cuoima.jpg",
    },
    {
      id: 5,
      title: "Nhà Gia Tiên",
      time: "11:00PM",
      date: "20/02/2025",
      img: "/images/nhagiatien.jpg",
    },
    {
      id: 6,
      title: "Cưới Ma",
      time: "9:37PM",
      date: "28/12/2025",
      img: "/images/cuoima.jpg",
    },
    {
      id: 7,
      title: "Nhà Gia Tiên",
      time: "11:00PM",
      date: "20/02/2025",
      img: "/images/nhagiatien.jpg",
    },
    {
      id: 8,
      title: "Cưới Ma",
      time: "9:37PM",
      date: "28/12/2025",
      img: "/images/cuoima.jpg",
    },
    {
      id: 9,
      title: "Nhà Gia Tiên",
      time: "11:00PM",
      date: "20/02/2025",
      img: "/images/nhagiatien.jpg",
    },
    {
      id: 10,
      title: "Cưới Ma",
      time: "9:37PM",
      date: "28/12/2025",
      img: "/images/cuoima.jpg",
    },
    {
      id: 17,
      title: "Nhà Gia Tiên",
      time: "11:00PM",
      date: "20/02/2025",
      img: "/images/nhagiatien.jpg",
    },
    {
      id: 18,
      title: "Cưới Ma",
      time: "9:37PM",
      date: "28/12/2025",
      img: "/images/cuoima.jpg",
    },
    {
      id: 19,
      title: "Nhà Gia Tiên",
      time: "11:00PM",
      date: "20/02/2025",
      img: "/images/nhagiatien.jpg",
    },
    {
      id: 20,
      title: "Cưới Ma",
      time: "9:37PM",
      date: "28/12/2025",
      img: "/images/cuoima.jpg",
    },
    {
      id: 27,
      title: "Nhà Gia Tiên",
      time: "11:00PM",
      date: "20/02/2025",
      img: "/images/nhagiatien.jpg",
    },
    {
      id: 28,
      title: "Cưới Ma",
      time: "9:37PM",
      date: "28/12/2025",
      img: "/images/cuoima.jpg",
    },
    {
      id: 29,
      title: "Nhà Gia Tiên",
      time: "11:00PM",
      date: "20/02/2025",
      img: "/images/nhagiatien.jpg",
    },
    {
      id: 30,
      title: "Cưới Ma",
      time: "9:37PM",
      date: "28/12/2025",
      img: "/images/cuoima.jpg",
    },
    {
      id: 37,
      title: "Nhà Gia Tiên",
      time: "11:00PM",
      date: "20/02/2025",
      img: "/images/nhagiatien.jpg",
    },
    {
      id: 38,
      title: "Cưới Ma",
      time: "9:37PM",
      date: "28/12/2025",
      img: "/images/cuoima.jpg",
    },
    {
      id: 39,
      title: "Nhà Gia Tiên",
      time: "11:00PM",
      date: "20/02/2025",
      img: "/images/nhagiatien.jpg",
    },
    {
      id: 40,
      title: "Cưới Ma",
      time: "9:37PM",
      date: "28/12/2025",
      img: "/images/cuoima.jpg",
    },
  ],
  "Phim Sắp Chiếu": [
    {
      id: 3,
      title: "Nụ Hôn Bạc Tỷ",
      time: "10:00PM",
      date: "23/01/2025",
      img: "/images/1.jpg",
    },
    {
      id: 4,
      title: "Bí Mật Không Thể Nói",
      time: "10:00PM",
      date: "18/02/2025",
      img: "/images/bimat.jpg",
    },
  ],
};

const MovieList = () => {
  const [category, setCategory] = useState("Phim Đang Chiếu");
  const [visibleMovies, setVisibleMovies] = useState(8); // Ban đầu hiển thị 8 phim

  const handleLoadMore = () => {
    setVisibleMovies((prev) => prev + 8); // Mỗi lần nhấn sẽ hiển thị thêm 8 phim
  };

  return (
    <Box sx={{textAlign: "center", mt: 4, marginX: "4rem"}}>
      {/* Tab chọn danh sách phim */}
      <Box sx={{display: "flex", justifyContent: "center", gap: 2, mb: 3}}>
        {Object.keys(movies).map((key) => (
          <Button
            key={key}
            variant={category === key ? "contained" : "outlined"}
            onClick={() => {
              setCategory(key);
              setVisibleMovies(8); // Reset số lượng phim hiển thị khi đổi danh mục
            }}>
            {key}
          </Button>
        ))}
      </Box>

      {/* Hiển thị danh sách phim */}
      <Grid container spacing={3} justifyContent='center'>
        {movies[category].slice(0, visibleMovies).map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={3}>
            <Box
              sx={{
                textAlign: "center",
                p: 2,
                bgcolor: "#FBE9E7",
                borderRadius: 2,
              }}>
              <img
                src={movie.img}
                alt={movie.title}
                width='100%'
                style={{borderRadius: "10px"}}
              />
              <Typography variant='h6' sx={{mt: 1}}>
                {movie.title}
              </Typography>
              <Typography variant='body2'>
                {movie.time} | {movie.date}
              </Typography>
              <Button variant='contained' sx={{mt: 1}}>
                Đặt Vé
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Nút Xem Thêm */}
      {visibleMovies < movies[category].length && (
        <Button variant='contained' sx={{mt: 3}} onClick={handleLoadMore}>
          Xem Thêm
        </Button>
      )}
    </Box>
  );
};

export default MovieList;
