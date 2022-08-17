import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

interface IExercise {
  name: string;
  series: string;
  repeat: string;
  weight: string;
  type: typeExercise[];
}

enum typeExercise {
  peito = "Peito",
  ombro = "Ombro",
  triceps = "Tríceps",
  costas = "Costas",
  panturrilha = "Panturrilha",
  quadriceps = "Quadríceps",
  posterior = "Posterior",
  gluteo = "Glúteo",
  abdominal = "Abdominal",
  aerobico = "Aeróbico",
  biceps = "Bíceps",
}

function App() {
  const [exercises, setExercises] = useState<IExercise[]>([
    {
      name: "Agachamento barra",
      series: "4",
      repeat: "Falha",
      weight: "Aumentando a carga",
      type: [typeExercise.quadriceps, typeExercise.gluteo],
    },
    {
      name: "Avanço livre",
      series: "3",
      repeat: "Falha",
      weight: "0",
      type: [typeExercise.quadriceps],
    },
    {
      name: "Hack machine",
      series: "4",
      repeat: "10 + 5 curtas + 10 agachamentos livres",
      weight: "0",
      type: [typeExercise.quadriceps],
    },
    {
      name: "Panturrilha sentada",
      series: "5",
      repeat: "15",
      weight: "0",
      type: [typeExercise.panturrilha],
    },
    {
      name: "Puxador frente pronado",
      series: "4",
      repeat: "12",
      weight: "0",
      type: [typeExercise.costas],
    },
    {
      name: "Elevação lateral",
      series: "3",
      repeat: "12",
      weight: "0",
      type: [typeExercise.ombro],
    },
    {
      name: "Rosca direta W",
      series: "3",
      repeat: "10",
      weight: "0",
      type: [typeExercise.biceps],
    },
    {
      name: "Esteira",
      series: "6",
      repeat: "6 tiros de 30 segundos + 1 caminhando",
      weight: "0",
      type: [typeExercise.aerobico],
    },
  ]);

  return (
    <div className="App">
      {exercises.map((exercise) => (
        <li key={exercise.name}>
          {exercise.name} | {exercise.series} | {exercise.repeat} |{" "}
          {exercise.weight} -
          {exercise.type.map((et) => (
            <strong> {et}</strong>
          ))}
        </li>
      ))}
    </div>
  );
}

export default App;
