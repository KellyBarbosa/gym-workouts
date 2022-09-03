import { BrowserRouter } from "react-router-dom";
//import "./App.css";

import Navigation from "./shared/components/Navigation";
import AppRoutes from "./shared/routes/routes";
import { AppThemeProvider } from "./shared/context/ThemeContext";

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
