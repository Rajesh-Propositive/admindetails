import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  NativeSelect,
  Select
} from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 350
  },
  links: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      background: "#1687a7"
    }
  },
  option: {
    "&:hover": {
      background: "#1687a7"
    }
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
function SelectOption() {
  const classes = useStyles();
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">
          {" "}
          Select Model / ስልኮን ይምረጡ
        </InputLabel>
        <Select>
          {models.map((model) => (
            <Link
              key={model.brand}
              className={classes.links}
              to={`/brand/${model.brand}`}
            >
              <option className={classes.option}>{model.displayName}</option>
            </Link>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectOption;
