import { useState, useEffect, useContext} from 'react';
import { useLocation,useNavigate} from 'react-router-dom';

import './SearchFeed.scss';
import { fetchChannelApi } from '../../Lib/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import SideNavSmall from '../../Models/SideNavbar/SideNavSmall';
import LoadMoreBtn from '../../Layouts/LoadMoreBtn/LoadMoreBtn';
import Error from '../../Layouts/Error/Error';
import RelatedVideos from '../../Components/RelatedVideos/RelatedVideos';
import Refinements from '../../Components/Refinements/Refinements';
import LoadingRelatedVideos from '../../Components/Loading/LoadingRelatedVideos/LoadingRelatedVideos';

const SearchFeed = ()=> {

    const searchQuery = useLocation().search;
    const {lang, theme} = useContext(statesContext);

    const [videos,setVideos] = useState();
    const [ispending,setIsPending] = useState(true);
    const [error,setError] = useState(null);
    const [refinements,setRefinements] = useState([]);
    const [continuation,setContinuation] = useState(null);
    const [isLoadingMoreData,setIsloadingMoreData] = useState(false);

    const navigate = useNavigate()

    const fetchSearchData = (isMore = false)=> {

        document.title = searchQuery.split('=')[1].replaceAll("%20"," ").replaceAll("%27") + "-myh tube";
        
        if(isMore){
            setIsloadingMoreData(true);
        }else {
            window.scrollTo(0,0);
            setIsPending(true);
        }

        setError(null);

        fetchChannelApi(`search${searchQuery}&lang=${lang}`)
        .then((data)=> {

            if(isMore){
                setVideos((prev)=> [...prev,...data?.data]);
            }else {
                setVideos(data?.data);
            }
            setRefinements(data?.refinements);
            setContinuation(data?.continuation);
        })
        .catch((error)=>{
            setError(error);
        })
        .finally(()=> {
            setIsPending(false);
            setIsloadingMoreData(false);
        });
    };

    useEffect(fetchSearchData,[searchQuery,lang]);


    return (
        <main className={`${theme} search-feed`}>
            <SideNavSmall homeShort='home-short' />
           
                    <div className={`${theme} container`}>
                        {
                            error ? <Error error={error} /> : ispending ? <LoadingRelatedVideos display='flex' /> :
                            <>
                                <Refinements refinements={refinements} onClick={(r)=> navigate(`?query=${r}`)} />
                                <RelatedVideos elements={videos} renderFrom="search" />

                                {
                                    continuation &&
                                    <LoadMoreBtn 
                                        onClickHandler={()=> fetchSearchData(true)} 
                                        isLoadingMore={isLoadingMoreData}
                                    />
                                }
                            </>

                        }
                    </div>
            
        </main>
    );
};

export default SearchFeed;