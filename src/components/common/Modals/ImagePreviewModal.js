import React from "react";

import ModalContainer from "../ModalContainer";

const ImagePreviewModal = ({ open, onClose, title, data, onSubmit }) => {
  const isLoading = false;

  return (
    <div>
      <ModalContainer
        open={open}
        onClose={() => {
          onClose();
          // setFormErrors();
          // reset();
        }}
        title={title}
        // title={`${mode} ${title}`}
      >
        {data && <img style={{ width: "100%" }} src={data} />}
        <div class="form-group mb-0 mt-2">
          <button
            type="submit"
            disabled={isLoading}
            onClick={() => onClose()}
            class="btn btn-gradient-primary waves-effect waves-light"
          >
            {isLoading && (
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Close
          </button>
        </div>
      </ModalContainer>
    </div>
  );
};

export default ImagePreviewModal;

const styles = {
  paginated: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0px 1vw",
    maxWidth: "20vw",
  },
  select: {
    margin: "0px 0.5vw",
  },
  searchGroup: {
    maxWidth: "15vw",
  },
};
