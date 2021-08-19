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
              className="d-flex flex-direction-row align-items-center border p-2 w-100"
              style={{
                cursor: "cell",
              }}
              onClick={() => onVariantClick(vars)}
            >
              <div
                style={{ flex: 3 }}
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
    </ModalContainer>
  );
};

export default VariantSelectorModal;
