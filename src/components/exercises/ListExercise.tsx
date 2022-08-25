import { useState, useEffect } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";

import { ICategory, IExercise } from "../../services/Structure";

import {
  getAllExercises,
  removeExercise,
} from "../../services/ExerciseService";

import { getAllCategories } from "../../services/CategoryService";

function ListExercise() {
  const [option, setOption] = useState("0");
  const [exercises, setExercises] = useState<IExercise[] | undefined>([]);
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);
  const [exercisesFiltered, setExercisesFiltered] = useState<
    IExercise[] | undefined
  >([]);
  const navigate = useNavigate();

  function loadExercises() {
    getAllExercises()
      .then((data) => setExercises(data))
      .catch((err) => console.log("Erro ao carregar os exercícios: " + err));
  }

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));

    loadExercises();
  }, []);

  const filtra = (idCategory: number) => {
    const filtered = exercises?.filter((exercise) =>
      exercise.category.includes(idCategory)
    );
    setExercisesFiltered(filtered);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);

    filtra(Number(event.target.value));
  };

  const deleteExercise = (idExercise: number) => {
    removeExercise(idExercise);
    loadExercises();
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
          {categories &&
            categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name} 
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <hr />
      {option == "0" ? (
        <h2>Selecione uma categoria de treino!</h2>
      ) : exercisesFiltered && exercisesFiltered?.length > 0 ? (
        <ul style={{listStyle: "none"}}>
        {exercisesFiltered.map((ef) => (
          <li key={ef.id}>
            <h4> 
            {ef.name} -----
            <DeleteIcon onClick={() => deleteExercise(ef.id)} /> -----{" "}
            <EditIcon
              onClick={() => navigate("/editExercise", { state: {exercise: ef, idCategory: option} })}
            /> 
            </h4>
          </li>
        ))}
        </ul> ) : (
        <h2>Não há exercícios desta categoria cadastrados no momento!</h2>
      )}
    </div>
  );
}

export default ListExercise;
