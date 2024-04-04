
import { useContext } from "react";
import "./LoadingRelatedVideos.scss";
import { statesContext } from "../../../Contexts/statesContext";

const LoadingRelatedVideos = ({display}) => {

    const {theme} = useContext(statesContext);
    const cards = [1,2,3,4,5,6];

  return (
    <div className="home-loader">
        <nav className="loader-nav">
            <ul className="loader-ul">
                {
                    cards.map((e)=> (

                        <li className={`back-color-${theme}-1  back-before-c-${theme}-2 nav-l-li loader-moviement`} key={e}>
                        </li>
                    ))
                }
            </ul>
        </nav>
        <div className={`${display} loader-conyainer`}>
            {
                cards.map((e)=> (
                    <div className={`${display} loader-card`} key={e}>
                        <div className={`back-color-${theme}-1 ${display}  back-before-c-${theme}-2 loader-image loader-moviement`}>
                        </div>
                        <div className="loader-box ">
                            <div className={`back-color-${theme}-1  back-before-c-${theme}-2  image loader-moviement`}>
                            </div>
                            <div className="lod-t-box ">
                                <div className={`back-color-${theme}-1 ${display}  back-before-c-${theme}-2 chn-n loader-moviement`}></div>
                                <div className={`back-color-${theme}-1 ${display}  back-before-c-${theme}-2  laoder-ch-name loader-moviement`}></div>
                            </div>
                        </div>
                    </div>

                ))
            }

        </div>
    </div>
  )
}

export default LoadingRelatedVideos;