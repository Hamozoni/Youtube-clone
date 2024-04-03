
import { useContext } from "react";
import "./Loader.scss";
import { statesContext } from "../../../Contexts/statesContext";
const Loader = () => {
    const {theme} = useContext(statesContext);
    const cards = [1,2,3,4,5,6];
  return (
    <div className="home-loader">
        <ul className="loader-nav">
            {
                cards.map((e)=> (

                    <li className={`back-color-${theme}-1  back-before-c-${theme}-2 nav-l-li loader-moviememnt`} key={e}>
                    </li>
                ))
            }
        </ul>
        <div className="loader-conyainer">
            {
                cards.map((e)=> (
                    <div className="loader-card" key={e}>
                        <div className={`back-color-${theme}-1  back-before-c-${theme}-2 loader-image loader-moviement`}></div>
                        <div className="loader-box ">
                            <span className={`back-color-${theme}-1  back-before-c-${theme}-2  image loader-moviement`}></span>
                            <div className="lod-t-box ">
                                <div className={`back-color-${theme}-1  back-before-c-${theme}-2 chn-n loader-moviement`}></div>
                                <div className={`back-color-${theme}-1  back-before-c-${theme}-2  laoder-ch-name loader-moviement`}></div>
                            </div>
                        </div>
                    </div>

                ))
            }

        </div>
    </div>
  )
}

export default Loader;