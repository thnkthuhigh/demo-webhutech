import { Box } from "@mui/material";

const CinematIcon = () => (
  <Box
    sx={{
      height: "100%",
      width: "auto",
      display: "flex",
      alignItems: "center",
    }}
  >
    <img
      // src='/src/assets/img/logos.png' // Đảm bảo đường dẫn ảnh đúng
      src="https://i.pinimg.com/736x/8b/46/35/8b4635fd93dc6e874f686435da83a210.jpg"
      alt="Logo"
      style={{
        height: "100%", // Ảnh sẽ chiếm hết chiều cao của phần tử cha
        width: "auto", // Đảm bảo giữ nguyên tỷ lệ
        objectFit: "contain", // Giữ nguyên toàn bộ ảnh trong khung mà không bị méo
      }}
    />
  </Box>
);

export default CinematIcon;
