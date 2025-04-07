import { useState } from "react";
import { db } from "../../../db.config";
import { doc, setDoc } from "firebase/firestore";
import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserAdd = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); // Mặc định là 'user'
  const navigate = useNavigate();

  const handleAddUser = async () => {
    if (!username || !email || !role) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      // Tạo document mới trong Firestore
      const userRef = doc(db, "users", email);
      await setDoc(userRef, {
        username,
        email,
        role,
        createdAt: new Date(),
      });

      alert("Thêm người dùng thành công!");
      navigate("/quan-ly-nguoi-dung"); // Điều hướng về danh sách người dùng
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error.message);
      alert("Lỗi khi thêm người dùng: " + error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Thêm Người Dùng
      </Typography>
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

      {/* Dropdown chọn quyền */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Quyền</InputLabel>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          label="Quyền"
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        fullWidth
        onClick={handleAddUser}
        sx={{ mt: 2 }}
      >
        Thêm Người Dùng
      </Button>
    </Box>
  );
};

export default UserAdd;
