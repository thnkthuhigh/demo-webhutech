import { useState } from "react";
import { db } from "../../../db.config";
import { addDoc, collection } from "firebase/firestore";
import { TextField, Button, Typography, Box } from "@mui/material";

const TheaterAdd = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // Handle adding new theater
  const handleAddTheater = async () => {
    try {
      await addDoc(collection(db, "theaters"), {
        name,
        address,
      });

      // Clear the form fields after adding
      setName("");
      setAddress("");
    } catch (error) {
      console.error("Error adding theater:", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Thêm Rạp Phim
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

      <Button variant="contained" onClick={handleAddTheater} sx={{ mt: 2 }}>
        Thêm Rạp
      </Button>
    </Box>
  );
};

export default TheaterAdd;
