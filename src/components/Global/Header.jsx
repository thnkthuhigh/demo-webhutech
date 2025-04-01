import {AppBar, Toolbar, Button, Box, Divider} from "@mui/material";
import CinematIcon from "../../assets/img/CinematIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position='static' sx={{bgcolor: "#ffffff "}}>
      {/* Phần 1: Thông tin ưu đãi, vé của tôi, đăng nhập */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "right",
          minHeight: "20px !important", // Ghi đè chiều cao mặc định
          height: "30px", // Đặt chiều cao cụ thể
          padding: "6px 16px", // Giảm padding để không làm tăng chiều cao
          bgcolor: "#000000 ",
        }}>
        <Box sx={{display: "flex", gap: 1, mx: "120px"}}>
          <Button
            component={Link}
            to='/tin-moi'
            sx={{color: "white", fontSize: "12px", padding: "4px 8px"}}>
            TIN MỚI & ƯU ĐÃI
          </Button>
          <Button
            component={Link}
            to='/ve-cua-toi'
            sx={{color: "white", fontSize: "12px", padding: "4px 8px"}}>
            VÉ CỦA TÔI
          </Button>
        </Box>
        <Button
          component={Link}
          to='/dang-nhap'
          startIcon={<AccountCircleIcon />}
          sx={{fontSize: "12px", padding: "4px 8px"}}>
          ĐĂNG NHẬP / ĐĂNG KÝ
        </Button>
      </Toolbar>

      <Divider sx={{bgcolor: "#D32F2F", height: 2}} />

      {/* Phần 2 & 3: Logo + Nav + Đặt vé */}
      <Toolbar
        sx={{
          maxHeight: "100px",
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          justifyContent: "center",
        }}>
        {/* Logo và Nav nằm ngang và căn giữa */}
        <Box sx={{display: "flex", alignItems: "center", gap: 5}}>
          <Box component={Link} to='/' sx={{height: "64px", display: "flex"}}>
            <CinematIcon />
          </Box>
          <Box sx={{display: "flex", gap: 3}}>
            <Button component={Link} to='/phim' sx={{color: "black"}}>
              PHIM
            </Button>
            <Button component={Link} to='/rap' sx={{color: "black"}}>
              RẠP FOUREEL
            </Button>
            <Button component={Link} to='/thanh-vien' sx={{color: "black"}}>
              THÀNH VIÊN
            </Button>
            <Button component={Link} to='/cultureplex' sx={{color: "black"}}>
              CULTUREPLEX
            </Button>
          </Box>
        </Box>

        {/* Nút đặt vé ngay dính bên phải */}
        <Box sx={{position: "absolute", right: "150px"}}>
          <Button
            component={Link}
            to='/lichchieu'
            variant='contained'
            sx={{bgcolor: "red", color: "white"}}>
            MUA VÉ NGAY
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
