import { Button, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllCategories } from "../services/CategoryService";
import { getAllExercises } from "../services/ExerciseService";
import { ICategory, IExercise } from "../services/Structure";
import { SelectCategories } from "./myComponents/SelectCategories";

function WorkoutGenerator() {
  const [options, setOptions] = useState<string[]>([]);
  const [exercises, setExercises] = useState<IExercise[] | undefined>([]);
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<number>();

  const searchExercises = () => {

  }

  function loadExercises() {
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

  console.log(quantity)
  return (
    <div>
      <h1> Workout generator </h1>
      <Button onClick={searchExercises} variant="outlined">
          Gerar
        </Button>

      {/* <FormControl fullWidth>
        <TextField
          label="Número de exercícios"
          id="quantity"
          value={quantity}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setQuantity(Number(event.target.value))
          }
          helperText="Enter exercise name"
        />

        {categories && (
          <SelectCategories
            categories={categories}
            options={options}
            setOptions={setOptions}
          />
        )}

        <Button onClick={searchExercises} variant="outlined">
          Gerar
        </Button>
      </FormControl> */}
    </div>
  );
}

export default WorkoutGenerator;
