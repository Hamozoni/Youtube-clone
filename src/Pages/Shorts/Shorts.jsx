
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

    const shortId = useLocation()?.search?.shortId?.split('=')[1];


    const [shorts,setShorts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isActivePendding,setIsActivePendding] = useState(true);
    const [isError,setIsError] = useState(null);
    const navigate = useNavigate();

    const fetchActiveShort = (id,setShorts,isThereActiveId,from)=>{
            setIsActivePendding(true);
            setIsError(null);
            fetchChannelApi(`shorts/info?id=${id}&extend=1&lang=${lang}`)
            .then((data)=> {
                if(isThereActiveId){
                    setShorts(prev=> {
                        let targetShort = prev.indexOf(prev.find(e=> e.videoId === id));
                        if(targetShort === -1 || from === 'first'){
                            prev.filter(e=> e.videoId !== id);
                            return [data,...prev]
                        }else {
                            prev[targetShort] = data;
                            return [...prev]
                        }

                    })
                }else {
                    setShorts(prev=>{
                        
                        prev.filter(e=> e.videoId !== id);

                        return [data,...prev]
                    })
                }

                navigate(`?id=${data?.data[0]?.videoId}`);
            })
            .catch((error) => {
                setIsError(error);
            })
            .finally(()=> {
                setIsActivePendding(false);
            })
    };     
    
    useEffect(()=>{
        setIsLoading(true);
        setIsError(null)
        fetchChannelApi(`hashtag?tag=fanny&type=shorts&lang=${lang}`)
       .then((data)=>{
           setShorts(data?.data);
        if(!shortId){
            navigate(`?id=${data?.data[0]?.videoId}`);
            fetchActiveShort(data?.data[0]?.videoId,setShorts,false);
  
        }else {
            navigate(`?id=${shortId}`);
            fetchActiveShort(shortId,setShorts,true,'first');
        }
       })
       .catch((error)=>{
           setIsError(error)
        })
        .finally(()=> {
           setIsLoading(false);
       })
    },[lang]);

    // useEffect(fetchActiveShort,[activeSectionId,lang])


    const handleScrollIntoView = (scrollPosition)=> {
        const sections = document.querySelectorAll('.short-v-container')
        for(let i = 0; i < sections.length; i++){
            if( scrollPosition.scrollTop === sections[i].offsetTop - 60){
                fetchActiveShort(sections[i].id,setShorts,true,'scroll');
                navigate(shortId !== sections[i].id && `?id=${sections[i].id}`);

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
                        active={short?.videoId === shortId ? true : false} 
                        short={short}
                        isActivePendding={isActivePendding}
                    />
               ))}
            </> 
            }
        </main>
     );
};

export default Shorts;