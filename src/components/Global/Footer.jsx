import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import { Facebook, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1c1c1e",
        color: "white",
        pt: 6,
        pb: 4,
        mt: "5rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Cột 1 */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              MUA VÉ XEM PHIM
            </Typography>
            <Stack spacing={1}>
              <Link href="/phim" underline="hover" color="inherit">
                Lịch chiếu phim
              </Link>
              <Link href="/rap" underline="hover" color="inherit">
                Rạp chiếu phim
              </Link>
              <Link href="/phim" underline="hover" color="inherit">
                Phim chiếu rạp
              </Link>
            </Stack>
          </Grid>

          {/* Cột 2 */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              DỊCH VỤ NỔI BẬT
            </Typography>
            <Stack spacing={1}>
              <Link href="phim" underline="hover" color="inherit">
                Đặt vé nhanh
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Khuyến mãi
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Ưu đãi thành viên
              </Link>
            </Stack>
          </Grid>

          {/* Cột 3 */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              CHĂM SÓC KHÁCH HÀNG
            </Typography>
            <Typography variant="body2">Hotline: 0969 337 729</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Liên hệ Facebook:&nbsp;
              <Link
                href="https://www.facebook.com/pham.man.1203"
                target="_blank"
                underline="hover"
                color="inherit"
              >
                Phạm Ngọc Mẫn
              </Link>
            </Typography>
            <Divider sx={{ my: 2, borderColor: "gray" }} />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              HỢP TÁC DOANH NGHIỆP
            </Typography>
            <Typography variant="body2">Hotline: 1900 636 652</Typography>
            <Typography variant="body2">
              Email: merchant.care@momo.vn
            </Typography>
          </Grid>
        </Grid>

        {/* Mạng xã hội */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <IconButton href="#" color="inherit">
            <Facebook fontSize="large" />
          </IconButton>
          <IconButton href="#" color="inherit">
            <YouTube fontSize="large" />
          </IconButton>
        </Box>

        {/* Bản quyền */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "gray" }}
        >
          © {new Date().getFullYear()} RAP PHIM ABC. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
