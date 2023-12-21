import { useContext } from "react";
import RelatedVideos from "../../Components/RelatedVideos/RelatedVideos";
import { statesContext } from "../../Contexts/statesContext";

import "./LikedVideos.scss";
const LikedVideos = ()=> {
     
    const {state} = useContext(statesContext);
    return (
       <main className="liked-videos">
            <RelatedVideos elements={state?.LikedVideos} />
       </main>
    );
};

export default LikedVideos;