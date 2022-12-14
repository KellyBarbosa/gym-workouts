import api from "./api";

export const getAllCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

export const getCategoryById = async (idCategory: number) => {
  const { data } = await api.get(`/categories/${idCategory}`);
  return data;
};

export const removeCategory = async (idCategory: number) => {
  api
    .delete(`/categories/${idCategory}`)
    .then(() => {
      console.log("Categoria removida com sucesso!");
    })
    .catch((err) => {
      console.log("Erro ao remover a categoria! " + err);
    });
};

export const createCategory = async (name: string, idTypeCategory: number) => {
  const response = await getAllCategories();
  api
    .post("/categories", {
      id: response?.at(-1).id + 1,
      name,
      type: idTypeCategory
    })
    .then(() => {
      console.log("Categoria cadastrada com sucesso!");
    })
    .catch((err) => {
      console.log("Erro ao cadastrar a categoria! " + err);
    });
};

export const updateCategory = async (idCategory: number, name: string, idTypeCategory: number) => {
  api
    .patch(`/categories/${idCategory}`, {
      name,
      type: idTypeCategory
    })
    .then(() => {
      console.log("Categoria atualizada com sucesso!");
    })
    .catch((err) => {
      console.log("Erro ao atualizar a categoria! " + err);
    });
};
