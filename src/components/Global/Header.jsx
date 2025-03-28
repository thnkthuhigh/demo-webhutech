import {
  AppBar,
  Toolbar,
  Button,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import CinematIcon from "../../assets/img/CinematIcon";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Link} from "react-router-dom";
import {useState} from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false); // Kiểm soát menu dropdown

  return (
    <AppBar position='static' sx={{bgcolor: "#F48FB1", height: 64}}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
          padding: "2px",
        }}>
        {/* Logo */}
        <Box
          sx={{display: "flex", alignItems: "center", height: "100%"}}
          component={Link}
          to='/'>
          <CinematIcon />
        </Box>
        <Box sx={{display: "flex"}}>
          <Button
            variant='contained'
            component={Link}
            to='/lich-chieu'
            sx={{bgcolor: "#FF6F00", color: "white", marginRight: "3rem"}}>
            Mua Vé
          </Button>
          <Box sx={{display: "flex", gap: 2.5, marginRight: "20rem"}}>
            {/* Dropdown Menu khi hover vào "Phim" */}
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
              }}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}>
              {/* Nút Phim */}
              <Button
                color='inherit'
                component={Link}
                to='/lich-chieu'
                onMouseEnter={() => setOpen(true)}>
                Phim
              </Button>

              {/* Vùng đệm trong suốt để giữ hover */}
              <Box
                sx={{
                  position: "absolute",
                  top: "100%", // Nằm ngay dưới nút
                  left: 0,
                  width: "100%",
                  height: "20px", // Chiều cao khoảng đệm (tăng lên nếu cần)
                  backgroundColor: "transparent",
                }}
              />

              {/* Dropdown */}
              {open && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "150%", // Đẩy dropdown xuống sâu hơn
                    left: 0,
                    bgcolor: "#F48FB1",
                    boxShadow: 3,
                    borderRadius: 1,
                    zIndex: 10,
                    padding: "0.5rem",
                    border: "solid 2px black",
                    minWidth: "max-content",
                  }}>
                  <Button
                    component={Link}
                    to='/phim-dang-chieu'
                    sx={{
                      display: "block",
                      textAlign: "left",
                      width: "100%",
                      color: "black",
                    }}>
                    Phim Đang Chiếu
                  </Button>
                  <Button
                    component={Link}
                    to='/phim-sap-chieu'
                    sx={{
                      display: "block",
                      textAlign: "left",
                      width: "100%",
                      color: "black",
                    }}>
                    Phim Sắp Chiếu
                  </Button>
                </Box>
              )}
            </Box>

            <Button color='inherit' component={Link} to='/rap-chieu'>
              Rạp Chiếu
            </Button>
            <Button color='inherit' component={Link} to='/members'>
              Members
            </Button>
          </Box>
        </Box>

        <Box sx={{display: "flex"}}>
          <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
            <TextField
              size='small'
              variant='outlined'
              placeholder='Tìm kiếm...'
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  height: 35,
                },
              }}
            />
            <IconButton sx={{marginRight: "3rem"}}>
              <SearchIcon sx={{color: "white"}} />
            </IconButton>
          </Box>
          <Button
            color='inherit'
            startIcon={<AccountCircleIcon />}
            component={Link}
            to='/dang-nhap'>
            Đăng Nhập
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
