import { useEffect, useState } from "react";

import { Button, MenuItem, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { ICategory, IExercise } from "../../services/Structure";

import {
  getAllExercises,
  createExercise,
  removeExercise,
  updateExercise,
} from "../../services/ExerciseService";
import {
  getAllCategories,
} from "../../services/CategoryService";

function RegisterCategory() {
  const [option, setOption] = useState("");
  const [exercises, setExercises] = useState<IExercise[] | undefined>([]);
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);

  const [name, setName] = useState<string>("");
  const [series, setSeries] = useState<string>("");
  const [repeat, setRepeat] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };

  const patchExercise = () => {
    updateExercise(9, name, series, repeat, weight, Number(option));
  };

  const deleteExercise = () => {
    removeExercise(11);
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
    if (option == "") {
      erro.push("Preencha categoria do exercício!");
    }
    if (erro.length > 0) {
      console.log(erro);
    } else {
      createExercise( name, series, repeat, weight, [
        Number(option),
      ]);
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
          value={option}
          onChange={handleChangeCategory}
          helperText="Select a category"
        >
          {categories &&
            categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name} - {category.id}
              </MenuItem>
            ))}
        </TextField>

        <Button onClick={saveExercise} variant="outlined">
          Salvar
        </Button>
        <Button onClick={patchExercise} variant="outlined">
          Atualizar
        </Button>
        <Button onClick={deleteExercise} variant="outlined">
          Remover
        </Button>

        {/* <InputLabel id="category">Categoria</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={option}
          label="Categoria"
          onChange={handleChange}
        >
          <MenuItem value={0}>Selecione uma categoria</MenuItem>
          {category &&
            category.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name} - {option.id}
              </MenuItem>
            ))}
        </Select> */}
      </FormControl>
    </div>
  );
}

export default RegisterCategory;
