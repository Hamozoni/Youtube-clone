import { useContext } from "react";
import RelatedVideos from "../../Components/RelatedVideos/RelatedVideos";
import { statesContext } from "../../Contexts/statesContext";

import "./History.scss";
const History = ()=> {
     
    const {state} = useContext(statesContext);
    console.log(state)

    return (
       <main className="history">
            <RelatedVideos elements={state?.history} />
       </main>
    );
};

export default History;