import api from "../services/api";
import { IExercise } from "./Structure";

export const getAllExercises = async () => {
  const response = await api.get(`/exercises`);
  return response.data;
};

export const getExerciseById = async (idExercise: number) => {
  const { data } = await api.get(`/exercises/${idExercise}`);
  return data;
};

export const removeExercise = async (idExercise: number) => {
    api
      .delete(`/exercises/${idExercise}`)
      .then(() => {
        console.log("Exercício removido com sucesso!");
      })
      .catch((err) => {
        console.log("Erro ao remover o exercício! " + err);
      });
};

export const createExercise = async (
  name: string,
  series: string,
  repeat: string,
  weight: string,
  category: number[]
) => {
  const response = await getAllExercises();
  /* console.log(response)
    console.log(response?.at(-1).id + 1) */
  api
    .post(`/exercises`, {
      id: response?.at(-1).id + 1,
      name,
      series,
      repeat,
      weight,
      category,
    })
    .then(() => {
      console.log("Exercício cadastrado com sucesso!");
    })
    .catch((err) => {
      console.log("Erro ao cadastrar o exercício! " + err);
    });
};

export const updateExercise = async (
  idExercise: number,
  name: string,
  series: string,
  repeat: string,
  weight: string,
  category: number
) => {
  const response = await getExerciseById(idExercise);
  console.log(response.category);

  const filteredCategories = response?.category.includes(category);
  
  /* response?.filter((exercise: IExercise) => {
    exercise.category.includes(category);
  }); */
  console.log(filteredCategories);
  if (filteredCategories) {
    filteredCategories.category.put(category);
    api
      .patch(`/exercises/${idExercise}`, {
        name,
        series,
        repeat,
        weight,
        category: filteredCategories.category,
      })
      .then(() => {
        console.log("Exercício atualizado com sucesso!");
      })
      .catch((err) => {
        console.log("Erro ao atualizar o exercício! " + err);
      });
  } else {
    api
      .patch(`/exercises/${idExercise}`, {
        name,
        series,
        repeat,
        weight,
        category,
      })
      .then(() => {
        console.log("Exercício atualizado com sucesso!");
      })
      .catch((err) => {
        console.log("Erro ao atualizar o exercício! " + err);
      });
  } 
};
