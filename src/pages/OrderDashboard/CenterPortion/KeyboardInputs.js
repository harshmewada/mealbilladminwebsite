import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import ItemsSearchModal from "./ItemsSearchModal";
const KeyboardInputs = () => {
  const [count, setCount] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);

  useHotkeys("ctrl+s", (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
  });

  return (
    <>
      <ItemsSearchModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default KeyboardInputs;
