import { useContext } from "react";
import { statesContext } from "../../../Contexts/statesContext";

import "./WatchLoading.scss";

const WatchLoading = () => {

    const relVideos = [1,2,3,4,5];
    const {theme} = useContext(statesContext);

  return (
    <div className="watch-Loading">
        <div className="vid-pla">
            <div className={`back-color-${theme}-1 vid-p video-player`}>
            </div>
            <div className={`back-color-${theme}-1 vid-p-det`}>

            </div>
            <div className={`back-color-${theme}-1 vid-p-det`}>

            </div>
        </div>
        <div className="rel-vid">
            {
                relVideos?.map((v)=> (
                    <div className="vid-c">
                        <div className={`back-color-${theme}-1 vid-img`}>

                        </div>
                        <div className="box">
                            <div className={`back-color-${theme}-1 vid-det`}>

                            </div>
                            <div className={`back-color-${theme}-1 vid-det`}>

                            </div>

                        </div>
                    </div>

                ))
            }
        </div>
    </div>
  )
}

export default WatchLoading