import React from "react";

const styles = {
  paginated: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0px 1vw",
  },
  select: {
    margin: "0px 0.5vw",
  },
  searchGroup: {
    maxWidth: "15vw",
  },
};
const TableTitle = ({ title, endAction: EndAction, headerComponents }) => {
  return (
    title && (
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="">{title}</h4>
          {headerComponents?.map((Comp, index) => {
            return (
              <div class="ml-4">
                <Comp />
              </div>
            );
          })}
        </div>

        {EndAction && <EndAction />}
        {/* <button
              type="button"
              onClick={() => toggleAdd()}
              class="btn btn-gradient-dark waves-effect waves-light"
            >
              <i class="mdi mdi-plus mr-2"></i> 
            </button> */}
      </div>
    )
  );
};

export default TableTitle;
