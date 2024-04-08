import { useEffect,useState, useContext } from 'react';

import './Home.scss';
import { fetchChannelApi} from '../../Lib/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import Error from '../../Components/Error/Error';
import RelatedVideos from '../../Components/RelatedVideos/RelatedVideos';
import SideNavbarSmall from '../../Components/SideNavbar/SideNavSmall';
import Keywords from '../../Components/RelatedKeywords/Keywords';
import LoadMoreBtn from '../../Components/LoadMoreBtn/LoadMoreBtn';
import LoadingRelatedVideos from '../../Components/Loading/LoadingRelatedVideos/LoadingRelatedVideos';




const Home = ()=> {

    const {lang, theme} = useContext(statesContext);
    
    const [elements,setElements] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const [continuation,setContinuation] = useState('');
    const [navFilterContinuation,setNavFilterContinuation] = useState('');
    const [currentFilter,setCurrentFilter] = useState('');
    const [navFilters,setNavFilters] = useState(null);
    const [filterPending,setFilterPending] = useState(false);
    const [loadMoreDataFor,setLoadMoreDataFor] = useState('home');
    const [isLoadingMore,setIsLoadingMore] = useState(false);

    const fetchHomeData = (isLoadingMoreData = false)=>{

        setLoadMoreDataFor('home');
        if(isLoadingMoreData) {
            setIsLoadingMore(true);
        }else {
            setError(null);
            setIsLoading(true);
        };
        fetchChannelApi(`home?lang=${lang}`)
        .then((data)=> {
            setContinuation(data?.continuation);
            if(isLoadingMoreData) {
                setElements((prev)=>[...prev,...data?.data]);
            }else {
                setElements(data?.data);
                setNavFilters(data?.filters);
                document.title = 'home page'
            }
            console.log(data)
        })
        .catch((error)=>{
            setError(error)
        })
        .finally(()=> {
            setIsLoading(false);
            setIsLoadingMore(false)
        });
    };

    useEffect(fetchHomeData, [lang]);

    const navFiltersFetchData = (filter,isLoadingMoreData = false)=> {
        setLoadMoreDataFor('filters');
        document.title = filter;
        if(isLoadingMoreData) {
            setIsLoadingMore(true);
        }else {
            setError(null);
            setFilterPending(true);
        }
        fetchChannelApi(`search?query=${filter}${isLoadingMoreData && `&token=${navFilterContinuation}`}&type=video&lang=${lang}`)
        .then((data)=> {

            setNavFilterContinuation(data?.continuation);
            if(isLoadingMoreData){
                setElements((prev)=>[...prev,...data?.data]);
            }else {
                setElements(data?.data);
            }
            console.log(data)
        })
        .catch((error)=>{
            setError(error)
        })
        .finally(()=> {
            setFilterPending(false);
            setIsLoadingMore(false);
        });
    };

    const handleLoadMore = (currentFilter)=> {
        if(loadMoreDataFor === 'home' ){
            fetchHomeData(true);
        } else {
            navFiltersFetchData(currentFilter,true);
        }
    }


    return (
        <main className='main-home'>
            <SideNavbarSmall homeShort='home-short' />
            <div className='container'>
                    { error ? <Error error={error}/>: 
                     isLoading ? <LoadingRelatedVideos display='grid' /> :  
                    <> 
                       {
                        navFilters?.length > 0 &&
                         <Keywords 
                            filters={navFilters} 
                            setCurrentFilter={setCurrentFilter}
                            currentFilter={currentFilter}
                            onClickHandler={navFiltersFetchData} 
                            />
                       }
                      <RelatedVideos  elements={elements} renderFrom="home"/>
                      {
                        continuation?.length &&
                        <LoadMoreBtn 
                            onClickHandler={handleLoadMore} 
                            isLoadingMore={isLoadingMore} 
                            />
                      }
                    </>
                    } 
                {
                   filterPending && 
                   <div className={`b-g-t-${theme}  absolute key-loading`}>
                         <span ></span>
                   </div>
                }
            </div>
        </main>
    );
};

export default Home;