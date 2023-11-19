import './SearchFeed.scss';
import { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { fetchChannelApi } from '../../Utils/FetchApi';
import Loading from '../../Components/Loading/Loading';
import Error from '../../Components/Error/Error';
import RelatedVideos from '../../Components/RelatedVideos/RelatedVideos';
import Refinements from '../../Components/Refinements/Refinements';

import SideNavSmall from '../../Components/SideNavbar/SideNavSmall';

const SearchFeed = ()=> {
    const [videos,setVideos] = useState();
    const [ispending,setIsPending] = useState(true);
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState();
    const [refinements,setRefinements] = useState([]);
    const [continuation,setContinuation] = useState(null);
    const [isLoadingMoreData,setIsloadingMoreData] = useState(false);

    const { word } = useParams();

    useEffect(()=> {
        window.scrollTo(0,0);
        setIsError(false);
        setIsPending(true);
        fetchChannelApi(`search?query=${word}`)
        .then((data)=> {
            setVideos(data?.data);
            setRefinements(data?.refinements);
            setContinuation(data?.continuation);
            setIsloadingMoreData(true);
            console.log(data);
            setIsPending(false)
        })
        .catch((error)=>{
            setIsError(true);
            setError(error);
            setIsloadingMoreData('error');
        })
    },[word]);

    const fetchMoreData = ()=>{
        setIsloadingMoreData(false);
        fetchChannelApi(`search?query=${word}&token=${continuation}`)
        .then((data)=>{
            console.log(data)
            setVideos(prev => [...prev,...data?.data]);
            
            setContinuation(data?.continuation);
            setIsloadingMoreData(true);
        })
        .catch((erorr)=>{
            setIsloadingMoreData('error');
        })
    }

    // const mainElement = useRef(null);
    const loading = useRef(null)

    useEffect(()=>{
        console.log(isLoadingMoreData);
        

        const moreData = ()=>{
            if(continuation){
                const scrollPosation = window.scrollY;
                const windowHeight = window.innerHeight;
                const loadingTop = loading.current.offsetTop;

               
                if(scrollPosation >= loadingTop - windowHeight + 38 && isLoadingMoreData){
                    fetchMoreData();
                }
            }

        }

        window.addEventListener('scroll',moreData);
        return ()=> window.removeEventListener('scroll',moreData);

    },[]);

    return (
        isError ? <Error error={error} /> :
        <main className="search-feed">
            <SideNavSmall homeShort='home-short' />
            <div className="container">

                { Refinements?.length > 0 && <Refinements refinements={refinements} />}
                {ispending ? <Loading /> :<RelatedVideos elements={videos} renderFrom="search" direction="column"/>}

                {
                    isLoadingMoreData !== 'error' && continuation ?
                
                <div className="load-more" ref={loading}>
                     loading...
                </div> :''
               }
            </div>
        </main>
    );
};

export default SearchFeed;