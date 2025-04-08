import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../db.config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function TicketConfirmation() {
  const { state: movie } = useLocation();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [showtimes, setShowtimes] = useState({});
  const [theaters, setTheaters] = useState({});
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  // Khởi tạo danh sách 10 ngày tới
  useEffect(() => {
    const today = new Date();
    const futureDates = Array.from({ length: 10 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });
    setDates(futureDates);
  }, []);

  // Lấy thông tin người dùng từ Firebase Auth và Firestore
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    setUser(currentUser);

    const fetchUser = async () => {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserDetails(userSnap.data());
      } else {
        console.warn("Không tìm thấy thông tin người dùng.");
      }
    };

    fetchUser();
  }, []);

  // Lấy danh sách rạp
  useEffect(() => {
    const fetchTheaters = async () => {
      const theaterQuery = query(collection(db, "theaters"));
      const snapshot = await getDocs(theaterQuery);
      const theaterMap = {};
      snapshot.forEach((doc) => {
        theaterMap[doc.id] = doc.data();
      });
      setTheaters(theaterMap);
    };

    fetchTheaters();
  }, []);

  // Lấy danh sách suất chiếu theo phim và ngày
  useEffect(() => {
    const fetchShowtimes = async () => {
      if (!movie?.id) return;

      const q = query(
        collection(db, "showtimes"),
        where("movieId", "==", movie.id)
      );
      const snapshot = await getDocs(q);
      const result = {};
      const selectedDay = selectedDate.setHours(0, 0, 0, 0);

      snapshot.forEach((docSnap) => {
        const showtime = docSnap.data();
        const showDate = new Date(showtime.date.seconds * 1000).setHours(
          0,
          0,
          0,
          0
        );

        if (showDate === selectedDay) {
          const theaterId = showtime.theaterId;
          if (!result[theaterId]) result[theaterId] = [];
          result[theaterId].push({
            id: docSnap.id,
            ...showtime,
            time: new Date(showtime.date.seconds * 1000).toLocaleTimeString(
              "vi-VN",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
          });
        }
      });

      setShowtimes(result);
      setCinemas(Object.keys(result));
    };

    fetchShowtimes();
  }, [movie, selectedDate]);

  const handleConfirm = (showtime) => {
    if (!user || !userDetails) {
      setDialogMessage("Vui lòng đăng nhập để mua vé.");
      setOpenDialog(true);
      return;
    }

    const ticket = {
      movieId: movie.id,
      movieTitle: movie.title,
      cinemaId: selectedCinema,
      cinemaName: theaters[selectedCinema]?.name || "Không rõ rạp",
      date: selectedDate.toISOString(),
      showtimeId: showtime.id,
      time: showtime.time,
      userId: user.uid,
      userEmail: userDetails.email,
      userRole: userDetails.role,
      userName: userDetails.username || "Không rõ tên",
    };

    navigate("/select-seat", { state: { ticket } });
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Xác Nhận Mua Vé - {movie?.title || "Không có phim"}
      </Typography>

      {/* Chọn ngày */}
      <Box sx={{ overflowX: "auto", mb: 3 }}>
        <ToggleButtonGroup
          exclusive
          value={selectedDate}
          onChange={(e, val) => val && setSelectedDate(val)}
        >
          {dates.map((date, i) => (
            <ToggleButton
              key={i}
              value={date}
              sx={{ borderRadius: 2, px: 2, mx: 1 }}
            >
              {date.getDate().toString().padStart(2, "0")}/
              {(date.getMonth() + 1).toString().padStart(2, "0")}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Chọn rạp */}
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          exclusive
          value={selectedCinema}
          onChange={(e, val) => val && setSelectedCinema(val)}
        >
          {cinemas.length > 0 ? (
            cinemas.map((id) => (
              <ToggleButton
                key={id}
                value={id}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  mx: 1,
                  bgcolor: "#f5f5f5",
                  "&.Mui-selected": {
                    bgcolor: "#1976d2",
                    color: "#fff",
                  },
                }}
              >
                {theaters[id]?.name || "Không rõ rạp"}
              </ToggleButton>
            ))
          ) : (
            <Typography>Không có rạp chiếu cho ngày đã chọn.</Typography>
          )}
        </ToggleButtonGroup>
      </Box>

      {/* Suất chiếu */}
      {selectedCinema && showtimes[selectedCinema]?.length > 0 ? (
        <Grid container spacing={2}>
          {showtimes[selectedCinema].map((s) => (
            <Grid item xs={12} sm={6} md={4} key={s.id}>
              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                <Typography>Rạp: {theaters[selectedCinema]?.name}</Typography>
                <Typography>Giờ chiếu: {s.time}</Typography>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1 }}
                  onClick={() => handleConfirm(s)}
                >
                  Chọn vé
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Không có suất chiếu cho rạp này.</Typography>
      )}

      {/* Dialog thông báo */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Thông Báo</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
