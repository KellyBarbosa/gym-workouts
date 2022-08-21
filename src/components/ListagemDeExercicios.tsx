import { typeExercise, dados } from "./../Estrutura";
import { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const keyOptions = Object.keys(typeExercise);
const valueOptions = Object.values(typeExercise);

// console.log(keyOptions);
//console.log(valueOptions);

function ListagemDeExercicios() {
  const [option, setOption] = useState("");

  const [exercises, setExercises] = useState(dados);

  /* useEffect(() => {
    console.log(option);
    const exercisesFiltered = exercises.filter((dados) => {
      dados.type.includes(valueOptions[Number(option)]);
      console.log(valueOptions[Number(option)]);
    });
    console.log(exercisesFiltered);
    setExercises(exercisesFiltered);
  }, [option]); */

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);

    exibe();
  };

  const exibe = () => {
    const exercisesFiltered = dados.filter((d) => {
      //d.type.findIndex(valueOptions[Number(option)])

      //console.log(d.type)
      return d.type.map((t) => t.includes(valueOptions[Number(option)]))
      /* console.log(d.type.map((t) => t.includes(valueOptions[Number(option)])));
      console.log(valueOptions[Number(option)]); */
    });
    console.log(exercisesFiltered);
    setExercises(exercisesFiltered);
  };

  return (
    <div>
      Tela de listagem de exercícios
      <FormControl fullWidth>
        <InputLabel id="input-select-treino">Tipo de Exercício</InputLabel>
        <Select
          labelId="selectLabel"
          id="selectId"
          value={option}
          label="Tipo de Exercício"
          onChange={handleChange}
        >
          {valueOptions.map((option) => (
            <MenuItem
              key={valueOptions.indexOf(option)}
              value={valueOptions.indexOf(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <hr />
      {exercises.map((ef) => (
        <li>{ef.name}</li>
      ))}
      <hr />
    </div>
  );
}

export default ListagemDeExercicios;
