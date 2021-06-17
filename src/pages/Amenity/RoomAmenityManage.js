import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { postRoomAmenity } from "../../redux/actions/roomAmenity";
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
function RoomAmenityManage({ roomId, roomName, postRoomAmenity }) {
  const classes = useStyles();
  const [rAL, setRAL] = useState([]);
  const [amenityId, setAmenityId] = useState();

  useEffect(() => {
    axios
      .get(`${baseURL}/api/hotels/roomamenities/`)
      .then((res) => setRAL(res.data))
      .catch((err) => console.log(`Get room amenities failed ! | ${err}`));
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    postRoomAmenity({ room_id: roomId, room_amenity_id: amenityId });
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
              value={roomName}
              disabled
              label="Room"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              variant="outlined"
              options={rAL}
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

export default connect(null, { postRoomAmenity })(RoomAmenityManage);
