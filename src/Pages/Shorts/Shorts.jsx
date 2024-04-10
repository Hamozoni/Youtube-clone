
import { useState } from "react";
import { useContext, useEffect } from "react";

import "./Shorts.scss";

import { fetchChannelApi } from "../../Lib/FetchApi";
import { useLocation, useNavigate } from "react-router-dom";
import { statesContext } from "../../Contexts/statesContext";

import PlayShortCard from "../../Components/PlayingShortCard/PlayingShortCard";
import Error from "../../Layouts/Error/Error";
import ShortLoading from "../../Components/Loading/WatchLoading/ShortLoading";

const Shorts = ()=> {
    const { lang} = useContext(statesContext);

    const shortId = useLocation().search;

    console.log(shortId.split('=')[1])
    const [activeSectionId,setActiveSectionId] = useState(shortId.split('=')[1]);

    const [activeShort,setActiveShort] = useState(null);
    const [shorts,setShorts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);
    const navigate = useNavigate();

    const fetchActiveShort = ()=>{
        console.log(activeSectionId)
        if(activeSectionId){
            fetchChannelApi(`shorts/info${shortId}&extend=1&lang=${lang}`)
            .then((data)=> {
                setActiveShort(data);
                setActiveSectionId(data?.videoId);
            })
            .catch((error) => {
                setIsError(error);
            })
        }
    };
    
    useEffect(()=>{
        setIsLoading(true);
        setIsError(null)
        fetchChannelApi(`hashtag?tag=viral&type=shorts&lang=${lang}`)
       .then((data)=>{
        setShorts(prev=> [...prev,...data?.data]);
        navigate(`?id=${data?.data[0]?.videoId}`);
        setActiveSectionId(data?.data[0]?.videoId)
       })
       .catch((error)=>{
           setIsError(error)
        })
        .finally(()=> {
           setIsLoading(false);
       })
    },[lang]);

    useEffect(fetchActiveShort,[activeSectionId,lang])


    const handleScrollIntoView = (scrollPosition)=> {
        const sections = document.querySelectorAll('.short-v-container')
        for(let i = 0; i < sections.length; i++){
            if( scrollPosition.scrollTop === sections[i].offsetTop - 60){
                navigate(activeSectionId !== sections[i].id && `?id=${sections[i].id}`);
                setActiveSectionId(sections[i].id)
                
            }
        }
    }

     return (
        <main className="shorts"  
            onScroll={(e)=> handleScrollIntoView(e.target)}>
            { isError ? <Error error={isError}/>  :  isLoading ? <ShortLoading /> :
            <>
              {shorts?.map((short)=>(
                  'thumbnail' in short &&
                     <PlayShortCard 
                        key={short?.videoId} 
                        active={short?.videoId === activeSectionId ? true : false} 
                        short={short?.videoId === activeSectionId ? activeShort : short} 

                    />
               ))}
            </> 
            }
        </main>
     );
};

export default Shorts;