export interface IExercise {
  name: string;
  series: string;
  repeat: string;
  weight: string;
  type: typeExercise[];
}

export enum typeExercise {
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

export interface ICategory {
  id: number;
  name: string;
}

export const dados = [
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
]