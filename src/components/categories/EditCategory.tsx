import { useEffect, useState } from "react";

import { Button, MenuItem, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { removeCategory, updateCategory } from "../../services/CategoryService";

import { useLocation, useNavigate } from "react-router-dom";
import { IType } from "../../services/Structure";
import api from "../../services/api";
interface IDataLocation {
  id: number;
  name: string;
  type: string;
}

function EditCategory() {
  const location = useLocation();
  const state = location.state as IDataLocation;
  const navigate = useNavigate();
console.log(state)
  const [name, setName] = useState<string>(state.name);
  const [option, setOption] = useState(state.type);
  const [categoryTypes, setCategoryTypes] = useState<IType[] | null>(null);

  const patchCategory = () => {
    updateCategory(state.id, name, Number(option));
    navigate("/listCategory");
  };

  const deleteCategory = () => {
    removeCategory(state.id);
    navigate("/listCategory");
  };

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value as string);
  };

  useEffect(() => {
    api
      .get("/types")
      .then((data) => {
        setCategoryTypes(data.data);
      })
      .catch((err) => console.log("Erro ao recuperar os tipos: " + err));
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
          helperText="Enter category name"
        />

        <TextField
          id="category"
          select
          label="Tipo"
          helperText="Select a type"
          onChange={handleChangeCategory}
          value={option}
        >
          {categoryTypes &&
            categoryTypes.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
        </TextField>

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
