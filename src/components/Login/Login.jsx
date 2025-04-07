import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../db.config";
import { doc, getDoc } from "firebase/firestore";
import {
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Stack,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Login = ({ setUserData }) => {
  Login.propTypes = {
    setUserData: PropTypes.func.isRequired,
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg("");
    if (!email || !password) {
      setErrorMsg("Vui lòng nhập email và mật khẩu.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Lấy dữ liệu user từ Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      if (userData) {
        const fullUserData = {
          email: user.email,
          username: userData.username,
          role: userData.role,
        };

        // Lưu vào localStorage
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(fullUserData));

        // Cập nhật state
        setUserData(fullUserData);

        // Chuyển về trang chính
        navigate("/");
      } else {
        setErrorMsg("Không tìm thấy thông tin người dùng.");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.message);
      setErrorMsg("Email hoặc mật khẩu không chính xác.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Đăng Nhập
      </Typography>

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Alert>
      )}

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Mật khẩu"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        Đăng Nhập
      </Button>

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <Link href="/forgot-password" underline="hover">
          Quên mật khẩu?
        </Link>
        <Link href="/register" underline="hover">
          Tạo tài khoản
        </Link>
      </Stack>
    </Box>
  );
};

export default Login;
