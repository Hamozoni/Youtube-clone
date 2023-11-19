import { useEffect, useRef, useState } from "react"
import { fetchChannelApi } from "../../Utils/FetchApi";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import Community from "./Community";
import './Community.scss'

const ChannelCommunity = ({id})=>{

    const [community,setCommunity] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);
    const [continuation,setContinuation] = useState(null);
    const [isLoadingMore,setIsLoadingMore] = useState(true);

    useEffect(()=>{
        setIsLoading(true)
    fetchChannelApi(`channel/community?id=${id}`)
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

},[id]);

const mainElement = useRef(null)

const fetchMoreCommunity = ()=>{
    setIsLoadingMore(true);

        console.log("yes")
       
        fetchChannelApi(`channel/community?id=${id}&token=${continuation}`)
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
            className="m-community" 
            >
            {
                isError ?  <Error error={isError} /> : isLoading ? <Loading /> :
                community?.map((comm)=>(
                    <Community key={comm?.postId} community={comm} />
                ))
            }
            {  isLoadingMore != 'error' && continuation ?
            <div className="loading-more">
                 loading...
            </div> : ''
            }


        </main>
    )
};

export default ChannelCommunity;