import { useState } from "react";

import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import {
  createCategory
} from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";

function RegisterCategory() {
  const [name, setName] = useState<string>("");
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
        createCategory(name);
        navigate("/listCategory")
    }
  };

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

        <Button onClick={saveCategory} variant="outlined">
          Salvar
        </Button>        
      </FormControl>
    </div>
  );
}

export default RegisterCategory;
