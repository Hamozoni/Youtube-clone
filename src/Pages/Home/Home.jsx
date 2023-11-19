import { useEffect,useState } from 'react';
import './Home.scss';
import { fetchChannelApi} from '../../Utils/FetchApi';
import Loading from '../../Components/Loading/Loading';
import Error from '../../Components/Error/Error';
import RelatedVideos from '../../Components/RelatedVideos/RelatedVideos';
import SideNavbarSmall from '../../Components/SideNavbar/SideNavSmall';
import { useContext } from 'react';
import { isThemeDark } from '../../Contexts/Theme';




const Home = ()=> {
    const {lang} = useContext(isThemeDark);
    
    const [elements,setElements] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const [continuation,setContinuation] = useState('');
    const [filters,setFilters] = useState(null);
    const [currentFilter,setCurrentFilter] = useState('');;
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
        <main className="main-home">
            <SideNavbarSmall homeShort='home-short' />
            <div className="container">
                    { error ? <Error error={error}/>: 
                     isLoading ? <Loading /> :  
                    <> 
                       {
                        filters?.length > 0 &&
                       <nav className="related-keywords">
                           <ul className='taps'>
                              {
                                filters?.map((fil,i)=>(
                                    <li 
                                        className={fil === currentFilter && 'active'}
                                        onClick={()=> {
                                           if(currentFilter !== fil){ 
                                               setCurrentFilter(fil)
                                               fetch(false,fil?.continuation);
                                            } 
                                            if( i === 0) {
                                                setCurrentFilter(fil)
                                                fetch(false,continuation);
                                            }
                                        }}
                                        key={fil?.filter}
                                        > 
                                            {fil?.filter}
                                     </li>
                                ))
                                }
                           </ul>
                       </nav>
                       }
                      <RelatedVideos  elements={elements} renderFrom="home"/>
                    </>
                    } 
                {
                   filterPending && 
                   <div className="key-loading"><span>loading...</span></div>
                }
            </div>
        </main>
    );
};

export default Home;