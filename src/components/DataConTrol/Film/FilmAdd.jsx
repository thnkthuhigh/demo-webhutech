import { useState } from "react";
import { db } from "../../../db.config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FilmAdd = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // Trường giá phim
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (
      !title ||
      !category ||
      !duration ||
      !releaseDate ||
      !imageUrl ||
      !description ||
      !price
    ) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const dateObject = new Date(releaseDate);

      await addDoc(collection(db, "movie"), {
        title,
        category,
        duration,
        releaseDate: Timestamp.fromDate(dateObject),
        img: imageUrl,
        description,
        price: parseInt(price), // Lưu dưới dạng số nguyên
      });

      navigate("/phimx");
    } catch (error) {
      console.error("Lỗi khi thêm phim:", error);
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Thêm phim mới
      </Typography>

      <TextField
        label="Tên phim"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Thể loại"
        fullWidth
        margin="normal"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <TextField
        label="Thời lượng (ví dụ: 121 phút 51 giây)"
        fullWidth
        margin="normal"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <TextField
        label="Khởi chiếu"
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />

      <TextField
        label="URL ảnh"
        fullWidth
        margin="normal"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Nhập URL ảnh"
      />

      <TextField
        label="Mô tả nội dung phim"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Nhập nội dung mô tả của phim"
      />

      <TextField
        label="Giá vé (VND)"
        fullWidth
        margin="normal"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Ví dụ: 75000"
      />

      <Button variant="contained" onClick={handleAdd}>
        Thêm
      </Button>
    </>
  );
};

export default FilmAdd;
