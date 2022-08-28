import { useEffect, useMemo, useState } from "react";

import { Button, MenuItem, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { ICategory, IExercise } from "../../services/Structure";

import { removeExercise, updateExercise } from "../../services/ExerciseService";
import {
  getAllCategories,
} from "../../services/CategoryService";

import { useLocation, useNavigate } from "react-router-dom";
import { SelectCategories } from "../myComponents/SelectCategories";

interface IDataLocation {
  exercise: IExercise;
  idCategory: string;
}

function EditExercise() {
  const location = useLocation();
  const state = location.state as IDataLocation;
  const navigate = useNavigate();

  const [options, setOptions] = useState<string[]>([]);
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);

  const [name, setName] = useState<string>(state.exercise.name);
  const [series, setSeries] = useState<string>(state.exercise.series);
  const [repeat, setRepeat] = useState<string>(state.exercise.repeat);
  const [weight, setWeight] = useState<string>(state.exercise.weight);
  const [loading, setLoading] = useState(true);

  let categoryOptions: number[] = [];
  let nameCategoryOptions: string[] = [];

  const filtraNome = () => {
    state.exercise.category.map((op) => {
      const filtered = categories?.filter((category) => {
        return category.id === op;
      });
      if (filtered && filtered[0]) {
        const { name } = filtered[0];
        nameCategoryOptions.push(name);
      }
    });
    setOptions(nameCategoryOptions);
  };

  const filtra = () => {
    options.map((op) => {
      const filtered = categories?.filter((category) => {
        return category.name === op;
      });
      if (filtered && filtered[0]) {
        const { id } = filtered[0];
        categoryOptions.push(id);
      }
    });
  };

  const patchExercise = () => {
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
      updateExercise(
        state.exercise.id,
        name,
        series,
        repeat,
        weight,
        categoryOptions
      );
      navigate("/listExercise");
    }
  };

  const deleteExercise = () => {
    removeExercise(state.exercise.id);
    navigate("/listExercise");
  };

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));
  }, []);

  useMemo(() => {
    filtraNome();
    setLoading(false);
  }, [categories]);

  return (
    <div>
      {" "}
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <div>
          <h2>Tela de edição dos Exercícios </h2>
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

            <Button onClick={patchExercise} variant="outlined">
              Atualizar
            </Button>
            <Button onClick={deleteExercise} variant="outlined">
              Remover
            </Button>
          </FormControl>
        </div>
      )}
    </div>
  );
}

export default EditExercise;
