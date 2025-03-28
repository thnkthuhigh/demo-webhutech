import {Container, Grid, Typography, Link, Box} from "@mui/material";
import {Facebook, YouTube} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2d1e1e",
        color: "white",
        py: 4,
        marginTop: "5rem",
      }}>
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          {/* Cột 1: Mua vé xem phim */}
          <Grid item xs={12} sm={4}>
            <Typography variant='h6'>MUA VÉ XEM PHIM</Typography>
            {[
              "Lịch chiếu phim",
              "Rạp chiếu phim",
              "Phim chiếu rạp",
              "Review phim",
              "Top phim",
              "Blog phim",
            ].map((item) => (
              <Typography key={item} variant='body2' sx={{mt: 1}}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Cột 2: Dịch vụ nổi bật */}
          <Grid item xs={12} sm={4}>
            <Typography variant='h6'>DỊCH VỤ NỔI BẬT</Typography>
            {[
              "Vé xem phim",
              "Bảo hiểm ô tô",
              "Vé xe khách",
              "Loa bảo nhận tiền",
              "Ví nhân ái",
              "Thẻ Địa MoMo",
              "Vay nhanh",
              "Nạp Data 4G/5G",
            ].map((item) => (
              <Typography key={item} variant='body2' sx={{mt: 1}}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Cột 3: Liên hệ & Hợp tác */}
          <Grid item xs={12} sm={4}>
            <Typography variant='h6'>CHĂM SÓC KHÁCH HÀNG</Typography>
            <Typography variant='body2'>Hotline: 1900 5454 41</Typography>
            <Typography variant='body2'>Email: hotro@momo.vn</Typography>
            <Typography variant='h6' sx={{mt: 2}}>
              HỢP TÁC DOANH NGHIỆP
            </Typography>
            <Typography variant='body2'>Hotline: 1900 636 652</Typography>
            <Typography variant='body2'>
              Email: merchant.care@momo.vn
            </Typography>
          </Grid>
        </Grid>

        {/* Mạng xã hội */}
        <Box sx={{mt: 4, textAlign: "center"}}>
          <Link href='#' color='inherit' sx={{mx: 1}}>
            <Facebook />
          </Link>
          <Link href='#' color='inherit' sx={{mx: 1}}>
            <YouTube />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
