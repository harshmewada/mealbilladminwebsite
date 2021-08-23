import React from "react";
import { Curreny } from "../../../redux/types";
import ModalContainer from "../ModalContainer";

const styles = {
  variantsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  rowStyle: {
    flex: 3,
  },
  rowContainerStyle: {
    cursor: "cell",
  },
};

const VariantSelectorModal = ({
  open,
  onClose,
  variants,
  onVariantClick,
  title,
}) => {
  return (
    <ModalContainer
      open={open}
      onClose={() => {
        onClose();
        // setFormErrors();
        // reset();
      }}
      title={`${title} variants`}
      size="sm"
      centered
      noPadding
      // title={`${mode} ${title}`}
    >
      <div style={styles.variantsContainer}>
        {variants.map((vars, varIndex) => {
          return (
            <div
              className="d-flex flex-direction-row align-items-center border p-2 w-100 variant-row"
              style={styles.rowContainerStyle}
              onClick={() => onVariantClick(vars)}
            >
              <div
                style={styles.rowStyle}
                className="text-primary font-weight-bold text-capitalize"
              >
                {vars.itemName}
              </div>
              <div style={{ flex: 1 }} className="text-center">
                <img
                  src={
                    vars.isNonVeg ? "/images/non-veg.png" : "/images/veg.png"
                  }
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </div>
              <div
                style={{ flex: 1 }}
                className="d-flex flex-direction-row justify-content-end"
              >
                <div>
                  {" "}
                  {Curreny} {vars.itemPrice}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div class="form-group mt-3 mb-3 d-flex justify-content-center">
        <button
          type="submit"
          onClick={() => onClose()}
          class="btn btn-gradient-primary waves-effect waves-light"
        >
          OK
        </button>
      </div>
    </ModalContainer>
  );
};

export default VariantSelectorModal;
