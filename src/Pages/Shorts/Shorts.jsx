
import { useContext, useEffect } from "react";
import "./Shorts.scss";
import { fetchChannelApi } from "../../Utils/FetchApi";
import { useState } from "react";
import Loading from "../../Components/Loading/Loading";
import PlayShortCard from "../../Components/PlayingShortCard/PlayingShortCard";
import { useLocation, useNavigate } from "react-router-dom";
import { statesContext } from "../../Contexts/statesContext";
import Error from "../../Components/Error/Error";

const Shorts = ()=> {
    const { lang, shorts,setShorts } = useContext(statesContext);

    const [shortInfo,setShortInfo] = useState();
    const location = useLocation();
    const [activeSectionId,setActiveSectionId] = useState(location.search.split('=')[1]);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        setIsLoading(true);
       fetchChannelApi(`hashtag?tag=viral&type=shorts&lang=${lang}`)
       .then((data)=>{
            setShorts(prev => [...prev,...data?.data]);
            navigate(shorts?.length ? `?id=${shorts[0]?.videoId}` : `?id=${data?.data[0]?.videoId}`);
            setActiveSectionId(shorts?.length ? shorts[0]?.videoId : data?.data[0]?.videoId)
            setIsLoading(false);
            setIsError(null)
       })
       .catch((error)=>{
        setIsLoading(false);
        setIsError(error)
       })
    },[lang]);

    useEffect(()=>{
        if(location.search){
            fetchChannelApi(`shorts/info${location.search}&lang=${lang}`)
            .then((data)=> {
                setShortInfo(data);
                setActiveSectionId(data?.videoId)
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setIsError(error);
            });
        }
    },[location.search,lang])


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