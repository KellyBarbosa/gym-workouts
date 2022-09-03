import { LabelImportantTwoTone } from "@mui/icons-material";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const homeList = [
  "List exercises",
  "Edit exercises",
  "Register exercises",
  "List categories",
  "Edit categories",
  "Register categories",
];

import "./homeStyle.css";

function Home() {
  return (
    <div>
      {/* <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item md={12}>
            <Typography
              sx={{ mt: 4, mb: 2 }}
              variant="h2"
              component="div"
              color="darkmagenta"
            >
              Welcome to workouts generator
            </Typography>

            <Grid container justifyContent="center">
              <List dense={true}>
                <ListItem>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h4"
                    component="div"
                    color="darkslateblue"
                  >
                    Here you can:
                  </Typography>
                </ListItem>
                {homeList.map((item) => (
                  <ListItem key={item}>
                    <ListItemAvatar>
                      <LabelImportantTwoTone fontSize="small" color="primary" />
                    </ListItemAvatar>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Box> */}

      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item md={12} >
            <Grid container justifyContent="center" alignItems="center">
              <ul>
                {homeList.map((item) => (
                  <li key={item}>
                    {/* <LabelImportantTwoTone
                fontSize="medium"
                color="primary"
                style={{ paddingRight: 16 }}
              /> */}
                    {item}
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
