import './SearchFeed.scss';
import { useState, useEffect, useRef, useContext} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchChannelApi } from '../../Utils/FetchApi';
import Loading from '../../Components/Loading/Loading';
import Error from '../../Components/Error/Error';
import RelatedVideos from '../../Components/RelatedVideos/RelatedVideos';
import Refinements from '../../Components/Refinements/Refinements';

import SideNavSmall from '../../Components/SideNavbar/SideNavSmall';
import { statesContext } from '../../Contexts/statesContext';
import LoadMoreBtn from '../../Components/LoadMoreBtn/LoadMoreBtn';

const SearchFeed = ()=> {

    const [videos,setVideos] = useState();
    const [ispending,setIsPending] = useState(true);
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState();
    const [refinements,setRefinements] = useState([]);
    const [continuation,setContinuation] = useState(null);
    const [isLoadingMoreData,setIsloadingMoreData] = useState(false);

    const location = useLocation();
    const {lang, theme} = useContext(statesContext);

    useEffect(()=> {
        window.scrollTo(0,0);
        setIsError(false);
        setIsPending(true);
        fetchChannelApi(`search${location?.search}&lang=${lang}`)
        .then((data)=> {
            setVideos(data?.data);
            setRefinements(data?.refinements);
            setContinuation(data?.continuation);
            console.log(data);
            setIsPending(false)
        })
        .catch((error)=>{
            setIsError(true);
            setError(error);
        })
    },[location?.search,lang]);

    const fetchMoreData = ()=>{
        setIsloadingMoreData(true);
        fetchChannelApi(`search${location?.search}&lang=${lang}&token=${continuation}`)
        .then((data)=>{
            console.log(data)
            setVideos(prev => [...prev,...data?.data]);
            setContinuation(data?.continuation);
            setIsloadingMoreData(false);
        })
        .catch((erorr)=>{

        })
    }


    return (
        isError ? <Error error={error} /> :
        <main className={`${theme} search-feed`}>
            <SideNavSmall homeShort='home-short' />
            <div className={`${theme} container`}>

                { Refinements?.length > 0 && <Refinements refinements={refinements} />}
                {ispending ? <Loading /> :<RelatedVideos elements={videos} renderFrom="search" />}

                {
                 continuation &&
                 <LoadMoreBtn onClickHandler={fetchMoreData} isLoadingMore={isLoadingMoreData}/>
               }
            </div>
        </main>
    );
};

export default SearchFeed;