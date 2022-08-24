import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const [path, setPath] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newPath: string) => {
    setPath(newPath);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={path}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        centered
      >
        <Tab
          value="listExercise"
          label="Listagem de Exercícios"
          onClick={() => navigate("/listExercise")}
        />
        <Tab
          value="registerExercise"
          label="Cadastro de Exercícios"
          onClick={() => navigate("/registerExercise")}
        />
        <Tab
          value="listCategory"
          label="Listagem de Categorias"
          onClick={() => navigate("/listCategory")}
        />
        <Tab
          value="registerCategory"
          label="Cadastro de Categorias"
          onClick={() => navigate("/registerCategory")}
        />
      </Tabs>
      
    </Box>
  );
}
