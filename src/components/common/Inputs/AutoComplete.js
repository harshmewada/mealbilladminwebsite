import React from "react";

import ExpandIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import {
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Popover,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  useTheme,
} from "@material-ui/core";

import * as PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      // backgroundColor: "white",
    },
  },
  inputRoot: {
    backgroundColor: "white",
  },
}));

const AutoListing = (props) => {
  const classes = useStyles();
  const {
    label,
    name,
    placeholder,
    multiline,
    multiple,
    rows,
    onChange,

    register,
  } = props;
  const theme = useTheme();
  const [options, setOptions] = React.useState(props.options);

  const [value, setValue] = React.useState();

  const anchorRef = React.useRef(null);

  const [open, setOpen] = React.useState(false);

  //open
  const handleOpen = (event) => {
    anchorRef.current.focus();
    setOpen(true);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;

    handleOpen();
    if (value === "") {
      setOptions(props.options);
    } else {
      let filterOptions = props.options.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );
      let exactItem = props.options.find((item) => item.label === value);
      if (exactItem) {
        let target = {
          ...e.target,
          name: props.name,
          value: exactItem.value,
        };

        let newEvent = { ...e, target: target };

        props.onChange(newEvent);
      }
      setOptions(filterOptions);
    }
    setValue(value);
  };
  const handleClear = () => {
    setValue("");
    setOptions(props.options);
    anchorRef.current.focus();
    // props.onChange(undefined);
  };
  const handleSelect = (e, option) => {
    // anchorRef.current.focus();
    setValue(option.label);
    setOpen(false);

    // console.log("handle select", e);

    let valueTopass =
      typeof props.value === "number" ? parseInt(option.value) : option.value;

    let target = {
      ...e.target,
      name: props.name,
      value: valueTopass,
    };

    let newEvent = { ...e, target: target };

    props.onChange(newEvent);

    // props.onChange(option);
  };
  React.useEffect(() => {
    let myvalue;
    let propsvalue = props.value;
    if (propsvalue) {
      myvalue = props?.options.find((item) => {
        return item.value === propsvalue.toString();
      });

      myvalue && setValue(myvalue.text);
    }
  }, [props.value]);

  return (
    <div>
      <FormControl variant="outlined" fullWidth size={props?.size}>
        {/* {!value && (
          <InputLabel htmlFor="standard-adornment-password">
            {props?.label}
          </InputLabel>
        )} */}
        <OutlinedInput
          name={name}
          autoFocus={true}
          ref={anchorRef}
          placeholder={props?.placeholder}
          value={value}
          // label={!value ? props.label : undefined}
          onChange={(e) => handleChange(e)}
          classes={{
            root: classes.inputRoot,
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => handleClear()}>
                <CloseIcon />
              </IconButton>
              <IconButton size="small" onClick={() => handleOpen()}>
                <ExpandIcon />
              </IconButton>
            </InputAdornment>
          }
          {...props.inputProps}
        />
      </FormControl>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        // role={undefined}
        style={{
          width: anchorRef.current ? anchorRef.current.clientWidth : "100%",
          zIndex: theme.zIndex.modal + 10,
          boxShadow: theme.shadows[7],
          maxHeight: anchorRef.current
            ? anchorRef.current.clientHeight * 10
            : "100%",
          overflow: "auto",
          flexGrow: 1,
        }}
        transition
        keepMounted={false}

        // disablePortal
      >
        <Paper
          style={{
            width: "100%",
            height: "100%",
            // zIndex: theme.zIndex.modal + 10,
            // maxHeight: anchorRef.current.clientWidth * 1,
            // overflow: "auto",
            // flexGrow: 1,
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={false}
              autoFocus={false}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
            >
              {options.map((option, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={option.value}
                    onClick={(e) => handleSelect(e, option)}
                  >
                    {option.label}
                  </MenuItem>
                );
              })}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
};
AutoListing.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
  label: PropTypes.string.isRequired,
};

// enable if you need
AutoListing.defaultProps = {
  label: "",
  // options: [],
  // value: "",
  // onChange: (value) => console.log("default on change", value),
};
export default AutoListing;
