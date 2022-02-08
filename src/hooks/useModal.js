import React from "react";

const useModal = () => {
  const [state, setState] = React.useState({
    open: false,
    modalData: undefined,
  });

  const openModal = (data) => {
    setState({
      open: true,
      data: data,
    });
  };

  const closeModal = (data) => {
    setState({
      open: false,
      data: undefined,
    });
  };

  const setModalData = (data) => {
    setState({
      ...state,
      data: data,
    });
  };
  return {
    open: state.open,
    modalData: state.data,
    openModal,
    closeModal,
    setModalData,
  };
};

export default useModal;
