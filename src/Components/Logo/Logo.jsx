import "./Logo.scss";

import { statesContext } from "../../Contexts/statesContext";
import { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";

const Logo = () => {
  const { theme, staticData, isSideNavbarOpen, setIsSideNavbarOpen } = useContext(statesContext);

  const onClickSideNav = () => {
    setIsSideNavbarOpen(!isSideNavbarOpen);
  };

  return (
    <div className="logo">
      <div className={`t-color-${theme}-5 menu-icon`} onClick={onClickSideNav}>
        <MenuIcon />
      </div>
      <Link to="/" className="main-logo">
        <span className={`back-color-${theme}-1 icon`}>
          <PlayArrowIcon />
        </span>
        {staticData?.logo}
      </Link>
    </div>
  );
};

export default Logo;
