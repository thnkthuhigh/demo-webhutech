import BannerAd from "./BannerAD";
import HeadBody from "./HeadBody";
import MovieList from "./MovieList";
import {Box} from "@mui/material";
const Body = () => {
  return (
    <Box sx={{marginTop: "4rem"}}>
      <HeadBody />
      <BannerAd />
      <MovieList />
    </Box>
  );
};

export default Body;
