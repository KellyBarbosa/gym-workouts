import { useEffect, useState } from "react";

import { Button, MenuItem, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { ICategory, IExercise } from "../../services/Structure";

import { removeExercise, updateExercise } from "../../services/ExerciseService";
import { getAllCategories } from "../../services/CategoryService";

import { useLocation, useNavigate } from "react-router-dom";

interface IDataLocation {
  exercise: IExercise;
  idCategory: string;
}

function EditExercise() {
  const location = useLocation();
  const state = location.state as IDataLocation;
  
  const navigate = useNavigate();

  const [option, setOption] = useState(state.idCategory);
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);

  const [name, setName] = useState<string>(state.exercise.name);
  const [series, setSeries] = useState<string>(state.exercise.series);
  const [repeat, setRepeat] = useState<string>(state.exercise.repeat);
  const [weight, setWeight] = useState<string>(state.exercise.weight);

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };

  const patchExercise = () => {
    updateExercise(
      state.exercise.id,
      name,
      series,
      repeat,
      weight,
      Number(option)
    );
    navigate("/listExercise");
  };

  const deleteExercise = () => {
    removeExercise(state.exercise.id);
    navigate("/listExercise");
  };

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));
  }, []);

  return (
    <div>
      {" "}
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
                {category.name}
              </MenuItem>
            ))}
        </TextField>

        <Button onClick={patchExercise} variant="outlined">
          Atualizar
        </Button>
        <Button onClick={deleteExercise} variant="outlined">
          Remover
        </Button>
      </FormControl>
    </div>
  );
}

export default EditExercise;
