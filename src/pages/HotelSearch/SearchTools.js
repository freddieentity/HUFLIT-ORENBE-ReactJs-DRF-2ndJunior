import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import { GrMoney } from "react-icons/gr";

function SearchTools({ setType }) {
  const { handleSubmit, control } = useForm();

  const onChangeFilter = (data) => {
    console.log(data.type);
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
                    control={<Radio icon={<GrMoney />} />}
                    label="Highest Price"
                  />
                  <FormControlLabel
                    value="lowestPrice"
                    control={<Radio icon={<GrMoney />} />}
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
    </form>
  );
}

export default SearchTools;
