import { Grid, Paper, Slider } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

function SearchTools({ setType, price, setPrice, hotelsFiltered }) {
  const { handleSubmit, control } = useForm();

  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  const onChangeFilter = (data) => {
    if (data.condition === "highestPrice") {
      setType({ key: "base_price_per_night", order: "desc" });
    }
    if (data.condition === "lowestPrice") {
      setType({ key: "base_price_per_night", order: "asc" });
    }
    if (data.condition === "highestStar") {
      setType({ key: "rating", order: "desc" });
    }
    if (data.condition === "lowestStar") {
      setType({ key: "rating", order: "asc" });
    }
  };

  const max = hotelsFiltered.reduce(
    (p, c) =>
      parseFloat(p.base_price_per_night) > parseFloat(c.base_price_per_night)
        ? parseFloat(p.base_price_per_night)
        : parseFloat(c.base_price_per_night),
    0
  );

  let min = Number.POSITIVE_INFINITY;
  for (let i = hotelsFiltered.length - 1; i >= 0; i--) {
    if (parseFloat(hotelsFiltered[i].base_price_per_night) < min)
      min = parseFloat(hotelsFiltered[i].base_price_per_night);
  }
  return (
    <form onChange={handleSubmit(onChangeFilter)}>
      <Paper square style={{ padding: "2% 2% 2% 2%" }}>
        <h4>Sort Results</h4>
        <h5>Sort your results by:</h5>
        <hr style={{ border: "1px solid #EEEBE5" }} />
        <Controller
          render={({ field }) => (
            <RadioGroup aria-label="gender" {...field}>
              <Grid container>
                <Grid item xs={12} sm={6} lg={6}>
                  <FormControlLabel
                    value="highestPrice"
                    control={<Radio icon={<LocalAtmIcon />} />}
                    label="Highest Price"
                  />
                  <FormControlLabel
                    value="lowestPrice"
                    control={<Radio icon={<LocalAtmIcon />} />}
                    label="Lowest Price"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                  <FormControlLabel
                    value="highestStar"
                    control={<Radio icon={<LocalActivityIcon />} />}
                    label="Most Star"
                  />
                  <FormControlLabel
                    value="lowestStar"
                    control={<Radio icon={<LocalActivityIcon />} />}
                    label="Least Star"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          )}
          name="condition"
          control={control}
        />
      </Paper>
      <Paper square style={{ padding: "2% 4% 2% 4%" }}>
        <h5>Base Price Per Night</h5>
        <Slider
          min={min}
          max={max}
          value={price}
          onChangeCommitted={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
      </Paper>
    </form>
  );
}

export default SearchTools;
