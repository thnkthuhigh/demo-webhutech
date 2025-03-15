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
import {X} from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar position='static' sx={{bgcolor: "#F48FB1", height: 64}}>
      {" "}
      {/* Đặt chiều cao cho AppBar */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
          padding: "2px",
        }}>
        {/* Logo */}
        <Box sx={{display: "flex", alignItems: "center", height: "100%"}}>
          <CinematIcon />
        </Box>
        <Box sx={{display: "flex", gap: 2.5}}>
          <Button variant='contained' sx={{bgcolor: "#FF6F00", color: "white"}}>
            Mua Vé
          </Button>
          <Button color='inherit'>Lịch Chiếu</Button>
          <Button color='inherit'>Rạp Chiếu</Button>
          <Button color='inherit'>Phim Chiếu</Button>
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
          <Button color='inherit' startIcon={<AccountCircleIcon />}>
            Đăng Nhập
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
