import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { ICategory, IExercise } from "../../services/Structure";

import {
  getAllExercises,
  createExercise,
} from "../../services/ExerciseService";
import {
  getAllCategories,
  getCategoryById,
} from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function RegisterExercise() {
  const [option, setOption] = useState<string[]>([]);
  const [exercises, setExercises] = useState<IExercise[] | undefined>([]);
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);
 const [labelName, setLabelName] = useState<string[]>([]);
    const [name, setName] = useState<string>("");
   const [series, setSeries] = useState<string>("");
  const [repeat, setRepeat] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const navigate = useNavigate();

  /*  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  }; */
  

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(typeof value === "string" ? value.split(",") : value);
    //console.log(value.at(-1));
    /* getCategoryById(Number(value.at(-1)))
      .then((data) => {
        let newLabelName = [...labelName, data.name].toString().split(',')
        console.log(newLabelName)
        setLabelName(newLabelName)
      })
      .catch((err) => console.log("Erro ao carregar as categorias: " + err)); */
  };

  const handleChange = (event: SelectChangeEvent<typeof option>) => {
    const {
      target: { value },
    } = event;
    setOption(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const saveExercise = () => {
    const erro = [];
    if (name.trim().length == 0) {
      erro.push("Preencha o nome!");
      //return
    }
    if (series.trim().length == 0) {
      erro.push("Preencha a quantidade de séries!");
      //return
    }
    if (repeat.trim().length == 0) {
      erro.push("Preencha a quantidade de repetições!");
      //return
    }
    if (weight.trim().length == 0) {
      erro.push("Preencha carga do exercício!");
      //return
    }
    if (option.length == 0) {
      erro.push("Preencha categoria do exercício!");
    }
    if (erro.length > 0) {
      console.log(erro);
    } else {
      let categoryOptions: number[] = [];
      option.map((op) => {
        categoryOptions.push(Number(op));
      });

      createExercise(name, series, repeat, weight, categoryOptions);
      navigate("/listExercise");
    }
  };

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));

    getAllExercises()
      .then((data) => setExercises(data))
      .catch((err) => console.log("Erro ao carregar os exercícios: " + err));
  }, []);
  
  return (
    <div>
      {" "}
      <h2>Tela de Cadastro de Exercícios </h2>
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

        <TextField
          label="Séries"
          id="series"
          value={series}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSeries(event?.target.value)
          }
          helperText="Enter the number of sets for this exercise"
        />

        <TextField
          label="Repetições"
          id="repeat"
          value={repeat}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRepeat(event?.target.value)
          }
          helperText="Enter the number of repetitions for this exercise"
        />

        <TextField
          label="Carga"
          id="weight"
          value={weight}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setWeight(event?.target.value)
          }
          helperText="Enter the weight for this exercise"
        />

        <TextField
          id="category"
          select
          label="Categoria"
          helperText="Select a category"
          SelectProps={{
            multiple: true,
            value: option, 
            onChange: handleChangeCategory,      
            renderValue: (selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (       
                  <Chip key={value} label={value} />
                ))}
              </Box>
            ),          }}
        >
          {categories &&
            categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
        </TextField> 

      {/*   <InputLabel id="labelCategory">Categoria</InputLabel>
        <Select
          labelId="labelCategory"
          id="category"
          multiple
          value={option}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Categoria" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          { categories && categories.map((category) => (
            <MenuItem
              key={category.id}
              value={category.name}
              
            >
              {category.name}
            </MenuItem>
          ))}
        </Select> */}

        <Button onClick={saveExercise} variant="outlined">
          Salvar
        </Button>
      </FormControl>
    </div>
  );
}

export default RegisterExercise;
