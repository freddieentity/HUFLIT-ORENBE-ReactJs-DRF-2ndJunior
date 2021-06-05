import { InputAdornment, Paper, TextField, Grid } from "@material-ui/core";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { add } from "date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import PlacesAutocomplete from "react-places-autocomplete";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
const tomorrowFns = add(new Date(), {
  days: 1,
});

function Search() {
  const [address, setAddress] = useState("");
  const [timeline, setTimeline] = useState({
    checkin: formatDate(Date.now()),
    checkout: formatDate(tomorrowFns),
  });

  const [addressData, setAddressData] = useState({
    full_address: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    country: "",
  });

  sessionStorage.setItem("checkin", formatDate(timeline.checkin));
  sessionStorage.setItem("checkout", formatDate(timeline.checkout));

  return (
    <Paper
      elevation={1}
      square
      style={{
        zIndex: 10,
        maxWidth: "1600px",
        color: "#fff",
        backgroundColor: "black",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "15px 15px 15px 15px",
        padding: "15px 15px 15px 15px",
      }}
    >
      <Paper
        square
        style={{
          margin: "15px 15px 15px 15px",
          padding: "15px 15px 15px 15px",
        }}
      >
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                disablePast
                autoOk={true}
                name="checkin"
                id="date-picker-dialog"
                label="Check-in"
                format="yyyy-MM-dd"
                value={timeline.checkin}
                fullWidth
                onChange={(e) => {
                  setTimeline({ ...timeline, checkin: e });
                  sessionStorage.setItem("checkin", e);
                }}
                initialFocusedDate={formatDate(Date.now())}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disablePast
                margin="normal"
                autoOk={true}
                name="checkout"
                variant="outlined"
                id="date-picker-dialog"
                label="Check-out"
                format="yyyy-MM-dd"
                fullWidth
                value={timeline.checkout}
                onChange={(e) => {
                  setTimeline({ ...timeline, checkout: e });
                  sessionStorage.setItem("checkout", e);
                }}
                initialFocusedDate={`${formatDate(tomorrowFns)}`}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={12}>
            <PlacesAutocomplete value={address} onChange={setAddress}>
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <TextField
                    id="outlined-start-adornment"
                    placeholder="City, hotel, place to go ?"
                    style={{
                      width: "100%",
                      position: "relative",
                    }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon />
                        </InputAdornment>
                      ),
                    }}
                    {...getInputProps({})}
                    variant="outlined"
                  />

                  <div className="autocomplete-dropdown-container">
                    {loading && (
                      <div className="input-suggestion">Searching...</div>
                    )}
                    {suggestions.map((suggestion) => {
                      const style = suggestion.active
                        ? {
                            backgroundColor: "#f5f5f5",
                            cursor: "pointer",
                          }
                        : {
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                          };
                      return (
                        <div
                          className="input-suggestion"
                          {...getSuggestionItemProps(suggestion, {
                            style,
                          })}
                        >
                          <span>
                            <IoLocationOutline />{" "}
                          </span>{" "}
                          <span
                            onClick={() => {
                              setAddressData({
                                full_address: suggestion.description,
                                street:
                                  suggestion.terms[suggestion.terms.length - 5]
                                    .value,
                                ward: suggestion.terms[
                                  suggestion.terms.length - 4
                                ].value,
                                district:
                                  suggestion.terms[suggestion.terms.length - 3]
                                    .value,
                                city: suggestion.terms[
                                  suggestion.terms.length - 2
                                ].value,
                                country:
                                  suggestion.terms[suggestion.terms.length - 1]
                                    .value,
                              });
                            }}
                          >
                            {suggestion.description}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </Grid>
          <Grid xs={12} sm={12} lg={12}>
            <Link
              to={`/search/?city=${addressData.city}&checkin=${formatDate(
                timeline.checkin
              )}&checkout=${formatDate(timeline.checkout)}`}
            >
              <button
                style={{ width: "100%" }}
                className="custom-button"
                type="submit"
              >
                Check
              </button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
}

export default Search;
