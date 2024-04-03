
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

                    <li className={`${theme} nav-l-li loader-moviememnt`} key={e}>

                    </li>
                ))
            }
        </ul>
        <div className="loader-conyainer">
            {
                cards.map((e)=> (
                    <div className="loader-card" key={e}>
                        <div className={`${theme} loader-image loader-moviememnt`}></div>
                        <div className="loader-box ">
                            <span className={`${theme} image loader-moviememnt`}></span>
                            <div className="lod-t-box ">
                                <div className={`${theme} chn-n loader-moviememnt`}></div>
                                <div className={`${theme} laoder-ch-name loader-moviememnt`}></div>
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