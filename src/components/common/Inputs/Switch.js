import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControlLabel, withStyles } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(7),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const PurpleSwitch = withStyles((theme) => ({
  switchBase: {
    color: theme.palette.primary.light,
    "&$checked": {
      color: theme.palette.primary.main,
    },
    "&$checked + $track": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  checked: {},
  track: {},
}))(Switch);

const SwitchInput = (props) => {
  const classes = useStyles();

  const {
    label,
    name,
    placeholder,
    multiline,
    rows,
    onChange,
    register,
  } = props;

  return (
    <div className={classes.root}>
      <FormControlLabel
        id={name}
        control={
          <PurpleSwitch onChange={onChange} name={name} color="primary" />
        }
        label={label}
      />
    </div>
  );
};
export default SwitchInput;
