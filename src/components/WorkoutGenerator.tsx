import {
  Autocomplete,
  Button,
  FormControl,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";
import { getAllCategories } from "../services/CategoryService";
import { getAllExercises } from "../services/ExerciseService";
import { ICategory, IExercise, IType } from "../services/Structure";
import { SelectCategories } from "./myComponents/SelectCategories";

function WorkoutGenerator() {
  //const [options, setOptions] = useState<string[]>([]);
  const [exercises, setExercises] = useState<IExercise[] | undefined>([]);
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<number>();
  const [train, setTrain] = useState<IExercise[]>([]);
  let listExercises: IExercise[] = [];

  const [categoryTypes, setCategoryTypes] = useState<IType[] | undefined>(
    undefined
  );
  const [option, setOption] = useState("0");

  const searchExercises = () => {
    const typeOfTrain = categories
      ?.filter((category) => category.type === Number(option))
      .map((category) => category.id);
    exercises?.map((exercise) => {
      console.log(exercise);
      const x = typeOfTrain?.some((el) => {
        if (exercise.category.includes(el)) {
          console.log("El: ", el);
          return el;
        }
      });
      if (x) {
        console.log("Entrou no if");
        listExercises.push(exercise)
        console.log("listExercises: ", listExercises);
      }

      /* exercise.category.map((c) => {
        console.log(c)
        if(typeOfTrain?.includes(c)){
          return exercise
        }

      }) */

      console.log("x: ", x);
    });
    setTrain(listExercises);
    //console.log("typeOfTrain: ", typeOfTrain);
    //console.log("Train: ", train);
  };

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value as string);
  };

  /* function loadExercises() {
    getAllExercises()
      .then((data) => {
        setExercises(data);
      })
      .catch((err) => console.log("Erro ao carregar os exercícios: " + err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));

    loadExercises();
  }, []);
 */
  useEffect(() => {
    api
      .get("/types")
      .then((data) => {
        setCategoryTypes(data.data);
      })
      .catch((err) => console.log("Erro ao recuperar os tipos: " + err));

    getAllCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));

    getAllExercises()
      .then((data) => {
        setExercises(data);
      })
      .catch((err) => console.log("Erro ao carregar os exercícios: " + err));
  }, []);

  //console.log(quantity);
  //console.log(option)

  return (
    <div>
      <h1> Workout generator </h1>
      <FormControl fullWidth>
          <TextField
            id="category"
            select
            label="Tipo de treino"
            helperText="Select a type"
            onChange={handleChangeCategory}
            value={option}
          >
            {categoryTypes &&
              categoryTypes.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
          </TextField>

          <Button onClick={searchExercises} variant="outlined">
            Gerar
          </Button>
        </FormControl>
      {/* {train.length == 0 ? (
        <FormControl fullWidth>
          <TextField
            id="category"
            select
            label="Tipo de treino"
            helperText="Select a type"
            onChange={handleChangeCategory}
            value={option}
          >
            {categoryTypes &&
              categoryTypes.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
          </TextField>

          <Button onClick={searchExercises} variant="outlined">
            Gerar
          </Button>
        </FormControl>
      ) : (
        <ul style={{ listStyle: "none" }}>
          {train.map((ef) => (
            <li key={ef.id}>
              <h4>{ef.name}</h4>
            </li>
          ))}
        </ul>
      )} */}

      {train && <ul style={{ listStyle: "none" }}>
          {train.map((ef) => (
            <li key={ef.id}>
              <h4>{ef.name}</h4>
            </li>
          ))}
        </ul>}
    </div>
  );
}

export default WorkoutGenerator;
