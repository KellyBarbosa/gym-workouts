import "./App.css";

import Navigation from "./components/Navigation";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="App">
      <Navigation />
      <AppRoutes />
    </div>
  );
}

export default App;
