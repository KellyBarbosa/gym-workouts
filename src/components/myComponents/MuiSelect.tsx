import { TextField, MenuItem, Box, Chip } from "@mui/material";
import { useMemo, useState } from "react";
import { ICategory } from "../../services/Structure";

interface Props {
  categories: ICategory[];
  options: string[];
  setOptions: (options: string[]) => void;
  //returnOptions: boolean;
}

export const MuiSelect = ({ categories, options, setOptions }: Props) => {
  //const [options, setOptions] = useState<string[]>([]);

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOptions(typeof value === "string" ? value.split(",") : value);
  };

 

  return (
    <TextField
      id="category"
      select
      label="Categoria"
      helperText="Select a category"
      SelectProps={{
        multiple: true,
        value: options,
        onChange: handleChangeCategory,
        renderValue: (selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        ),
      }}
    >
      {categories &&
        categories.map((category) => (
          <MenuItem key={category.id} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
    </TextField>
  );
};
