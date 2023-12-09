
import { useParams } from "react-router-dom";
import "./Post.scss";
import { useContext, useEffect, useState } from "react";
import { statesContext } from "../../Contexts/statesContext";
import { fetchChannelApi } from "../../Utils/FetchApi";
import Loading from "../../Components/Loading/Loading";
import SideNavbarSmall from "../../Components/SideNavbar/SideNavSmall";
import Comments from "../../Components/Comments/Comments";
import PostCard from "../../Components/PostCard/PostCard";

const Post = ()=>{

    const {id} = useParams();
    const {lang} = useContext(statesContext);
    const [community,setCommunity] = useState({});
    const [isLoading,setIsloading] = useState(true);

    useEffect(()=>{
        setIsloading(true);
        fetchChannelApi(`post/info?id=${id}&lang=${lang}`)
        .then( data => {
            setCommunity(data);
            setIsloading(false);
            console.log(data)

        })
    },[id,lang]);
    return (
        <main className="post">
            <div className="post-container">
                <SideNavbarSmall homeShort='home-short'/>
            {
                isLoading ? <Loading /> : 
                <div className="community-container">
                    <PostCard community={community} />
                    <Comments id={id} fetchQuery='post/comments' renderedFrom='post' />
                </div>
            }
            </div>
        </main>
    );
};

export default Post;