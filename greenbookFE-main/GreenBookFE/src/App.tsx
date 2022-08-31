import { createTheme, ThemeProvider } from "@mui/material/styles";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/navBar";
import ContentContainer from "./components/contentContainer";
import ReportsContainer from "./components/reportsContainer";
const theme = createTheme({
  palette: {
    primary: {
      main: "#ABD699",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <ContentContainer backgroundFilled={false}>
        <ReportsContainer />
      </ContentContainer>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
      />
    </ThemeProvider>
  );
}

export default App;
