import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../db.config";
import { doc, setDoc } from "firebase/firestore";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Register = ({ setUserData }) => {
  Register.propTypes = {
    setUserData: PropTypes.func.isRequired,
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (!email || !password || !confirmPassword || !username) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const newUserData = {
        email: user.email,
        username,
        role: "user",
        createdAt: new Date(),
      };

      // Ghi dữ liệu vào Firestore
      await setDoc(doc(db, "users", user.uid), newUserData);

      // Lấy token và lưu vào localStorage
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(newUserData));

      // Cập nhật App
      setUserData(newUserData);

      alert("Đăng ký thành công!");
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng ký:", error.message);
      setError("Lỗi đăng ký: " + error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Đăng Ký
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Tên người dùng"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <TextField
        label="Nhập lại mật khẩu"
        type="password"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleRegister}
        sx={{ mt: 2 }}
      >
        Đăng Ký
      </Button>
    </Box>
  );
};

export default Register;
