import { useContext } from "react";
import { statesContext } from "../../../Contexts/statesContext";

import "./WatchLoading.scss";

const WatchLoading = () => {
  const { theme } = useContext(statesContext);

  return (
    <div className="vid-pla">
      <div className={`back-color-${theme}-1 back-before-c-${theme}-2  vid-p video-player`}></div>
      <div className={`back-color-${theme}-1 back-before-c-${theme}-2  vid-p-det`}></div>
      <div className={`back-color-${theme}-1 back-before-c-${theme}-2  vid-p-det`}></div>
    </div>
  );
};

export default WatchLoading;
