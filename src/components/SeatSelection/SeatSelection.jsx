import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../db.config";

const seats = Array.from({ length: 40 }, (_, i) => `G${i + 1}`);

// THÔNG TIN NGÂN HÀNG CỦA RẠP (dùng để tạo QR VietQR)
const BANK_ID = "MbBank";
const ACCOUNT_NUMBER = "0359498968"; // số tài khoản nhận tiền

export default function SeatSelection() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(300); // 5 phút = 300 giây
  const [showQRDialog, setShowQRDialog] = useState(false);

  const ticket = state?.ticket;
  const movieId = ticket?.movieId;
  const total = selectedSeats.length * ticketPrice;

  useEffect(() => {
    const fetchMoviePrice = async () => {
      if (!movieId) return;

      try {
        const movieDocRef = doc(db, "movie", movieId);
        const movieDoc = await getDoc(movieDocRef);

        if (movieDoc.exists()) {
          const movieData = movieDoc.data();
          setTicketPrice(movieData.price || 0);
        } else {
          console.error("Movie không tồn tại.");
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin phim:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviePrice();
  }, [movieId]);

  const handleSeatSelect = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế!");
      return;
    }
    setShowQRDialog(true);
    setCountdown(300); // reset thời gian mỗi lần mở
  };

  // Đếm ngược 5 phút
  useEffect(() => {
    let timer;
    if (showQRDialog && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    if (countdown === 0) {
      setShowQRDialog(false);
    }
    return () => clearInterval(timer);
  }, [showQRDialog, countdown]);

  const handlePaymentConfirmed = async () => {
    try {
      const promises = selectedSeats.map((seat) =>
        addDoc(collection(db, "tickets"), {
          ...ticket,
          seat,
          price: ticketPrice,
          totalPrice: ticketPrice * selectedSeats.length,
          createdAt: new Date().toISOString(),
        })
      );
      await Promise.all(promises);
      setShowQRDialog(false);
      setOpenDialog(true);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const qrUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NUMBER}-compact2.png?amount=${total}&addInfo=Mua+ve+${
    ticket?.movieTitle
  }+(${selectedSeats.join("-")})`;

  if (loading) {
    return (
      <Container sx={{ my: 4 }}>
        <Typography>Đang tải dữ liệu giá vé...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h5" mb={2}>
        Chọn Ghế - {ticket?.movieTitle}
      </Typography>

      <Grid container spacing={1} mb={3}>
        {seats.map((seat) => (
          <Grid item xs={3} sm={2} md={1} key={seat}>
            <Paper
              onClick={() => handleSeatSelect(seat)}
              sx={{
                textAlign: "center",
                p: 1,
                cursor: "pointer",
                backgroundColor: selectedSeats.includes(seat)
                  ? "#1976d2"
                  : "#f5f5f5",
                color: selectedSeats.includes(seat) ? "#fff" : "#000",
                borderRadius: "8px",
              }}
              elevation={3}
            >
              {seat}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="subtitle1" mb={2}>
        Số ghế đã chọn: {selectedSeats.join(", ") || "Chưa có"}
      </Typography>
      <Typography variant="body1" mb={1}>
        Giá mỗi ghế: {ticketPrice.toLocaleString("vi-VN")} VND
      </Typography>
      <Typography variant="h6" mb={2}>
        Tổng tiền: {total.toLocaleString("vi-VN")} VND
      </Typography>

      <Button variant="contained" onClick={handleConfirm}>
        Xác nhận và thanh toán
      </Button>

      {/* Dialog QR + Đếm ngược */}
      <Dialog
        open={showQRDialog}
        onClose={() => setShowQRDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Quét mã để thanh toán</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <img
            src={qrUrl}
            alt="QR thanh toán"
            style={{ width: 200, marginBottom: 10 }}
          />
          <Typography variant="body2" gutterBottom>
            Vui lòng chuyển {total.toLocaleString("vi-VN")} VND đến tài khoản
            bên dưới
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mã sẽ hết hạn trong: <strong>{formatTime(countdown)}</strong>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setShowQRDialog(false)}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handlePaymentConfirmed}>
            Đã thanh toán
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog thông báo sau khi lưu */}
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          navigate("/"); // về trang chủ sau khi đặt xong
        }}
      >
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn đã đặt các ghế: {selectedSeats.join(", ")} thành công!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              navigate("/");
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
