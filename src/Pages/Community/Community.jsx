
import { useParams } from "react-router-dom";
import "./Community.scss";
import { useContext, useEffect, useState } from "react";
import { statesContext } from "../../Contexts/statesContext";
import { fetchChannelApi } from "../../Lib/FetchApi";
import SideNavbarSmall from "../../Models/SideNavbar/SideNavSmall";
import Comments from "../../Components/Comments/Comments";
import CommunityCard from "../../Components/CommunityCard/CommunityCard";
import FireLoading from "../../Components/Loading/SpinLoading/SpinLoading";
import Error from "../../Layouts/Error/Error";

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