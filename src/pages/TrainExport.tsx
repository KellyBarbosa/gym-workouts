import { IExercise } from "../shared/services/Structure";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const columnNames = ["Exercício", "Série", "Repetições", "Carga"];

export const downloadPdf = (typeOfTrain: string, exercises: IExercise[]) => {
  
  let textTitle: string;
  if (typeOfTrain == "1") {
    textTitle = "Exercícios de inferior encontrados";
  } else if (typeOfTrain == "2") {
    textTitle = "Exercícios de superior encontrados";
  } else if (typeOfTrain == "3") {
    textTitle = "Exercícios de cardio encontrados";
  } else {
    textTitle = "Exercícios para abdominal encontrados";
  }

  const doc = new jsPDF();
  doc.text(textTitle, 20, 10);
  autoTable(doc, {
    theme: "grid",
    columns: columnNames.map((cName) => cName),
    body: exercises.map((exercise) => [
      exercise.name,
      exercise.series,
      exercise.repeat,
      exercise.weight,
    ]),
  });
  doc.save("exercises.pdf");
};