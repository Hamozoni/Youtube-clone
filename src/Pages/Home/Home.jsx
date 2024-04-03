import { useEffect,useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import './Home.scss';
import { fetchChannelApi} from '../../Utils/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import Loading from '../../Components/Loading/Loading';
import Error from '../../Components/Error/Error';
import RelatedVideos from '../../Components/RelatedVideos/RelatedVideos';
import SideNavbarSmall from '../../Components/SideNavbar/SideNavSmall';
import Keywords from '../../Components/RelatedKeywords/Keywords';
import LoadMoreBtn from '../../Components/LoadMoreBtn/LoadMoreBtn';




const Home = ()=> {

    const {lang, theme} = useContext(statesContext);
    const location = useLocation().search;
    
    const [elements,setElements] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    // const [continuation,setContinuation] = useState('');
    // const [filters,setFilters] = useState(null);
    // const [filterPending,setFilterPending] = useState(false);

    // const [isLoadingMore,setIsLoadingMore] = useState(false);


    // const fetchUrl = location?.length ? `trending${location}&lang=${lang}` : `home?lang=${lang}`;

    const fetchHomeData = ()=>{

        setError(null);
        setIsLoading(true);
        fetchChannelApi(`home?lang=${lang}`)
        .then((data)=> {
            setElements(data?.data);
            // setContinuation(data?.continuation);
            console.log(data)
        })
        .catch((error)=>{
            setError(error)
        })
        .finally(()=> {
            setIsLoading(false);
        })
    };


    useEffect(fetchHomeData, [lang]);

    // const fetchMoreData = ()=>{
    //     setIsLoadingMore(true)
    //     fetchChannelApi(`home?token=${continuation}&lang=${lang}`)
    //     .then((data)=>{
    //         setElements([...elements,...data?.data]);
    //         setContinuation(data?.continuation);
    //         setIsLoadingMore(false)
    //     })
    // }

    return (
        <main className={`${theme} main-home`}>
            <SideNavbarSmall homeShort='home-short' />
            <div className={`${theme} container`}>
                    { error ? <Error error={error}/>: 
                     isLoading ? <Loading /> :  
                    <> 
                       {/* {
                        filters?.length > 0 &&
                         <Keywords 
                            filters={filters} 
                            onClickHandler={fetchHomeData} 
                            continuation={continuation} 
                            />
                       } */}
                      <RelatedVideos  elements={elements} renderFrom="home"/>
                      {/* {
                        continuation?.length &&
                        <LoadMoreBtn onClickHandler={fetchMoreData} isLoadingMore={isLoadingMore} />
                      } */}
                    </>
                    } 
                {/* {
                   filterPending && 
                   <div className={`${theme} absolute key-loading`}><span>loading...</span></div>
                } */}
            </div>
        </main>
    );
};

export default Home;