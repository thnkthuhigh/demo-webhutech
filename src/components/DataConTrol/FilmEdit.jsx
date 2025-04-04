import { useEffect, useState } from "react";
import { db } from "../../db.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { Timestamp } from "firebase/firestore";

const FilmEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const docRef = doc(db, "movie", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const movie = docSnap.data();
          setTitle(movie.title || "");
          setCategory(movie.category || "");
          setDuration(movie.duration || "");
          if (movie.releaseDate?.toDate) {
            const dateObj = movie.releaseDate.toDate();
            const formatted = dateObj.toISOString().slice(0, 10); // yyyy-mm-dd
            setReleaseDate(formatted);
          } else {
            setReleaseDate("");
          }
        } else {
          console.error("Không tìm thấy phim!");
        }
      } catch (error) {
        console.error("Lỗi khi lấy phim:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "movie", id);

      // Chuyển chuỗi "yyyy-mm-dd" sang Timestamp
      const [year, month, day] = releaseDate.split("-");
      const dateObj = new Date(year, month - 1, day);
      const timestamp = Timestamp.fromDate(dateObj);

      await updateDoc(docRef, {
        title,
        category,
        duration,
        releaseDate: timestamp,
      });
      navigate("/phimx");
    } catch (error) {
      console.error("Lỗi khi cập nhật phim:", error);
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Chỉnh sửa phim
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
        label="Thời lượng"
        fullWidth
        margin="normal"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <TextField
        label="Khởi chiếu"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />
      <Button variant="contained" onClick={handleUpdate}>
        Lưu thay đổi
      </Button>
    </>
  );
};

export default FilmEdit;
