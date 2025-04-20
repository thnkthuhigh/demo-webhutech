import { useEffect, useState } from "react";
import { db } from "../../db.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import PropTypes from "prop-types";
import QRCode from "react-qr-code";

const MyTickets = ({ email }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!email) return;

      const q = query(
        collection(db, "tickets"),
        where("userEmail", "==", email)
      );
      const snapshot = await getDocs(q);
      const ticketList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTickets(ticketList);
    };

    fetchTickets();
  }, [email]);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box sx={{ padding: 3, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Vé của tôi
      </Typography>

      <Grid container spacing={2}>
        {tickets.length === 0 ? (
          <Typography>Chưa có vé nào được đặt.</Typography>
        ) : (
          tickets.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={ticket.id}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{ticket.movieTitle}</Typography>
                  <Typography>Rạp: {ticket.cinemaName}</Typography>
                  <Typography>
                    Ngày chiếu: {formatDateTime(ticket.date)}
                  </Typography>
                  <Typography>Giờ chiếu: {ticket.time}</Typography>
                  <Button
                    variant="outlined"
                    sx={{ marginTop: 1 }}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    Chi tiết vé
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Dialog hiển thị chi tiết vé */}
      <Dialog
        open={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        fullWidth
        maxWidth="sm"
      >
        {selectedTicket && (
          <>
            <DialogTitle>Chi tiết vé</DialogTitle>
            <DialogContent>
              <Typography>
                <strong>Tên phim:</strong> {selectedTicket.movieTitle}
              </Typography>
              <Typography>
                <strong>Rạp:</strong> {selectedTicket.cinemaName}
              </Typography>
              <Typography>
                <strong>Ngày chiếu:</strong>{" "}
                {formatDateTime(selectedTicket.date)}
              </Typography>
              <Typography>
                <strong>Giờ chiếu:</strong> {selectedTicket.time}
              </Typography>
              <Typography>
                <strong>Ghế:</strong> {selectedTicket.seat}
              </Typography>
              <Typography>
                <strong>Giá vé:</strong> {selectedTicket.price.toLocaleString()}{" "}
                VNĐ
              </Typography>
              <Typography>
                <strong>Tổng tiền:</strong>{" "}
                {selectedTicket.totalPrice.toLocaleString()} VNĐ
              </Typography>
              <Typography>
                <strong>Ngày đặt vé:</strong>{" "}
                {formatDateTime(selectedTicket.createdAt)}
              </Typography>
              <Typography>
                <strong>Người đặt:</strong> {selectedTicket.userName} (
                {selectedTicket.userEmail})
              </Typography>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <QRCode
                  value={selectedTicket.id}
                  size={150}
                  style={{ height: "auto", maxWidth: "100%", width: "150px" }}
                />
                <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                  Mã vé: {selectedTicket.id}
                </Typography>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

MyTickets.propTypes = {
  email: PropTypes.string,
};

export default MyTickets;
