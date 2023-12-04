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




const Home = ()=> {
    const {lang, theme} = useContext(statesContext);
    
    const [elements,setElements] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const [continuation,setContinuation] = useState('');
    const [filters,setFilters] = useState(null);
    const [filterPending,setFilterPending] = useState(false);


    const fetch = (bool,continuation)=>{
         !bool && setFilterPending(true);
        fetchChannelApi(`home?lan=en&token=${continuation}&lang=${lang}`)
        .then((data)=> {
            setElements(data?.data);
            if(bool){
                setContinuation(data?.continuation);
                setFilters(data?.filters);
            }else {
                setFilterPending(false)
            }
            console.log(data)
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
    }, [lang]);

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
                    </>
                    } 
                {
                   filterPending && 
                   <div className={`${theme} key-loading`}><span>loading...</span></div>
                }
            </div>
        </main>
    );
};

export default Home;