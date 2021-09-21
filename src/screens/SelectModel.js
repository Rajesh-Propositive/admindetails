import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  NativeSelect,
  Select
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SelectOption from "./SelectOption";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    margin: theme.spacing(1),
    minWidth: 120
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
function SelectModel() {
  const classes = useStyles();
  const [model, setModel] = useState();
  const [brand, setBrand] = useState();
  const history = useHistory();
  const handleChange = (event) => {
    setBrand(event.target.value);
    history.push(`/brand/${model.brand}`);
  };
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">
          {" "}
          Select Model / ስልኮን ይምረጡ
        </InputLabel>
        <Select
          native
          labelId="demo-simple-select-outlined-label"
          // id="demo-simple-select-outlined"
          value={brand}
          onChange={handleChange}
          name="model"
          inputProps={{ "aria-label": "Without label" }}
        >
          {models.map((model) => (
            <option key={model.brand}>{model.displayName}</option>
          ))}
        </Select>
      </FormControl>
      <SelectOption />
    </div>
  );
}

export default SelectModel;
