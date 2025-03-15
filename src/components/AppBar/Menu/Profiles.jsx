import {Box} from "@mui/material";

const Profiles = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        height: "100%",
        width: "50px",
        bgcolor: "yellow",
        justifyContent: "center",
        gap: "20%",
      }}>
      <Box>Mua vé</Box>
      <Box>Rạp chiếu</Box>
      <Box>Phim Chiếu</Box>
    </Box>
  );
};

export default Profiles;
