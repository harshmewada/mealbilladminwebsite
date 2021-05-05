import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Input,
  FormControlLabel,
  Typography,
  InputLabel,
  FormHelperText,
  OutlinedInput,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      // backgroundColor: "white",
    },
  },
}));
const MyTextField = ({ ...props }) => {
  const { label, name, placeholder, multiline, rows, onChange } = props;

  return (
    <>
      <FormControl
        margin="dense"
        // size={props.size}
        // variant="outlined"
        fullWidth
      >
        {/* <InputLabel htmlFor={name}>{label}</InputLabel> */}
        <Input
          id={name}
          name={name}
          multiline={multiline}
          rowsMax={5}
          label={label}
          aria-describedby="my-helper-text"
          placeholder={placeholder}
          {...props}
        />
        {/* <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText> */}
      </FormControl>
      {/* <label>
        {label}
        <input name={props.name} {...field} />
      </label> */}
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};
export default MyTextField;

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   FormControl,
//   Input,
//   FormControlLabel,
//   Typography,
//   InputLabel,
//   FormHelperText,
//   OutlinedInput,
// } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     [theme.breakpoints.down("md")]: {
//       backgroundColor: "white",
//     },
//   },
// }));

// const Text = (props) => {
//   const classes = useStyles();
// const {
//   label,
//   name,
//   placeholder,
//   multiline,
//   rows,
//   onChange,
//   register,
// } = props.field;
//   const { value } = props;

//   return (
// <FormControl
//   //  margin="dense"
//   size={props.size}
//   variant="outlined"
//   fullWidth
// >
//   <InputLabel htmlFor={name}>{label}</InputLabel>
//   <OutlinedInput
//     id={name}
//     name={name}
//     multiline={multiline}
//     rowsMax={5}
//     label={label}
//     aria-describedby="my-helper-text"
//     placeholder={placeholder}
//     onChange={onChange}
//     value={value || ""}
//   />
//   {/* <FormHelperText id="my-helper-text">
//     We'll never share your email.
//   </FormHelperText> */}
// </FormControl>
//     // <FormControl variant="outlined" >
//     // <FormControlLabel>Text</FormControlLabel>
//     // <Input />
//     // </FormControl>
//   );
// };

// Text.defaultProps = {
//   size: "medium",
// };
// export default React.memo(Text);
