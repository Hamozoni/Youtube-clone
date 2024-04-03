import { useEffect,useState, useContext } from 'react';

import './Home.scss';
import { fetchChannelApi} from '../../Utils/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import Error from '../../Components/Error/Error';
import RelatedVideos from '../../Components/RelatedVideos/RelatedVideos';
import SideNavbarSmall from '../../Components/SideNavbar/SideNavSmall';
import Keywords from '../../Components/RelatedKeywords/Keywords';
import LoadMoreBtn from '../../Components/LoadMoreBtn/LoadMoreBtn';
import Loader from './Loader/Loader';




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
        }

        fetchChannelApi(`home?lang=${lang}`)
        .then((data)=> {
            setContinuation(data?.continuation);
            if(isLoadingMoreData) {
                setElements((prev)=>[...prev,...data?.data]);
            }else {
                setElements(data?.data);
                setNavFilters(data?.filters);
            }
            console.log(data)
        })
        .catch((error)=>{
            setError(error)
        })
        .finally(()=> {
            setIsLoading(false);
            setIsLoadingMore(false)
        })
    };


    useEffect(fetchHomeData, [lang]);

    const navFiltersFetchData = (filter,isLoadingMoreData = false)=> {
        setLoadMoreDataFor('filters');

        if(isLoadingMoreData) {
            setIsLoadingMore(true);
        }else {
            setError(null);
            setFilterPending(true);
        }
        fetchChannelApi(`search?query=${filter}&token=${navFilterContinuation}&lang=${lang}`)
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
        })
    }


    return (
        <main className={`${theme} main-home`}>
            <SideNavbarSmall homeShort='home-short' />
            <div className={`${theme} container`}>
                    { error ? <Error error={error}/>: 
                     isLoading ? <Loader  /> :  
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
                            onClickHandler={
                                loadMoreDataFor === 'home' ? 
                                 ()=> fetchHomeData(true) :()=> navFiltersFetchData(currentFilter,true)
                               } 
                            isLoadingMore={isLoadingMore} 
                            />
                      }
                    </>
                    } 
                {
                   filterPending && 
                   <div className={`${theme} absolute key-loading`}>
                         <span></span>
                   </div>
                }
            </div>
        </main>
    );
};

export default Home;