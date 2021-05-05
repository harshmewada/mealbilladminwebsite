/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

export default function Playground(props) {
  const defaultProps = {
    getOptionLabel: (option) => option.label,
  };
  const {
    label,
    name,
    placeholder,
    multiline,
    multiple,
    rows,
    onChange,
    dependentChild,
    options,
    changeOptions,
  } = props;

  const [value, setValue] = React.useState(null);
  React.useEffect(() => {
    if (props.value) {
      setValue(options.find((item) => item.value === props.value));
    } else {
      setValue(null);
    }
  }, [props.value]);

  const filterOptions = (options, value) => {
    if (value?.inputValue || value?.inputValue?.length > 3) {
      let myOptions = options?.filter((item) => {
        // console.log("filter options", item.keyword, value);
        return item?.keyword?.includes(value?.inputValue?.toLowerCase());
      });

      return myOptions;
    } else {
      return options;
    }
    return [];
  };
  const filter = createFilterOptions();
  return (
    <div>
      <Autocomplete
        {...defaultProps}
        options={props.options}
        id={`controlled-demo ${label}`}
        value={value}
        filterOptions={(options, params) => {
          const filtered = filterOptions(options, params);

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        onChange={(event, newValue) => {
          setValue(newValue);
          onChange(newValue?.value || undefined);
        }}
        onInputChange={(event, newInputValue) => {
          filterOptions(newInputValue);
        }}
        onClear
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            margin="normal"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {/* {loading ? <CircularProgress color="inherit" size={20} /> : null} */}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
