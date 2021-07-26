import React from "react";
import InputContainer from "./InputContainer";
import ImagePreviewModal from "../Modals/ImagePreviewModal";

import Form from "react-bootstrap/Form";
import { RootUrl } from "../../../redux/types";
import { setNestedObjectValues } from "formik";

const MyTextField = React.forwardRef((props, ref) => {
  const {
    label,
    onChange,
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
  const [previewModal, setPreviewModal] = React.useState();

  React.useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    // create the preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    !ref && onChange && onChange(file);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const value = mode === "Edit" ? "" : props.value;
  const picturePreview = preview || typeof value === "string";
  const defaultValue = props.defaultValue;

  const handleOpenPreview = () => {
    if (selectedFile) {
      setPreviewModal(preview);
    }
    if (defaultValue) {
      setPreviewModal(`${RootUrl}/${defaultValue}`);
    }
  };

  return (
    <div class={`form-group col-md-${size || "6"}`}>
      <ImagePreviewModal
        open={previewModal}
        onClose={() => setPreviewModal()}
        data={previewModal}
        title="Preview"
      />

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
        // {...{
        //   ...(mode !== "Edit" && { value: value }),
        // }}
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
              height: 35,
            }}
          />
        )}
        {!preview && defaultValue && (
          <img
            src={`${RootUrl}/${defaultValue}`}
            style={{
              height: 35,
            }}
          />
        )}
        {(selectedFile || defaultValue) && (
          <button
            type="button"
            class="btn btn-gradient-primary btn-clipboard"
            style={{
              marginRight: file ? 0 : -12,
              cursor: "pointer",
              display: "block",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onClick={() => handleOpenPreview()}
          >
            <i
              class="mdi mdi-eye mr-2
"
            ></i>
            Preview
          </button>
        )}
      </div>
    </div>
  );
});
export default MyTextField;
