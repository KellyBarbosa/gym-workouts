import api from "../services/api";
import { IExercise } from "./Structure";

export const getAllExercises = async (endpoint: string) => {
  const response = await api.get(`/${endpoint}`);
  return response.data;
};

export const getExerciseById = async (endpoint: string, idExercise: number) => {
  const { data } = await api.get(`/${endpoint}/${idExercise}`);
  return data;
};

export const removeExercise = async (idExercise: number, endpoint: string) => {
    api
      .delete(`/${endpoint}/${idExercise}`)
      .then(() => {
        console.log("Exercício removido com sucesso!");
      })
      .catch((err) => {
        console.log("Erro ao remover o exercício! " + err);
      });
  
};

export const createExercise = async (
  endpoint: string,
  name: string,
  series: string,
  repeat: string,
  weight: string,
  category: number[]
) => {
  const response = await getAllExercises(endpoint);
  /* console.log(response)
    console.log(response?.at(-1).id + 1) */
  api
    .post(`/${endpoint}`, {
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
  endpoint: string,
  name: string,
  series: string,
  repeat: string,
  weight: string,
  category: number
) => {
  const response = await getExerciseById(endpoint, idExercise);
  console.log(response.category);

  const filteredCategories = response?.category.includes(category);
  
  /* response?.filter((exercise: IExercise) => {
    exercise.category.includes(category);
  }); */
  console.log(filteredCategories);
  if (filteredCategories) {
    filteredCategories.category.put(category);
    api
      .patch(`/${endpoint}/${idExercise}`, {
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
      .patch(`/${endpoint}/${idExercise}`, {
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
