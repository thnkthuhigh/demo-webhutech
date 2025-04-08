import { useEffect, useState } from "react";
import { db } from "../../../db.config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const FilmList = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "movie"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phim:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "movie", id));
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
    }
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
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {movie.img && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={movie.img}
                    alt={movie.title}
                    sx={{ objectFit: "cover" }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
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
                  <Typography variant="body2" color="text.secondary">
                    Giá vé:{" "}
                    {movie.price
                      ? movie.price.toLocaleString("vi-VN") + " ₫"
                      : "Không rõ"}
                  </Typography>
                  {movie.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {movie.description}
                    </Typography>
                  )}
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
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", width: "100%", mt: 2 }}
          >
            Không có phim nào.
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default FilmList;
