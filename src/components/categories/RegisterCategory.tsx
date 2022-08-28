import { useEffect, useState } from "react";

import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { createCategory } from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import { IType } from "../../services/Structure";

function RegisterCategory() {
  const [name, setName] = useState<string>("");
  const [option, setOption] = useState("0");
  const [categoryTypes, setCategoryTypes] = useState<IType[] | null>(null);

  const navigate = useNavigate();

  const saveCategory = () => {
    const erro = [];
    if (name.trim().length == 0) {
      erro.push("Preencha o nome!");
      //return
    }

    if (erro.length > 0) {
      console.log(erro);
    } else {
      createCategory(name, Number(option));
      navigate("/listCategory");
    }
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
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
      <h2>Tela de cadastro de categorias </h2>
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

        <InputLabel id="selectId">Tipo</InputLabel>
        <Select
          labelId="selectLabel"
          id="selectId"
          value={option}
          label="Tipo"
          onChange={handleChangeCategory}
        >
          <MenuItem value={0}>Selecione um tipo</MenuItem>
          {categoryTypes &&
            categoryTypes.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
        </Select>

        <Button onClick={saveCategory} variant="outlined">
          Salvar
        </Button>
      </FormControl>
    </div>
  );
}

export default RegisterCategory;
