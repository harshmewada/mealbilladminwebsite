import React from "react";
const image = {
  height: "35px",
  width: "35px",
  justifySelf: "center",
  alignSelf: "center",
};
const ImageColumn = ({ data, sourceUrl }) => {
  return <img src={`${sourceUrl}/${data}`} style={image} />;
};

export default ImageColumn;
