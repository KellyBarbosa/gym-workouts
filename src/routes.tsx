import { Route, Routes } from "react-router-dom";
import ListCategory from "./components/categories/ListCategory";
import RegisterCategory from "./components/categories/RegisterCategory";
import ListExercise from "./components/exercises/ListExercise";
import RegisterExercise from "./components/exercises/RegisterExercise";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/listExercise" element={<ListExercise />} />
      <Route path="/listCategory" element={<ListCategory />} />
      <Route path="/registerExercise" element={<RegisterExercise />} />
      <Route path="/registerCategory" element={<RegisterCategory />} />
    </Routes>
  );
}

export default AppRoutes;
