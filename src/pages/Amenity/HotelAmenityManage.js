import { Grid, Paper, TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";

const hotelAmenityCategories = [
  { category: "Hotel Services" },
  { category: "Food and Drinks" },
  { category: "Things to Do" },
  { category: "Public Facilities" },
  { category: "In-room Facilities" },
  { category: "General" },
  { category: "Sports and Recreations" },
  { category: "Transportation" },
  { category: "Nearby Facilities" },
  { category: "Business Facilities" },
  { category: "Family-friendly Facilities" },
  { category: "Connectivity" },
  { category: "Shuttle Services" },
  { category: "Others" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      padding: theme.spacing(1),
      width: 160,
    },
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));
function HotelAmenityManage({ hotel, mode }) {
  const classes = useStyles();
  return (
    <Paper className={classes.pageContent}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            id="outlined-margin-normal"
            name="name"
            InputLabelProps={{
              shrink: true,
            }}
            label="Name"
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            variant="outlined"
            id="combo-box-demo"
            options={hotelAmenityCategories}
            getOptionLabel={(option) => option.category}
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{
                  shrink: true,
                }}
                name="category"
                label="Category"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default HotelAmenityManage;
