import { useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { ICategory, IExercise } from "../../services/Structure";

import {
  getAllExercises,
  createExercise,
} from "../../services/ExerciseService";
import { getAllCategories } from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";
import { SelectCategories } from "../myComponents/SelectCategories";

function RegisterExercise() {
  const [options, setOptions] = useState<string[]>([]);
  const [exercises, setExercises] = useState<IExercise[] | undefined>([]);
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);
  const [name, setName] = useState<string>("");
  const [series, setSeries] = useState<string>("");
  const [repeat, setRepeat] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  let categoryOptions: number[] = [];
  const navigate = useNavigate();

  const filtra = () => {
    options.map((op) => {
      const filtered = categories?.filter((category) => {
        return category.name === op;
      });
      if(filtered && filtered[0]) {
        const { id } = filtered[0];
        categoryOptions.push(id);
      }  
    });
  };

  const saveExercise = () => {
    filtra();
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
    if (options.length == 0) {
      erro.push("Preencha categoria do exercício!");
    }
    if (erro.length > 0) {
      console.log(erro);
    } else {
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

        {categories && (
          <SelectCategories
            categories={categories}
            options={options}
            setOptions={setOptions}
          />
        )}

        <Button onClick={saveExercise} variant="outlined">
          Salvar
        </Button>
      </FormControl>
    </div>
  );
}

export default RegisterExercise;
