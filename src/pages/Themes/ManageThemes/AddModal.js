import { Modal, Button } from "react-bootstrap";
import React from "react";
import ModalContainer from "../../../components/common/ModalContainer";
import { HexColorPicker } from "react-colorful";
import { useForm } from "react-hook-form";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

const initialState = {
  primary: {
    open: true,
    value: "#ffffff",
  },
  secondary: {
    open: true,
    value: "#ffffff",
  },
};

const AddModal = ({ open, onClose, title, data, mode, onSubmit }) => {
  const { register, handleSubmit, watch, errors, setValue } = useForm();
  const [state, setState] = React.useState({
    primary: {
      open: true,
      value: data?.primaryColor || "#ffffff",
    },
    secondary: {
      open: true,
      value: data?.secondaryColor || "#ffffff",
      warning: false,
    },
  });

  const handleToggle = (toggle) => {
    setState({
      ...state,
      [toggle]: {
        ...state[toggle],
        open: !state[toggle].open,
      },
    });
  };

  const handleChange = (name, value) => {
    if (name === "secondary") {
      if (value.charAt(1) <= 4) {
        setState({
          ...state,
          [name]: {
            open: true,
            value: value,
            warning: false,
          },
        });
      } else {
        setState({
          ...state,
          [name]: {
            open: true,
            value: value,
            warning: true,
          },
        });
      }
    } else {
      setState({
        ...state,
        [name]: {
          open: true,
          value: value,
          warning: true,
        },
      });
    }
  };
  const ManageSubmit = (data) => {
    onSubmit({
      ...data,
      primaryColor: state.primary.value,
      secondaryColor: state.secondary.value,
    });
  };
  React.useEffect(() => {
    if (data?.primaryColor) {
      setState({
        primary: {
          open: true,
          value: data.primaryColor,
        },
        secondary: {
          open: true,
          value: data.secondaryColor,
        },
      });
    }
  }, [open]);
  return (
    <ModalContainer
      open={open}
      onClose={() => {
        onClose();
        setState(initialState);
      }}
      title="Add Theme"
    >
      <form class="form-parsley" onSubmit={handleSubmit(ManageSubmit)}>
        <div class="row">
          <div class="form-group col-md-6">
            <label>Theme Name</label>
            <input
              type="text"
              class="form-control"
              required
              name="themeName"
              placeholder="Type a name"
              ref={register}
              defaultValue={data?.themeName}
            />
          </div>
          <div class="form-group col-md-6">
            <label>Status</label>
            <select
              name="status"
              ref={register}
              defaultValue={data?.status}
              class="form-control"
              required
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label class="mb-3">Primary Color</label>
            <div
              id="b_color-default"
              class="input-group"
              title="Using input value"
            >
              <input
                type="text"
                class="form-control"
                required
                name="name"
                maxLength={7}
                placeholder="Type a name"
                value={state.primary.value}
                onChange={(e) => handleChange("primary", e.target.value)}
              />
              <span
                class="input-group-append"
                onClick={() => handleToggle("primary")}
              >
                <span class="input-group-text colorpicker-input-addon">
                  <div
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 5,
                      backgroundColor: state.primary.value,
                      border: "1px solid gray",
                    }}
                  ></div>
                </span>
              </span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label class="mb-3">
              Secondary Color (Please select a darker color)
            </label>
            <div
              id="b_color-default"
              class="input-group"
              title="Using input value"
            >
              <input
                type="text"
                class="form-control"
                required
                maxLength={7}
                name="name"
                placeholder="Type a name"
                value={state.secondary.value}
                onChange={(e) => handleChange("secondary", e.target.value)}
              />
              <span
                class="input-group-append"
                onClick={() => handleToggle("secondary")}
              >
                <span class="input-group-text colorpicker-input-addon">
                  <div
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 5,
                      backgroundColor: state.secondary.value,
                    }}
                  ></div>
                </span>
              </span>
            </div>
            {state.secondary.warning && (
              <div
                class="form-control-feedback"
                style={{ color: "red", marginTop: 10 }}
              >
                You have a selected color that is brigter than the secondary
                color limit
              </div>
            )}
          </div>

          <div class="form-group col-md-6">
            {state.primary.open && (
              <>
                <label>Choose Primary Color</label>
                <div>
                  <HexColorPicker
                    color={state.primary.value}
                    onChange={(value) => handleChange("primary", value)}
                  />
                </div>
              </>
            )}
          </div>
          <div class="form-group col-md-6">
            {state.secondary.open && (
              <>
                <label>Choose secondary Color</label>
                <div>
                  <HexColorPicker
                    color={state.secondary.value}
                    onChange={(value) => handleChange("secondary", value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div class="form-group mb-0">
          <button
            type="submit"
            class="btn btn-gradient-primary waves-effect waves-light"
          >
            Submit
          </button>
          <button
            type="reset"
            class="btn btn-gradient-danger waves-effect ml-3"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default AddModal;
