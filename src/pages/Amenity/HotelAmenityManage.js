import { Grid, Paper, TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postHotelAmenity } from "../../redux/actions/hotelAmenity";
import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_API;

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

function HotelAmenityManage({ postHotelAmenity, hotelId, hotelName }) {
  const classes = useStyles();
  const [hAL, setHAL] = useState([]);
  const [amenityId, setAmenityId] = useState();

  useEffect(() => {
    axios
      .get(`${baseURL}/api/hotels/amenities/`)
      .then((res) => setHAL(res.data))
      .catch((err) => console.log(`Get hotel amenities failed ! | ${err}`));
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    postHotelAmenity({ hotel_id: hotelId, hotel_amenity_id: amenityId });
  };
  return (
    <Paper className={classes.pageContent}>
      <form onSubmit={onSubmit}>
        <Grid container xs={12} spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={hotelName}
              disabled
              label="Hotel"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              variant="outlined"
              options={hAL}
              getOptionLabel={(option) => `${option.name} | ${option.category}`}
              onChange={(e, option) => setAmenityId(option.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  name="category"
                  label="Category"
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <button
            className="custom-button"
            type="submit"
            style={{ marginTop: "1%" }}
          >
            Submit
          </button>
        </Grid>
      </form>
    </Paper>
  );
}

export default connect(null, { postHotelAmenity })(HotelAmenityManage);
