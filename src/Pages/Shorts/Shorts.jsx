
import { useState } from "react";
import { useContext, useEffect } from "react";

import "./Shorts.scss";

import { fetchChannelApi } from "../../Lib/FetchApi";
import { useLocation, useNavigate } from "react-router-dom";
import { statesContext } from "../../Contexts/statesContext";

import PlayShortCard from "../../Components/PlayingShortCard/PlayingShortCard";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Layouts/Error/Error";

const Shorts = ()=> {
    const { lang} = useContext(statesContext);

    const shortId = useLocation().search;

    const [shortInfo,setShortInfo] = useState();
    const [activeSectionId,setActiveSectionId] = useState(shortId.split('=')[1]);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        setIsLoading(true);
        setIsError(null)
       fetchChannelApi(`hashtag?tag=viral&type=shorts&lang=${lang}`)
       .then((data)=>{

       })
       .catch((error)=>{
           setIsError(error)
        })
        .finally(()=> {
           setIsLoading(false);
       })
    },[lang]);

    useEffect(()=>{
        if(shortId){
            fetchChannelApi(`shorts/info${shortId}&extend=1&lang=${lang}`)
            .then((data)=> {
                setShortInfo(data);
                setActiveSectionId(data?.videoId);
            })
            .catch((error) => {
                setIsError(error);
            })
            .finally(()=> {
                setIsLoading(false);
            })
        }
    },[shortId,lang])


    const handleScrollIntoView = (scrollPosition)=> {
        const sections = document.querySelectorAll('.short-v-container')
        for(let i = 0; i < sections.length; i++){
            if( scrollPosition.scrollTop === sections[i].offsetTop - 60){
                navigate(activeSectionId !== sections[i].id && `?id=${sections[i].id}`)
            }
        }
    }

     return (
        <main className="shorts"  
            onScroll={(e)=> handleScrollIntoView(e.target)}>
            { isError ? <Error error={isError}/>  :  isLoading ? <Loading /> :
            <>
              {shorts?.map((short)=>(
                  'thumbnail' in short &&
                     <PlayShortCard 
                        key={short?.videoId} 
                        active={short?.videoId === activeSectionId} 
                        short={short} 
                        activeShort={short?.videoId === activeSectionId && shortInfo }
                    />
               ))}
            </> 
            }
        </main>
     );
};

export default Shorts;