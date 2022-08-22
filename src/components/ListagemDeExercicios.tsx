import {ICategory, IExercise } from "./../Estrutura";
import { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import api from "../services/api";

function ListagemDeExercicios() {
  const [option, setOption] = useState("");

  const [exercises, setExercises] = useState<IExercise[] | undefined>([]);

  const [category, setCategories] = useState<ICategory[] | undefined>([]);

  const loadCategory = () => {
    return api
      .get("/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));
  };

  const loadExercise = () => {
    return api
      .get("/exercises")
      .then((res) => setExercises(res.data))
      .catch((err) => console.log("Erro ao carregar os exercícios: " + err));
  };

  const loadData = async (endpoint: string) => {
    const response = await api.get(`/${endpoint}`);
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    //loadCategory();

    //loadExercise();

    loadData("category")
      .then((data) => setCategories(data))
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));

    loadData("exercises")
      .then((data) => setExercises(data))
      .catch((err) => console.log("Erro ao carregar os exercícios: " + err));
  }, []);

  /* console.log(category);
  console.log(exercises); */

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);

    //exibe();
  };

  return (
    <div>
      Tela de listagem de exercícios por categoria
      <FormControl fullWidth>
        <InputLabel id="input-select-treino">Categoria</InputLabel>
        <Select
          labelId="selectLabel"
          id="selectId"
          value={option}
          label="Categoria"
          onChange={handleChange}
        >
          {category &&
            category.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <hr />
      {/* {category && category.map((option) => (
            <li
              key={option.id}
            >
              {option.name}
            </li>
          ))} */}
      {exercises &&
        exercises.map((option) => <li key={option.id}>{option.name}</li>)}
      <hr />
    </div>
  );
}

export default ListagemDeExercicios;
