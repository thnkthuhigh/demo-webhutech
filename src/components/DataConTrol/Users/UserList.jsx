import { useState, useEffect } from "react";
import { db } from "../../../db.config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await deleteDoc(doc(db, "users", id));
        setUsers(users.filter((user) => user.id !== id));
        alert("Xóa người dùng thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error.message);
        alert("Lỗi khi xóa người dùng: " + error.message);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Danh Sách Người Dùng
      </Typography>

      {/* Nút thêm người dùng */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        component={Link}
        to="/them-nguoi-dung"
      >
        Thêm Người Dùng
      </Button>

      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            secondaryAction={
              <>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteUser(user.id)}
                  sx={{ mr: 2 }}
                >
                  Xóa
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to={`/sua-nguoi-dung/${user.id}`}
                >
                  Sửa
                </Button>
              </>
            }
          >
            <ListItemText primary={user.username} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
