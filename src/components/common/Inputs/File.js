// import React from "react";
// import InputContainer from "./InputContainer";

// const MyTextField = React.forwardRef((props, ref) => {
//   const { label, name, placeholder, multiline, rows, error, size } = props;
//   console.log("edi tprops", props);
//   // delete props.defaultValue;
//   return (
//     <InputContainer label={" "} error={error} size={size}>
//       <div class="mt-1" />
//       <input
//         ref={ref}
//         type="file"
//         class="form-control custom-file-input "
//         id="customFile"
//         name={name}
//         placeholder={placeholder}
//         {...props}
//         defaultValue={undefined}
//       />
//       <label class="custom-file-label" for="customFile">
//         Choose file
//       </label>
//     </InputContainer>
//   );
// });
// export default MyTextField;

import React from "react";
import InputContainer from "./InputContainer";

import Form from "react-bootstrap/Form";
import { RootUrl } from "../../../redux/types";

const MyTextField = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    placeholder,
    multiline,
    rows,
    error,
    size,
    mode,
  } = props;
  const [file, selectedFile] = React.useState();
  const [preview, setPreview] = React.useState();

  React.useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    // create the preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const value = mode === "Edit" ? "" : props.value;
  const picturePreview = preview || typeof value === "string";
  const defaultValue = props.defaultValue;
  return (
    <div class={`form-group col-md-${size || "6"}`}>
      <label for="customFile">Choose file</label>
      <Form.File
        name={name}
        ref={ref}
        id="customFile"
        style={{
          opacity: 0,

          position: "absolute",
        }}
        onChange={(e) => {
          if (e.target.files.length > 0) {
            selectedFile(e.target.files[0]);
          }
        }}
        {...{
          ...(mode !== "Edit" && { value: value }),
        }}
        // value={file}
      />

      <div
        class="form-control d-flex flex-direction-row align-items-center"
        style={{
          ...(file && {
            minHeight: "calc(1.8em + 0.75rem + 2px)",
            height: "auto",
            padding: 0,
          }),
        }}
      >
        <button
          type="button"
          class="btn btn-outline-primary shadow-none"
          style={{
            marginLeft: file ? 0 : -12,
            cursor: "pointer",
            display: "block",
          }}
        >
          Choose File
        </button>
        <span
          class="text-muted ml-3"
          style={{
            fontSize: "0.845rem",
            fontWeight: "400",
            lineHeight: "1.8",
            flex: 1,
            textOverflow: "ellipsis",
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {file ? file.name : " File Name"}
        </span>
        {selectedFile && (
          <img
            src={preview}
            style={{
              height: 40,
            }}
          />
        )}
        {!preview && defaultValue && (
          <img
            src={`${RootUrl}/${defaultValue}`}
            style={{
              height: 40,
            }}
          />
        )}
      </div>
    </div>
  );
});
export default MyTextField;
