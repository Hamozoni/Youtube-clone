import { useContext } from "react";
import "./Loading.scss";
import { statesContext } from "../../Contexts/statesContext";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Loading = () => {
  const { theme } = useContext(statesContext);
  return (
    <div className={`${theme} loading`}>
      <div className={`${theme} logo`}>
        <div className="background"></div>
        <div className="logo-cont">
          <div className={`${theme} icon`}>
            <PlayArrowIcon />
          </div>
          <h1>
            <span>M</span>
            <span>y</span>
            <span>h</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loading;
