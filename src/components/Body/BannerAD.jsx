import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

const BannerAd = () => {
  return (
    <Box
      sx={{
        mt: "5rem",
        bgcolor: "#ffffff",
        p: 4,
        textAlign: "left",
        marginX: { xs: 2, md: "10rem" },
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="error.main">
        Mua vé xem phim Online trên FOUREEL
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, color: "#333" }}>
        Mua vé xem phim dễ dàng cùng{" "}
        <span style={{ color: "#D32F2F", fontWeight: 600 }}>FOUREEL</span> với
        nhiều ưu đãi hấp dẫn trên khắp Việt Nam. Đặt vé ngay!
      </Typography>

      <RadioGroup sx={{ mt: 2 }}>
        <FormControlLabel
          value="online"
          control={
            <Radio
              sx={{ color: "#000", "&.Mui-checked": { color: "#D32F2F" } }}
            />
          }
          label="Mua vé Online, trải nghiệm phim hay"
        />
        <FormControlLabel
          value="safe"
          control={
            <Radio
              sx={{ color: "#000", "&.Mui-checked": { color: "#D32F2F" } }}
            />
          }
          label="Đặt vé an toàn"
        />
        <FormControlLabel
          value="flexible"
          control={
            <Radio
              sx={{ color: "#000", "&.Mui-checked": { color: "#D32F2F" } }}
            />
          }
          label="Tha hồ chọn chỗ ngồi, mua bắp nước tiện lợi"
        />
        <FormControlLabel
          value="history"
          control={
            <Radio
              sx={{ color: "#000", "&.Mui-checked": { color: "#D32F2F" } }}
            />
          }
          label="Lịch sử đặt vé được lưu lại ngay"
        />
      </RadioGroup>

      <Button
        variant="contained"
        component={Link}
        to="/phim"
        sx={{
          bgcolor: "#D32F2F",
          mt: 2,
          "&:hover": {
            bgcolor: "#B71C1C",
          },
        }}
      >
        ĐẶT VÉ NGAY
      </Button>
    </Box>
  );
};

export default BannerAd;
