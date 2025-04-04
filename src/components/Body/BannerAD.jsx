import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const BannerAd = () => {
  return (
    <Box sx={{ bgcolor: "#f48fb1	", p: 4, textAlign: "left", marginX: "10rem" }}>
      <Typography variant="h5" fontWeight="bold">
        Mua vé xem phim Online trên FOUREEL
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Mua vé xem phim dễ dàng cùng FOUREEL Với nhiều ưu đãi hấp dẫn trên khắp
        Việt Nam. Đặt vé ngay!
      </Typography>
      <RadioGroup sx={{ mt: 2 }}>
        <FormControlLabel
          value="online"
          control={<Radio />}
          label="Mua vé Online, trải nghiệm phim hay"
        />
        <FormControlLabel
          value="safe"
          control={<Radio />}
          label="Đặt vé an toàn"
        />
        <FormControlLabel
          value="flexible"
          control={<Radio />}
          label="Tha hồ chọn chỗ ngồi, mua bắp nước tiện lợi"
        />
        <FormControlLabel
          value="history"
          control={<Radio />}
          label="Lịch sử đặt vé được lưu lại ngay"
        />
      </RadioGroup>
      <Button variant="contained" sx={{ bgcolor: "#D84315", mt: 2 }}>
        ĐẶT VÉ NGAY
      </Button>
    </Box>
  );
};

export default BannerAd;
