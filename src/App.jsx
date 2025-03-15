import AppBar from "./components/AppBar/index";
import {Box} from "@mui/material";
import theme from "./theme";
import Body from "./components/Body/index";
function App() {
  return (
    <Box>
      {" "}
      <AppBar theme={theme} />
      <Body />
    </Box>
  );
}

export default App;
