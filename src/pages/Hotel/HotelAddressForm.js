import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import { Button, Form } from "antd";
import PlacesAutocomplete from "react-places-autocomplete";
import { IoLocationOutline } from "react-icons/io5";
import { Paper, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { postHotelAddress } from "../../redux/actions/hotelAddress";

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

function HotelAddressForm({ hotel, postHotelAddress }) {
  const [address, setAddress] = useState("");
  const [addressData, setAddressData] = useState({
    full_address: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    country: "",
    hotel_id: null,
  });

  const onChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
    postHotelAddress(addressData);
  };
  const classes = useStyles();

  return (
    <Form onFinish={onSubmit} className={classes.root}>
      <PlacesAutocomplete value={address} onChange={setAddress}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              variant="outlined"
              id="outlined-basic"
              {...getInputProps({
                placeholder: "Search Places ...",
                helperText:
                  "Please only choose the address from the results to avoid mistyping!",
              })}
              style={{ width: "100%" }}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Searching...</div>}
              {suggestions.map((suggestion) => {
                const style = suggestion.active
                  ? { backgroundColor: "#f5f5f5", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
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
                            suggestion.terms[suggestion.terms.length - 5].value,
                          ward: suggestion.terms[suggestion.terms.length - 4]
                            .value,
                          district:
                            suggestion.terms[suggestion.terms.length - 3].value,
                          city: suggestion.terms[suggestion.terms.length - 2]
                            .value,
                          country:
                            suggestion.terms[suggestion.terms.length - 1].value,
                          hotel_id: hotel.id,
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
      <Paper className={classes.pageContent}>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              id="outlined-margin-normal"
              name="street"
              InputLabelProps={{
                shrink: true,
              }}
              label="Street"
              value={addressData.street}
              onChange={(e) => onChange(e)}
            />

            <TextField
              variant="outlined"
              id="outlined-margin-normal"
              name="ward"
              InputLabelProps={{
                shrink: true,
              }}
              label="Ward"
              value={addressData.ward}
              onChange={(e) => onChange(e)}
            />

            <TextField
              variant="outlined"
              id="outlined-margin-normal"
              name="district"
              InputLabelProps={{
                shrink: true,
              }}
              label="District"
              value={addressData.district}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              id="outlined-margin-normal"
              name="city"
              InputLabelProps={{
                shrink: true,
              }}
              label="City"
              value={addressData.city}
              onChange={(e) => onChange(e)}
            />

            <TextField
              variant="outlined"
              id="outlined-margin-normal"
              InputLabelProps={{
                shrink: true,
              }}
              name="country"
              label="Country"
              value={addressData.country}
              onChange={(e) => onChange(e)}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "10% 0% 10% 25%",
              }}
            >
              <Button htmlType="submit" type="default">
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Form>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { postHotelAddress })(HotelAddressForm);
