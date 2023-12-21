import { useEffect,useState } from 'react';
import './Home.scss';
import { fetchChannelApi} from '../../Utils/FetchApi';
import Loading from '../../Components/Loading/Loading';
import Error from '../../Components/Error/Error';
import RelatedVideos from '../../Components/RelatedVideos/RelatedVideos';
import SideNavbarSmall from '../../Components/SideNavbar/SideNavSmall';
import { useContext } from 'react';
import { statesContext } from '../../Contexts/statesContext';
import Keywords from '../../Components/RelatedKeywords/Keywords';
import LoadMoreBtn from '../../Components/LoadMoreBtn/LoadMoreBtn';
import { useLocation } from 'react-router-dom';




const Home = ()=> {
    const {lang, theme} = useContext(statesContext);
    
    const [elements,setElements] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const [continuation,setContinuation] = useState('');
    const [filters,setFilters] = useState(null);
    const [filterPending,setFilterPending] = useState(false);

    const [isLoadingMore,setIsLoadingMore] = useState(false);

    const location = useLocation();

    const fetch = (isFilter,continuation)=>{
         !isFilter && setFilterPending(true);
         console.log(location?.search?.length ? `trending${location.search}&lang=${lang}` : `home`)
        fetchChannelApi(location?.search?.length ? `trending${location.search}&lang=${lang}` : `home?lang=${lang}&token=${continuation}`)
        .then((data)=> {
            setElements(data?.data);
            setContinuation(data?.continuation);
            if(isFilter){
                setFilters(data?.filters);
            }else {
                setFilterPending(false)
            }
            setIsLoading(false);
        })
        .catch((error)=>{
            setError(error)
            setIsLoading(false);
        })
    }

    useEffect(()=> {
        setIsLoading(true)
        setError(null);
        fetch(true,continuation);
    }, [lang,location.search]);

    const fetchMoreData = ()=>{
        setIsLoadingMore(true)
        fetchChannelApi(`home?lan=en&token=${continuation}&lang=${lang}`)
        .then((data)=>{
            setElements([...elements,...data?.data]);
            setContinuation(data?.continuation);
            setIsLoadingMore(false)
        })
    }

    return (
        <main className={`${theme} main-home`}>
            <SideNavbarSmall homeShort='home-short' />
            <div className={`${theme} container`}>
                    { error ? <Error error={error}/>: 
                     isLoading ? <Loading /> :  
                    <> 
                       {
                        filters?.length > 0 &&
                         <Keywords filters={filters} onClickHandler={fetch} continuation={continuation} />
                       }
                      <RelatedVideos  elements={elements} renderFrom="home"/>
                      {
                        continuation?.length &&
                        <LoadMoreBtn onClickHandler={fetchMoreData} isLoadingMore={isLoadingMore} />
                      }
                    </>
                    } 
                {
                   filterPending && 
                   <div className={`${theme} absolute key-loading`}><span>loading...</span></div>
                }
            </div>
        </main>
    );
};

export default Home;