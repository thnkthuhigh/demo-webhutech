import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../db.config";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const docRef = doc(db, "movie", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMovie({ id: docSnap.id, ...data });
        } else {
          console.log("Không tìm thấy phim");
        }
      } catch (error) {
        console.error("Lỗi khi tải phim:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" align="center">
          Đang tải thông tin phim...
        </Typography>
      </Container>
    );
  }

  const {
    title = "Không rõ tiêu đề",
    img,
    category = "Không rõ",
    duration = "Không rõ",
    releaseDate,
    description = "Chưa có nội dung mô tả cho phim này.",
  } = movie;

  let formattedDate = "Không rõ";
  if (releaseDate?.seconds) {
    formattedDate = new Date(releaseDate.seconds * 1000).toLocaleDateString(
      "vi-VN"
    );
  } else if (typeof releaseDate === "string") {
    formattedDate = new Date(releaseDate).toLocaleDateString("vi-VN");
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="350"
                image={
                  img || "https://via.placeholder.com/300x400?text=No+Image"
                }
                alt={title}
                sx={{ borderRadius: 2, objectFit: "cover" }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              <strong>Thể loại:</strong> {category}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              <strong>Thời lượng:</strong> {duration}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              <strong>Khởi chiếu:</strong> {formattedDate}
            </Typography>

            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate("/confirm-ticket", { state: movie })}
              >
                Tiếp tục đặt vé
              </Button>
            </Box>

            <Box mt={2}>
              <Button variant="text" fullWidth onClick={() => navigate(-1)}>
                ← Quay lại danh sách phim
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6" fontWeight="bold">
            Nội dung phim
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, textAlign: "justify" }}>
            {description}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
