import React from "react";
import { useDispatch } from "react-redux";
import ShortCutModal from "../../../components/common/Modals/ShortCutModal";
import useFullscreenStatus from "../../../hooks/useFullscreenStatus";
import { toggleFullScreen } from "../../../redux/action/utilActions";
import Clock from "react-live-clock";
import { TIMEFORMAT, TIMEZONE } from "../../../contants";
const ShortCutList = () => {
  const btnRef = React.useRef();
  const dispatch = useDispatch();
  const [shortCutOpen, setShortCutOpen] = React.useState(false);

  const toggleShortCut = () => setShortCutOpen(!shortCutOpen);
  const handleFullscreen = () => dispatch(toggleFullScreen());

  const shortcuts = [
    {
      title: "shortcuts",
      icon: "mdi mdi-keyboard",
      onClick: () => toggleShortCut(),
    },
    {
      title: "fullscreen",
      icon: "mdi mdi-fullscreen",
      onClick: () => handleFullscreen(),
    },
  ];
  return (
    <div class="mt-2">
      <ShortCutModal
        open={shortCutOpen}
        ref={btnRef}
        onClose={() => toggleShortCut()}
      />
      <button
        type="button"
        ref={btnRef}
        class="btn btn-outline-primary  mr-2 "
        style={{
          width: 100,
        }}
      >
        <Clock format={TIMEFORMAT} ticking={true} timezone={TIMEZONE} />
      </button>
      {shortcuts.map((data, index) => {
        return (
          <button
            type="button"
            ref={btnRef}
            class="btn btn-outline-primary btn-circle mr-2"
            onClick={() => data.onClick()}
          >
            <i class={data.icon} style={{ fontSize: 20 }}></i>
          </button>
        );
      })}
    </div>
  );
};

export default ShortCutList;
