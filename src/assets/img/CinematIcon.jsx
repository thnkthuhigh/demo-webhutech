import {Box} from "@mui/material";

const CinematIcon = () => (
  <Box sx={{height: "100%"}}>
    {" "}
    {/* Đảm bảo logo có chiều cao bằng thanh nav */}
    <img
      src='/src/assets/img/logos.png' // Đảm bảo đường dẫn ảnh đúng
      alt='Logo'
      style={{height: "100%", width: "auto"}} // Giữ tỉ lệ ảnh đúng
    />
  </Box>
);

export default CinematIcon;
