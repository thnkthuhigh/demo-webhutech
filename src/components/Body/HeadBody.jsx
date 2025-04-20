import Slider from "react-slick";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

const movies = [
  {
    id: 1,
    title: "Lạc Trôi",
    img: "https://image.dienthoaivui.com.vn/x,webp,q90/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/editor_upload/poster-phim-hoat-hinh-38.jpg",
  },
  {
    id: 2,
    title: "Cô Tiên",
    img: "https://afamilycdn.com/150157425591193600/2021/10/4/phim-kingdom-vuong-trieu-xac-song-phan-1-2-full-hd-vietsub-1-16333243807721978567362-0-0-394-630-crop-1633326547679730083843.jpg",
  },
  {
    id: 3,
    title: "Dune 2",
    img: "https://i.pinimg.com/736x/78/09/bd/7809bde1142d2c87b8560f3be70b34b1.jpg",
  },
];

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      right: 10,
      zIndex: 1,
      color: "white",
      bgcolor: "rgba(0,0,0,0.5)",
      "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      left: 10,
      zIndex: 1,
      color: "white",
      bgcolor: "rgba(0,0,0,0.5)",
      "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
    }}
  >
    <ArrowBackIos />
  </IconButton>
);

const HeadBody = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Chuyển sau 8 giây
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          bgcolor: "#000000",
          color: "white",
          py: 1,
        }}
      >
        PHIM HOT TẠI RẠP
      </Typography>
      <Slider {...settings}>
        {movies.map((movie) => (
          <Box key={movie.id} sx={{ position: "relative" }}>
            <img
              src={movie.img}
              alt={movie.title}
              style={{ width: "100%", height: "450px", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

NextArrow.propTypes = {
  onClick: PropTypes.func,
};

PrevArrow.propTypes = {
  onClick: PropTypes.func,
};

export default HeadBody;
