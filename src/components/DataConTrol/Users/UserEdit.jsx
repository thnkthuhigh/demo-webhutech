import { useState, useEffect } from "react";
import { db } from "../../../db.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UserEdit = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", email);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.username);
          setRole(userData.role);
        } else {
          setError("Không tìm thấy người dùng");
        }
      } catch (error) {
        setError("Lỗi khi tải dữ liệu người dùng: " + error.message);
      }
    };

    fetchUserData();
  }, [email]);

  const handleSaveUser = async () => {
    if (!username || !role) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const userRef = doc(db, "users", email);
      await setDoc(userRef, { username, role }, { merge: true });
      alert("Cập nhật người dùng thành công!");
      navigate("/quan-ly-nguoi-dung"); // Điều hướng về danh sách người dùng
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error.message);
      alert("Lỗi khi cập nhật người dùng: " + error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Sửa Người Dùng
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Tên người dùng"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Quyền"
        fullWidth
        margin="normal"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleSaveUser}
        sx={{ mt: 2 }}
      >
        Lưu Thay Đổi
      </Button>
    </Box>
  );
};

export default UserEdit;
