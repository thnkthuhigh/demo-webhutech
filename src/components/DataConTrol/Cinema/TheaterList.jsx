import { useEffect, useState } from "react";
import { db } from "../../../db.config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button, Typography, Box, Alert } from "@mui/material"; // Added Alert for error message
import { useNavigate } from "react-router-dom";

const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);
  const [error, setError] = useState(null); // State to manage error messages
  const navigate = useNavigate();

  // Fetch the list of theaters
  const fetchTheaters = async () => {
    try {
      const snapshot = await getDocs(collection(db, "theaters"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTheaters(data);
    } catch (error) {
      console.error("Error fetching theaters:", error);
      setError("Could not load theaters. Please try again later.");
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  // Handle delete theater operation
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "theaters", id));
      setTheaters((prevTheaters) =>
        prevTheaters.filter((theater) => theater.id !== id)
      );
    } catch (error) {
      console.error("Error deleting theater:", error);
      setError("Could not delete theater. Please try again later.");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Danh Sách Rạp Phim
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/rap/them")}
        sx={{ mb: 2 }}
      >
        Thêm phim
      </Button>

      {/* Show error message if there is an error */}
      {error && <Alert severity="error">{error}</Alert>}

      {theaters.length === 0 ? (
        <Typography variant="body1">
          Không có rạp phim nào để hiển thị.
        </Typography>
      ) : (
        theaters.map((theater) => (
          <Box
            key={theater.id}
            sx={{
              mb: 2,
              padding: 2,
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6">{theater.name}</Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              {theater.address}
            </Typography>
            <Button
              onClick={() => navigate(`/rap/sua/${theater.id}`)}
              sx={{ marginRight: 2 }}
              variant="outlined"
            >
              Sửa
            </Button>
            <Button
              color="error"
              onClick={() => handleDelete(theater.id)}
              variant="contained"
            >
              Xóa
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default TheaterList;
