import { useContext } from "react";
import "./WatchLoading.scss";
import { statesContext } from "../../../Contexts/statesContext";

const ShortLoading = () => {

  const {theme} = useContext(statesContext);
  return (
    <div className="short-loading">
        <div className="loader">
            <div className={`back-color-${theme}-1 image`}>

            </div>
            <ul className="info">
               <li className={`back-color-${theme}-1`}></li>
               <li className={`back-color-${theme}-1`}></li>
               <li className={`back-color-${theme}-1`}></li>
               <li className={`back-color-${theme}-1`}></li>
               <li className={`back-color-${theme}-1`}></li>
            </ul>
        </div>
    </div>
  )
}

export default ShortLoading