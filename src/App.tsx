import "./App.css";

import RegisterExercise from "./components/exercises/RegisterExercise";
import ListExercise from "./components/exercises/ListExercise";
import EditExercise from "./components/exercises/EditExercise";

function App() {
  return (
    <div className="App">
      <RegisterExercise />
      <hr/>
      <hr/>
      <EditExercise />
      <hr/>
      <hr/>
      <ListExercise />
      
    </div>
  );
}

export default App;
