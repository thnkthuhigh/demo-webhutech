import { useEffect, useState } from "react";
import { db } from "../../db.config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const FilmList = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    const querySnapshot = await getDocs(collection(db, "movie"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMovies(data);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "movie", id));
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Danh sách phim
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/phim/them")}
        sx={{ mb: 2 }}
      >
        Thêm phim
      </Button>

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Thể loại: {movie.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Thời lượng: {movie.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Khởi chiếu:{" "}
                  {movie.releaseDate?.toDate
                    ? movie.releaseDate.toDate().toLocaleDateString("vi-VN")
                    : "Không xác định"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/phim/sua/${movie.id}`)}
                >
                  Sửa
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(movie.id)}
                >
                  Xóa
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FilmList;
