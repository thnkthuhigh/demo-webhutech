import {Box} from "@mui/material";

const CinematIcon = () => (
  <Box
    sx={{height: "100%", width: "auto", display: "flex", alignItems: "center"}}>
    <img
      src='/src/assets/img/logos.png' // Đảm bảo đường dẫn ảnh đúng
      alt='Logo'
      style={{
        height: "100%", // Ảnh sẽ chiếm hết chiều cao của phần tử cha
        width: "auto", // Đảm bảo giữ nguyên tỷ lệ
        objectFit: "contain", // Giữ nguyên toàn bộ ảnh trong khung mà không bị méo
      }}
    />
  </Box>
);

export default CinematIcon;
