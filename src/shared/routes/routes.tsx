import { Route, Routes } from "react-router-dom";
import ListCategory from "../components/categories/ListCategory";
import EditCategory from "../components/categories/EditCategory";
import RegisterCategory from "../components/categories/RegisterCategory";

import ListExercise from "../components/exercises/ListExercise";
import EditExercise from "../components/exercises/EditExercise";
import RegisterExercise from "../components/exercises/RegisterExercise";

import Home from "../../pages/Home2";
import WorkoutGenerator from "../../pages/WorkoutGenerator";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/workoutGenerator" element={<WorkoutGenerator />} />

      <Route path="/editExercise" element={<EditExercise />} />
      <Route path="/listExercise" element={<ListExercise />} />
      <Route path="/registerExercise" element={<RegisterExercise />} />

      <Route path="/editCategory" element={<EditCategory />} />
      <Route path="/listCategory" element={<ListCategory />} />
      <Route path="/registerCategory" element={<RegisterCategory />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
