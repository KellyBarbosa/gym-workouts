import { useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { ICategory } from "../../services/Structure";

import {
  getAllCategories,
  removeCategory
} from "../../services/CategoryService";

function EditCategory() {
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);

  const [name, setName] = useState<string>("");

const patchCategorie = () => {
  //updateExercise(9, name, series, repeat, weight, Number(option))
} 

const deleteCategorie = () => {
  removeCategory(11)
} 

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));
  }, []);

  return (
    <div>
      {" "}
      <h2>Tela de edição dos categorias </h2>
      <FormControl fullWidth>
        <TextField
          label="Nome"
          id="name"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event?.target.value)
          }
          helperText="Enter exercise name"
        />

        <Button onClick={patchCategorie} variant="outlined">
          Atualizar
        </Button>
        <Button onClick={deleteCategorie} variant="outlined">
          Remover
        </Button>
      </FormControl>
    </div>
  );
}

export default EditCategory;
