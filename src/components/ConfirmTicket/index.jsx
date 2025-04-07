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
import { useLocation } from "react-router-dom";
import { db } from "../../db.config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

export default function TicketConfirmation() {
  const { state: movie } = useLocation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [showtimes, setShowtimes] = useState({});
  const [theaters, setTheaters] = useState({});
  const [user, setUser] = useState(null); // State lưu thông tin người dùng
  const [userDetails, setUserDetails] = useState(null); // State lưu thông tin chi tiết người dùng
  const [openDialog, setOpenDialog] = useState(false); // State để mở bảng thông báo
  const [dialogMessage, setDialogMessage] = useState(""); // Nội dung thông báo

  // Tạo danh sách 10 ngày tiếp theo
  useEffect(() => {
    const today = new Date();
    const tempDates = Array.from({ length: 10 }, (_, i) => {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      return nextDate;
    });
    setDates(tempDates);
  }, []);

  // Lấy thông tin người dùng
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); // Lưu thông tin người dùng vào state

      // Truy vấn thông tin chi tiết người dùng từ bảng 'users'
      const fetchUserDetails = async () => {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setUserDetails(userSnapshot.data()); // Lưu thông tin chi tiết người dùng
        } else {
          console.log("Không tìm thấy thông tin người dùng.");
        }
      };

      fetchUserDetails();
    }
  }, []);

  // Lấy thông tin các rạp từ Firestore
  useEffect(() => {
    const fetchTheaters = async () => {
      const q = query(collection(db, "theaters"));
      const querySnapshot = await getDocs(q);
      const theaterData = {};
      querySnapshot.forEach((doc) => {
        theaterData[doc.id] = doc.data(); // Lưu thông tin đầy đủ của mỗi rạp chiếu
      });
      setTheaters(theaterData);
    };

    fetchTheaters();
  }, []);

  // Lấy thông tin suất chiếu từ Firestore
  useEffect(() => {
    const fetchShowtimes = async () => {
      if (!movie?.id) return;

      const q = query(
        collection(db, "showtimes"),
        where("movieId", "==", movie.id) // Lọc theo ID phim
      );
      const querySnapshot = await getDocs(q);

      const data = {};
      const selectedDay = selectedDate.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây thành 0 để so sánh chỉ ngày

      querySnapshot.forEach((doc) => {
        const item = doc.data();
        const showDate = new Date(item.date.seconds * 1000).setHours(
          0,
          0,
          0,
          0
        ); // Đặt giờ, phút, giây của Firestore thành 0

        // So sánh ngày (không so sánh giờ)
        if (showDate === selectedDay) {
          const theaterId = item.theaterId; // Kiểm tra trường 'theaterId'

          if (theaterId) {
            if (!data[theaterId]) data[theaterId] = [];
            // Lọc suất chiếu theo ID của rạp và phim
            data[theaterId].push({
              id: doc.id,
              ...item,
              time: new Date(item.date.seconds * 1000).toLocaleTimeString(
                "vi-VN",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              ), // Định dạng giờ chiếu
            });
          }
        }
      });

      // Cập nhật lại state sau khi lọc
      setShowtimes(data);

      // Lọc ra các rạp có suất chiếu trong ngày đã chọn
      const availableCinemas = Object.keys(data);
      setCinemas(availableCinemas);
    };

    fetchShowtimes();
  }, [movie, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCinemaChange = (cinema) => {
    setSelectedCinema(cinema);
  };

  const handleConfirm = async (showtime) => {
    // Kiểm tra nếu chưa có người dùng đăng nhập
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
      createdAt: new Date().toISOString(),
      userId: user.uid, // Lưu ID người dùng
      userEmail: userDetails.email, // Lưu email người dùng
      userRole: userDetails.role, // Lưu vai trò người dùng (admin/user)
      userName: userDetails.username || "Không rõ tên", // Lưu tên người dùng
    };

    try {
      await addDoc(collection(db, "tickets"), ticket);
      setDialogMessage(
        `Bạn đã chọn vé:\n${
          movie.title
        } | ${selectedDate.toLocaleDateString()} | ${
          theaters[selectedCinema]?.name
        } | ${showtime.time}\nNgười mua: ${
          userDetails.username || "Không rõ tên"
        }`
      );
      setOpenDialog(true);
    } catch (error) {
      console.error("Lỗi khi ghi vé:", error);
      setDialogMessage("Đặt vé thất bại. Vui lòng thử lại.");
      setOpenDialog(true);
    }
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
          onChange={(e, val) => val && handleDateChange(val)}
        >
          {dates.map((date, i) => (
            <ToggleButton
              key={i}
              value={date}
              sx={{ borderRadius: "8px", padding: "8px 16px", margin: "0 8px" }}
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
          onChange={(e, val) => val && handleCinemaChange(val)}
        >
          {cinemas.length > 0 ? (
            cinemas.map((cinemaId, i) => (
              <ToggleButton
                key={i}
                value={cinemaId}
                sx={{
                  borderRadius: "8px",
                  padding: "8px 16px",
                  margin: "0 8px",
                  backgroundColor: "#f5f5f5",
                  "&.Mui-selected": {
                    backgroundColor: "#1976d2",
                    color: "#fff",
                  },
                }}
              >
                {theaters[cinemaId]?.name || "Không rõ rạp"}
              </ToggleButton>
            ))
          ) : (
            <Typography variant="body1">
              Không có rạp chiếu cho ngày đã chọn.
            </Typography>
          )}
        </ToggleButtonGroup>
      </Box>

      {/* Danh sách suất chiếu */}
      {selectedCinema && showtimes[selectedCinema]?.length > 0 ? (
        <Grid container spacing={2}>
          {showtimes[selectedCinema].map((s) => (
            <Grid item xs={12} sm={6} md={4} key={s.id}>
              <Paper
                elevation={3}
                sx={{ p: 2, borderRadius: "8px", boxShadow: 3 }}
              >
                <Typography variant="body1" color="textSecondary">
                  Rạp: {theaters[selectedCinema]?.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Giờ chiếu: {s.time}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 1,
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#115293" },
                  }}
                  onClick={() => handleConfirm(s)}
                >
                  Chọn vé
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Không có suất chiếu cho rạp này.
        </Typography>
      )}

      {/* Dialog thông báo */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Thông Báo</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
