import { BrowserRouter } from "react-router-dom";
import Navigation from "./shared/components/navbar/Navigation";
import AppRoutes from "./shared/routes/routes";
import { AppThemeProvider } from "./shared/context/ThemeContext";
import Box from "@mui/material/Box";
function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Box
          sx={{
            display: "grid",
            gap: 5,
          }}
        >
          <Box>
            <Navigation />
          </Box>
          <Box>
            <AppRoutes />
          </Box>
        </Box>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
