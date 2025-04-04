import { useState } from "react";
import { db } from "../../db.config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FilmAdd = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState(""); // yyyy-mm-dd
  const [imageFile, setImageFile] = useState(null); // State để lưu ảnh
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!title || !category || !duration || !releaseDate || !imageFile) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      // Chuyển releaseDate từ chuỗi sang Date object
      const dateObject = new Date(releaseDate);

      // Tải ảnh lên Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `movies/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);

      // Lấy URL của ảnh
      const imageUrl = await getDownloadURL(storageRef);

      // Lưu thông tin phim vào Firestore
      await addDoc(collection(db, "movie"), {
        title,
        category,
        duration,
        releaseDate: Timestamp.fromDate(dateObject), // lưu kiểu timestamp
        img: imageUrl, // Lưu URL ảnh
      });

      // Điều hướng tới trang danh sách phim
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
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        style={{ margin: "20px 0" }}
      />

      <Button variant="contained" onClick={handleAdd}>
        Thêm
      </Button>
    </>
  );
};

export default FilmAdd;
