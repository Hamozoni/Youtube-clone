import './SearchFeed.scss';
import { useState, useEffect, useRef, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { fetchChannelApi } from '../../Utils/FetchApi';
import Loading from '../../Components/Loading/Loading';
import Error from '../../Components/Error/Error';
import RelatedVideos from '../../Components/RelatedVideos/RelatedVideos';
import Refinements from '../../Components/Refinements/Refinements';

import SideNavSmall from '../../Components/SideNavbar/SideNavSmall';
import { statesContext } from '../../Contexts/statesContext';

const SearchFeed = ()=> {

    const [videos,setVideos] = useState();
    const [ispending,setIsPending] = useState(true);
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState();
    const [refinements,setRefinements] = useState([]);
    const [continuation,setContinuation] = useState(null);
    const [isLoadingMoreData,setIsloadingMoreData] = useState(false);

    const { word } = useParams();
    const {lang, theme} = useContext(statesContext);

    useEffect(()=> {
        window.scrollTo(0,0);
        setIsError(false);
        setIsPending(true);
        fetchChannelApi(`search?query=${word}&lang=${lang}`)
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
    },[word,lang]);

    const fetchMoreData = ()=>{
        setIsloadingMoreData(false);
        fetchChannelApi(`search?query=${word}&lang=${lang}&token=${continuation}`)
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

               
                if(scrollPosation >= loadingTop - windowHeight + 20 && isLoadingMoreData){
                    fetchMoreData();
                }
            }

        }

        window.addEventListener('scroll',moreData);
        return ()=> window.removeEventListener('scroll',moreData);

    },[continuation]);

    return (
        isError ? <Error error={error} /> :
        <main className={`${theme} search-feed`}>
            <SideNavSmall homeShort='home-short' />
            <div className={`${theme} container`}>

                { Refinements?.length > 0 && <Refinements refinements={refinements} />}
                {ispending ? <Loading /> :<RelatedVideos elements={videos} renderFrom="search" />}

                {
                    isLoadingMoreData !== 'error' && continuation ?
                
                <div className={`${theme} load-more`} ref={loading}>
                     loading...
                </div> :''
               }
            </div>
        </main>
    );
};

export default SearchFeed;