import { useState, useEffect } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import DeleteIcon from '@mui/icons-material/Delete';

import { ICategory, IExercise } from "../../services/Structure";
import { loadData } from "../../services/services";

import {
  getAllExercises,
  removeExercise,
  updateExercise,
} from "../../services/ExerciseService";
import { Button } from "@mui/material";

function ListExercise() {
  const [option, setOption] = useState("0");
  const [exercises, setExercises] = useState<IExercise[] | undefined>([]);
  const [category, setCategories] = useState<ICategory[] | undefined>([]);
  const [exercisesFiltered, setExercisesFiltered] = useState<
    IExercise[] | undefined
  >([]);

  useEffect(() => {
    loadData("categories")
      .then((data) => setCategories(data))
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));

    getAllExercises()
      .then((data) => setExercises(data))
      .catch((err) => console.log("Erro ao carregar os exercícios: " + err));
  }, []);

  const filtra = (category: number) => {
    const filtered = exercises?.filter((exercise) =>
      exercise.category.includes(category)
    );
    setExercisesFiltered(filtered);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);

    filtra(Number(event.target.value));
  };

  const deleteExercise = (idExercise: number) => {
    removeExercise(idExercise);
  };

  return (
    <div>
      <h2> Tela de listagem de exercícios por categoria </h2>
      <FormControl fullWidth>
        <InputLabel id="selectId">Categoria</InputLabel>
        <Select
          labelId="selectLabel"
          id="selectId"
          value={option}
          label="Categoria"
          onChange={handleChangeCategory}
        >
          <MenuItem value={0}>Selecione uma categoria</MenuItem>
          {category &&
            category.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name} - {option.id}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <hr />
      {/* {exercises &&
        exercises.map((option) => <li key={option.id}>{option.name}</li>)}
      <hr /> */}
      {option == "0" ? (
        <h2>Selecione uma categoria de treino!</h2>
      ) : exercisesFiltered && exercisesFiltered?.length > 0 ? (
        exercisesFiltered.map((option) => (
          <li key={option.id}>
            {option.name}{" "} -----
            <DeleteIcon onClick={() => deleteExercise(option.id)}/>
          </li>
        ))
      ) : (
        <h2>Não há exercícios desta categoria cadastrados no momento!</h2>
      )}
    </div>
  );
}

export default ListExercise;