import { useContext } from "react";
import { statesContext } from "../../../Contexts/statesContext";
import "./WatchLoading.scss";

const relVideos = [1,2,3,4,5];

const RelatedLoading = ()=> {

    const {theme} = useContext(statesContext);

    return (
        <div className="rel-vid">
        {
            relVideos?.map((v)=> (
                <div className="vid-c">
                    <div className={`back-color-${theme}-1 back-before-c-${theme}-2 loader-moviement vid-img`}>

                    </div>
                    <div className="box">
                        <div className={`back-color-${theme}-1 back-before-c-${theme}-2 loader-moviement vid-det`}>

                        </div>
                        <div className={`back-color-${theme}-1 back-before-c-${theme}-2 loader-moviement vid-det`}>

                        </div>

                    </div>
                </div>

            ))
        }
    </div> 
    )
};

export default RelatedLoading;