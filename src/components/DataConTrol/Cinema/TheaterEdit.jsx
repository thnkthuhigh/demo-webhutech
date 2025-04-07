import { useEffect, useState } from "react";
import { db } from "../../../db.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";

const TheaterEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchTheater = async () => {
      const docRef = doc(db, "theaters", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setAddress(data.address);
      }
    };

    fetchTheater();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "theaters", id), {
        name,
        address,
      });
      navigate("/rap"); // Redirect after update
    } catch (error) {
      console.error("Error updating theater:", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Chỉnh sửa Rạp
      </Typography>

      <TextField
        label="Tên rạp"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Địa chỉ"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleUpdate} sx={{ mt: 2 }}>
        Lưu
      </Button>
    </Box>
  );
};

export default TheaterEdit;
