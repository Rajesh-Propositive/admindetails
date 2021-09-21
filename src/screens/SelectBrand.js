import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Typography
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    padding: "10px",
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 350
  }
}));
const models = [
  {
    brand: "Samsung",
    displayName: "Samsung / ሳምሰንግ"
  },
  {
    brand: "Iphone",
    displayName: "Apple / አፕል"
  },
  {
    brand: "Huawei",
    displayName: "Huawei / ሁዋዌ"
  },
  {
    brand: "Tecno",
    displayName: "Tecno / ቴክኖ"
  }
];
function SelectBrand() {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState("");

  function handleChange(value) {
    history.push(`/brand/${value}`);
  }

  return (
    <div style={{ textAlign: "left" }}>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel htmlFor="Select-brand">
          {" "}
          Select Model / ስልኮን ይምረጡ
        </InputLabel>
        <Select
          native
          value={name}
          onChange={(event) => handleChange(event.target.value)}
        >
          <option aria-label="None" value="" />
          <option value="Samsung" aria-label="Samsung / ሳምሰንግ">
            Samsung / ሳምሰንግ
          </option>
          <option value="Iphone" aria-label="Apple / አፕል">
            Apple / አፕል
          </option>
          <option value="Huawei" aria-label="Huawei / ሁዋዌ">
            Huawei / ሁዋዌ
          </option>
          <option value="Tecno" aria-label="Tecno / ቴክኖ">
            Tecno / ቴክኖ
          </option>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectBrand;
