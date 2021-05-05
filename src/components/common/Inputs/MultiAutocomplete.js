import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { autocomplete } from ".";
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "red",
    width: "100%",
    [theme.breakpoints.down("md")]: {},
  },
}));

const AutoCompleteComponent = (props) => {
  const classes = useStyles();

  const [defaultValue, setDefaultValue] = React.useState();
  const {
    label,
    name,
    placeholder,
    multiline,
    multiple,
    rows,
    onChange,
    options,
    register,
    value,
  } = props;

  let currentnewvalue = typeof value === "number" ? value.toString() : value;

  function getValue() {
    return options.find((item) => item.value === currentnewvalue);
  }
  React.useEffect(() => {
    setDefaultValue(options.filter((item) => item.value === currentnewvalue));
  }, [value]);
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple={true}
        id={name}
        options={options}
        getOptionLabel={(option) => option.text}
        // inputValue={currentnewvalue}
        defaultValue={defaultValue}
        // filterSelectedOptions
        onChange={(e, values) => {
          setDefaultValue(values);
          let target = {
            ...e.target,
            name: name,
            value: values,
          };

          let newEvent = { ...e, target: target };
          onChange(newEvent);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            variant="outlined"
            label={label}
            placeholder={placeholder}
          />
        )}
      />
    </div>
  );
};
export default AutoCompleteComponent;
