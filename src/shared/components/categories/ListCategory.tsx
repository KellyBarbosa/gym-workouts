import { useState, useEffect } from "react";

import DeleteTwoTone from "@mui/icons-material/DeleteTwoTone";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import LabelImportantTwoTone from "@mui/icons-material/LabelImportantTwoTone";

import { ICategory } from "../../services/Structure";

import { useNavigate } from "react-router-dom";

import {
  getAllCategories,
  removeCategory,
} from "../../services/CategoryService";
import { Box } from "@mui/system";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

function ListCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ICategory[] | undefined>([]);

  function loadCategories() {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.log("Erro ao carregar as categorias: " + err));
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const deleteCategory = (idCategory: number) => {
    removeCategory(idCategory);
    loadCategories();
  };

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <div>
      {/* <h2> Tela de listagem de categorias </h2> */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container justifyContent="center">
            <Grid item md={3}  >
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div"  color="darkmagenta">
                Categorias cadastradas
              </Typography>
             {/*  <Demo> */}
                <List dense={true}>
                  {categories &&
                    categories.map((category) => (
                      <ListItem
                        key={category.id}
                        secondaryAction={
                          <>
                            <IconButton edge="end" aria-label="delete">
                              <DeleteTwoTone
                                fontSize="small"
                                color="primary"
                                onClick={() => deleteCategory(category.id)}
                              />
                            </IconButton>

                            <IconButton edge="end" aria-label="edit">
                              <EditTwoTone
                                fontSize="small"
                                color="primary"
                                onClick={() =>
                                  navigate("/editCategory", { state: category })
                                }
                              />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemAvatar>
                          <LabelImportantTwoTone
                            fontSize="small"
                            color="primary"
                          />
                        </ListItemAvatar>
                        <ListItemText primary={category.name} />
                      </ListItem>
                    ))}
                </List>
              {/* </Demo> */}
            </Grid>
          </Grid>
        </Box>
    </div>
  );
}

export default ListCategory;
