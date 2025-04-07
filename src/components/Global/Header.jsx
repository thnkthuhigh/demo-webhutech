import PropTypes from "prop-types";
import { AppBar, Toolbar, Button, Box, Divider } from "@mui/material";
import CinematIcon from "../../assets/img/CinematIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ userData, onLogout }) => {
  const [openManagement, setOpenManagement] = useState(false);

  return (
    <AppBar position="static" sx={{ bgcolor: "#ffffff " }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "right",
          minHeight: "20px !important",
          height: "30px",
          padding: "6px 16px",
          bgcolor: "#000000 ",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, mx: "120px" }}>
          <Button
            component={Link}
            to="/tin-moi"
            sx={{ color: "white", fontSize: "12px", padding: "4px 8px" }}
          >
            TIN MỚI & ƯU ĐÃI
          </Button>
          <Button
            component={Link}
            to="/ve-cua-toi"
            sx={{ color: "white", fontSize: "12px", padding: "4px 8px" }}
          >
            VÉ CỦA TÔI
          </Button>
        </Box>
        {userData ? (
          <>
            <Button
              sx={{
                color: "white",
                fontSize: "12px",
                padding: "4px 8px",
                textTransform: "none",
              }}
            >
              Chào! {userData.username}
              {userData.role === "admin" && " (admin)"}
            </Button>
            <Button
              onClick={onLogout}
              sx={{
                color: "white",
                fontSize: "12px",
                padding: "4px 8px",
                textTransform: "none",
              }}
            >
              Đăng xuất
            </Button>
          </>
        ) : (
          <Button
            component={Link}
            to="/login"
            startIcon={<AccountCircleIcon />}
            sx={{ fontSize: "12px", padding: "4px 8px" }}
          >
            ĐĂNG NHẬP / ĐĂNG KÝ
          </Button>
        )}
      </Toolbar>

      <Divider sx={{ bgcolor: "#D32F2F", height: 2 }} />

      <Toolbar
        sx={{
          maxHeight: "100px",
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Box component={Link} to="/" sx={{ height: "64px", display: "flex" }}>
            <CinematIcon />
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <Button component={Link} to="/phim" sx={{ color: "black" }}>
              PHIM
            </Button>
            <Button component={Link} to="/rap" sx={{ color: "black" }}>
              RẠP FOUREEL
            </Button>
            <Button component={Link} to="/thanh-vien" sx={{ color: "black" }}>
              THÀNH VIÊN
            </Button>

            {userData && userData.role === "admin" && (
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                }}
                onMouseEnter={() => setOpenManagement(true)}
                onMouseLeave={() => setOpenManagement(false)}
              >
                <Button color="inherit" sx={{ color: "black" }}>
                  Quản Lý
                </Button>

                {openManagement && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      bgcolor: "white",
                      boxShadow: 3,
                      borderRadius: 1,
                      zIndex: 10,
                      padding: "0.5rem",
                      border: "solid 2px black",
                      minWidth: "max-content",
                    }}
                  >
                    <Button
                      component={Link}
                      to="/quan-ly-phim"
                      sx={{
                        display: "block",
                        textAlign: "left",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      Quản Lý Phim
                    </Button>
                    <Button
                      component={Link}
                      to="/quan-ly-rap"
                      sx={{
                        display: "block",
                        textAlign: "left",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      Quản Lý Rạp
                    </Button>
                    <Button
                      component={Link}
                      to="/quan-ly-suat-chieu"
                      sx={{
                        display: "block",
                        textAlign: "left",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      Quản Lý Suất Chiếu
                    </Button>
                    <Button
                      component={Link}
                      to="/quan-ly-nguoi-dung"
                      sx={{
                        display: "block",
                        textAlign: "left",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      Quản Lý Người Dùng
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// PropTypes
Navbar.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
