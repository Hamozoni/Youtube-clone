import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// libs
import { fetchChannelApi } from "../../../../Lib/FetchApi";
// styles
import './ChannelContent.scss';
// context
import { statesContext } from "../../../../Contexts/statesContext";
// components
import FireLoading from "../../../../Components/Loading/SpinLoading/SpinLoading";
import ContentContainer from "./ContentContainer";
// layouts
import Error from "../../../../Layouts/Error/Error";
import LoadMoreBtn from "../../../../Layouts/LoadMoreBtn/LoadMoreBtn";



const ChannelContent = ()=>{

    const {lang,staticData, theme} = useContext(statesContext);

    const {id,section} = useParams()
    const {latest, popular, oldest,  dateAdded,lastVideoAdded} = staticData;

    const [channelViveos,setChannelViveos] = useState([]);
    const [continuation,setContinuation] = useState('');
    const [isLoadingMoreData,setIsloadingMoreData] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);

    const location = useLocation();
    const searchParam = location?.search?.length ? location?.search?.replace('?','&') : ''

    const sortBy = searchParam?.split('=')[1];

    const fetchContent = (isLoadMore = false)=>{
        setIsError(null);
        if(isLoadMore){
            setIsloadingMoreData(true);
        }else {
            setIsLoading(true);
            setContinuation('');
        }

        if(section?.length > 0) {
            fetchChannelApi(`channel/${section}?id=${id}&lang=${lang}${isLoadMore ? `&token=${continuation}` : ''}`)
            .then((data)=>{
                setContinuation(data?.continuation);
                if(isLoadMore){
                    setChannelViveos(prev=> [...prev,...data?.data]);
                }else {
                    setChannelViveos(data?.data);
                    document.title = data.meta.title + `_${section}`;
                }

            })
            .catch((error)=>{
              setIsError(error);
            })
            .finally(()=> {
                setIsLoading(false);
                setIsloadingMoreData(false);
            })
        }
    };

     useEffect(fetchContent,[lang,searchParam,section]);


    const navigate = useNavigate();

    const handleSortBy = (searchParam)=>{
           navigate(`?sort_by=${searchParam}`);
    };

    const class_active =  `active back-act-c-${theme}-3 border-c-${theme}-6`;
    const class_name = `back-color-${theme}-1 back-hov-c-${theme}-2`

    return (
       
        <div className='channel-videos ' > 
            {
                section !== 'community' &&
                <nav className='sort-by'>
                    <ul className={`t-color-${theme}`}>
                        <li 
                            className={`${sortBy === 'newest' || sortBy ===  'date_added' ? class_active  :''} ${class_name} `}
                            onClick={()=> handleSortBy(section === 'playlists' ?'date_added' : 'newest')}
                            >
                                { section === 'playlists' ? dateAdded : latest}
                        </li>
                        <li 
                            className={`${sortBy === 'popular' || sortBy ===  'last_video_added' ? class_active  :''} ${class_name} `}
                            onClick={()=> handleSortBy(section === 'playlists' ?'last_video_added' : 'popular')}
                            >
                                {section === 'playlists' ? lastVideoAdded : popular}
                        </li>
                        {
                            section !== 'shorts' && section !== 'playlists' &&
                            <li 
                                className={`${sortBy === 'oldest' ?  class_active  :''} ${class_name} `}
                                onClick={()=> handleSortBy('oldest')}
                                >
                                    {oldest}
                            </li>
                        }
                    </ul>
                </nav>
            }
            {
             isError ? <Error error={isError} /> : isLoading ? <FireLoading /> :
              <>
                <ContentContainer 
                    channelViveos={channelViveos}  
                    />


                   {
                     continuation?.length > 0 ?
                      <LoadMoreBtn 
                            onClickHandler={()=> fetchContent(true)} 
                            isLoadingMore={isLoadingMoreData}
                         />
                    :''
                   }
               
              </>
            }

      </div>  
    )
};

export default ChannelContent;