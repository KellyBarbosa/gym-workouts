import { useState, useEffect } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { ICategory } from "../../services/Structure";

import {
  getAllCategories,
  removeCategory,
} from "../../services/CategoryService";

function ListCategory() {
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));
  }, []);

  const deleteCategory = (idCategory: number) => {
    removeCategory(idCategory);
  };

  return (
    <div>
      <h2> Tela de listagem de categorias </h2>

      {categories &&
        categories.map((category) => (
          <li key={category.id}>
            {category.name} -----
            <DeleteIcon onClick={() => deleteCategory(category.id)} /> -----{" "}
            <EditIcon onClick={() => console.log("Editar")} />
          </li>
        ))}
    </div>
  );
}

export default ListCategory;
