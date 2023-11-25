import { useContext, useEffect, useRef, useState } from "react"
import { fetchChannelApi } from "../../Utils/FetchApi";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import Community from "./Community";
import './Community.scss'
import { statesContext } from "../../Contexts/statesContext";

const ChannelCommunity = ({id})=>{

    const {lang, theme} = useContext(statesContext);

    const [community,setCommunity] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);
    const [continuation,setContinuation] = useState(null);
    const [isLoadingMore,setIsLoadingMore] = useState(true);

    useEffect(()=>{
        setIsLoading(true)
    fetchChannelApi(`channel/community?id=${id}&lang=${lang}`)
    .then((data)=>{
        setCommunity(data?.data);
        setContinuation(data?.continuation);
        console.log(data?.data);
        setIsLoadingMore(false)
        setIsLoading(false);
    })
    .catch((error)=>{
        setIsError(error);
        setIsLoading(false)
        setIsLoadingMore('error');
    })

},[id,lang]);

const mainElement = useRef(null)

const fetchMoreCommunity = ()=>{
    setIsLoadingMore(true);

        console.log("yes")
       
        fetchChannelApi(`channel/community?id=${id}&token=${continuation}&lang=${lang}`)
        .then((data)=>{
            setCommunity(prev => [...prev,...data?.data]);
            console.log(data);
            console.log(data?.continuation);
            setContinuation(data?.continuation);
            setIsLoadingMore(false);
        })
        .catch((erro)=>{
            console.log(erro);
            setIsLoadingMore('error');
        })
    
}


useEffect(()=>{
    const fetchMoreData =()=>{
        const elHeight = mainElement.current.clientHeight;
        const scrollPosation = window.scrollY;

        if(scrollPosation >= elHeight - 300 && !isLoadingMore ) {

            console.log(elHeight,scrollPosation)
            fetchMoreCommunity()
        }
    }
    window.addEventListener('scroll',fetchMoreData);
    return ()=>  window.removeEventListener('scroll',fetchMoreData)

},[fetchMoreCommunity])


    return (
        <main 
            ref={mainElement}
            className={`${theme} m-community`}
            >
            {
                isError ?  <Error error={isError} /> : isLoading ? <Loading /> :
                community?.map((comm)=>(
                    <Community key={comm?.postId} community={comm} />
                ))
            }
            {  isLoadingMore != 'error' && continuation ?
            <div className={`${theme} loading-more`}>
                 loading...
            </div> : ''
            }


        </main>
    )
};

export default ChannelCommunity;