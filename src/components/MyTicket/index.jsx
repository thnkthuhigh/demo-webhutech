import { useEffect, useState } from "react";
import { db } from "../../db.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import PropTypes from "prop-types";

const MyTickets = ({ email }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!email) return;

      const q = query(
        collection(db, "tickets"),
        where("userEmail", "==", email)
      ); // Truy vấn theo userEmail
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
                  <Typography>
                    Ngày đặt vé: {formatDateTime(ticket.createdAt)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

MyTickets.propTypes = {
  email: PropTypes.string, // Kiểm tra 'email' đã được truyền đúng
};

export default MyTickets;
