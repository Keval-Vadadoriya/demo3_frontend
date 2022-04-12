import React from "react";
import {
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/styles";
const ProjectFilter = (props) => {
  const theme = useTheme();
  return (
    <Grid
      container
      spacing={2}
      component="form"
      marginTop="1px"
      onSubmit={props.filterProjectsBy}
    >
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="profession">Profession</InputLabel>
          <Select
            labelId="profession"
            id="profession"
            value={props.profession}
            label="Profession"
            onChange={props.changeProfessionHandler}
          >
            <MenuItem value={"none"} disabled hidden>
              {"Select Profession"}
            </MenuItem>
            <MenuItem value={"carpenter"}>{"Carpenter"}</MenuItem>
            <MenuItem value={"plumber"}>{"Plumber"}</MenuItem>
            <MenuItem value={"electrician"}>{"Electrician"}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="location">Location</InputLabel>
          <Select
            labelId="location"
            id="location"
            value={props.location}
            label="Location"
            onChange={props.changeLocationHandler}
          >
            <MenuItem value={"none"} disabled hidden>
              {"Select Location"}
            </MenuItem>
            <MenuItem value={"surat"}>{"Surat"}</MenuItem>
            <MenuItem value={"anand"}>{"Anand"}</MenuItem>
            <MenuItem value={"vadodara"}>{"Vadodara"}</MenuItem>
            <MenuItem value={"ahmedabad"}>{"Ahmedabad"}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.third.light,
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.third.light,
            },
          }}
        >
          Apply
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.third.light,
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.third.light,
            },
          }}
          onClick={props.clearFilter}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProjectFilter;
