import { useState, useEffect } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { ICategory } from "../../services/Structure";

import { useNavigate } from "react-router-dom";

import {
  getAllCategories,
  removeCategory,
} from "../../services/CategoryService";

function ListCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);

  function loadCategories() {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const deleteCategory = (idCategory: number) => {
    removeCategory(idCategory);
    loadCategories();
  };

  return (
    <div>
      <h2> Tela de listagem de categorias </h2>
      <ul style={{ listStyle: "none" }}>
        {categories &&
          categories.map((category) => (
            <li key={category.id}>
              {" "}
              <h4>
                {category.name} -----
                <DeleteIcon
                  onClick={() => deleteCategory(category.id)}
                /> -----{" "}
                <EditIcon
                  onClick={() => navigate("/editCategory", { state: category })}
                />
              </h4>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ListCategory;
