import { Button, FormControl, MenuItem, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import api from "../shared/services/api";
import { getAllCategories } from "../shared/services/CategoryService";
import { getAllExercises } from "../shared/services/ExerciseService";
import { ICategory, IExercise, IType } from "../shared/services/Structure";
import { downloadPdf } from "./TrainExport";

function WorkoutGenerator() {
  const [exercises, setExercises] = useState<IExercise[] | undefined>([]);
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);
  const [createTrain, setCreateTrain] = useState<boolean>(false);
  const [train, setTrain] = useState<IExercise[]>([]);
  const [categoryTypes, setCategoryTypes] = useState<IType[] | undefined>(
    undefined
  );
  const [option, setOption] = useState("0");

  let listExercises: IExercise[] = [];

  const searchExercises = () => {
    setCreateTrain(true);
    const typeOfTrain = categories
      ?.filter((category) => category.type === Number(option))
      .map((category) => category.id);
    exercises?.map((exercise) => {
      const aux = typeOfTrain?.some((el) => {
        if (exercise.category.includes(el)) {
          return el;
        }
      });
      if (aux) {
        listExercises.push(exercise);
      }
    });
    setTrain(listExercises);
  };

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value as string);
    setCreateTrain(false);
  };

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
          <MenuItem value={0}>Selecione uma categoria</MenuItem>
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

      {option == "0" ? (
        <h2>Selecione um tipo de treino!</h2>
      ) : createTrain ? (
        train && train.length > 0 ? (
          <>
            {downloadPdf(option, train)}
            {/* <Train exercises={train} /> */}
            {/*  <TrainExport exercises={train} typeOfTrain={option} /> */}
          </>
        ) : (
          <h2>Não há exercícios desta categoria cadastrados no momento!</h2>
        )
      ) : (
        <h2> Clique para gerar um treino! </h2>
      )}
    </div>
  );
}

export default WorkoutGenerator;
