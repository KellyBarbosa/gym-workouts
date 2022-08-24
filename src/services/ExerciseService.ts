import api from "../services/api";

export const getAllExercises = async () => {
  const { data } = await api.get("/exercises");
  return data ;
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
  api
    .post("/exercises", {
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
 
   if (!response?.category.includes(category)) {
    api
      .patch(`/exercises/${idExercise}`, {
        name,
        series,
        repeat,
        weight,
        category: [...response.category, category],
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
      })
      .then(() => {
        console.log("Exercício atualizado com sucesso!");
      })
      .catch((err) => {
        console.log("Erro ao atualizar o exercício! " + err);
      });
  }  
};
