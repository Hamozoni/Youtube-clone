
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
// styles
import "./Community.scss";
// contexts
import { statesContext } from "../../Contexts/statesContext";
// libs
import { fetchChannelApi } from "../../Lib/FetchApi";
// layouts
import SideNavbarSmall from "../../Models/SideNavbar/SideNavSmall";
import Error from "../../Layouts/Error/Error";
// components
import Comments from "../../Components/Comments/Comments";
import CommunityCard from "../../Components/CommunityCard/CommunityCard";
import FireLoading from "../../Components/Loading/SpinLoading/SpinLoading";

const Community = ()=>{

    const {id} = useParams();
    const {lang} = useContext(statesContext);
    const [community,setCommunity] = useState({});
    const [isLoading,setIsloading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        setIsloading(true);
        setError(null)
        fetchChannelApi(`post/info?id=${id}&lang=${lang}`)
        .then( data => {
            setCommunity(data);
        })
        .catch((error)=> {
            setError(null);
        })
        .finally(()=> {
            setIsloading(false);
        })
    },[id,lang]);


    return (
        <main className="post">
            <div className="post-container">
                <SideNavbarSmall homeShort='home-short'/>
            {
              error? <Error error={error} /> :  isLoading ? <FireLoading/> : 
                <div className="community-container">
                    <CommunityCard community={community} />
                    <Comments id={id} fetchQuery='post/comments' renderedFrom='post' />
                </div>
            }
            </div>
        </main>
    );
};

export default Community;