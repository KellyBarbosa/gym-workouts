import api from "../services/api";

import { ICategory } from "./Structure";

export const getCategory = async (endpoint: string) => {
    const response = await api.get(`/${endpoint}`);
    return response.data;
};

export const removeCategory = async (idCategory: number, endpoint: string) => {
    const response = await getCategory(endpoint)
    const filtered = response?.filter((category: ICategory) => {
        category.id == idCategory
    })

    if(filtered.length != 0){
        api.delete(`/${endpoint}/${filtered.id}`).then(() => {
            console.log("Categoria removida com sucesso!")
        }).catch((err) => {
            console.log("Erro ao remover a categoria! " + err);
        })
    } else {
        console.log("Categoria inexistente!");
    }
} 

export const createCategory = async (endpoint: string, name: string) => {
    const response = await getCategory(endpoint)
    api.post(`/${endpoint}`, {
        id: response?.at(-1).id + 1,
        name
    }).then(() => {
        console.log("Categoria cadastrada com sucesso!")
    }).catch((err) => {
        console.log("Erro ao cadastrar a categoria! " + err);
    })
} 

export const updateCategory = async (idCategory: number, endpoint: string, name: string) => {
    const response = await getCategory(endpoint)
    const filtered = response?.filter((category: ICategory) => {
        category.id == idCategory
    })

    if(filtered.length != 0){
        api.patch(`/${endpoint}/${filtered.id}`, {
            name
        }).then(() => {
            console.log("Categoria atualizada com sucesso!")
        }).catch((err) => {
            console.log("Erro ao atualizar a categoria! " + err);
        })
    } else {
        console.log("Categoria inexistente!");
    }
}