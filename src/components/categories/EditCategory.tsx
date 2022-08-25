import { useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import {
  removeCategory,
  updateCategory,
} from "../../services/CategoryService";

import { useLocation, useNavigate } from "react-router-dom";

function EditCategory() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState<string>(state.name);

  const patchCategory = () => {
    updateCategory(state.id, name);
    navigate("/listCategory")
  };

  const deleteCategory = () => {
    removeCategory(state.id);
    navigate("/listCategory")
  };

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
          helperText="Enter category name"
        />

        <Button onClick={patchCategory} variant="outlined">
          Atualizar
        </Button>
        <Button onClick={deleteCategory} variant="outlined">
          Remover
        </Button>
      </FormControl>
    </div>
  );
}

export default EditCategory;
