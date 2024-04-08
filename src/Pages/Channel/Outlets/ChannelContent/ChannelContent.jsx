import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { fetchChannelApi } from "../../../../Lib/FetchApi";

import './ChannelContent.scss';
import { statesContext } from "../../../../Contexts/statesContext";
import FireLoading from "../../../../Components/Loading/SpinLoading/SpinLoading";
import Error from "../../../../Components/Error/Error";
import ContentContainer from "./ContentContainer";
import LoadMoreBtn from "../../../../Components/LoadMoreBtn/LoadMoreBtn";



const ChannelContent = ()=>{

    const {lang,staticData, theme} = useContext(statesContext);

    const {id,section} = useParams()
    const {latest, popular, oldest,  dateAdded,lastVideoAdded} = staticData;

    const [channelViveos,setChannelViveos] = useState([]);
    const [continuation,setContinuation] = useState(null);
    const [isLoadingMoreData,setIsloadingMoreData] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);

    const location = useLocation();
    const searchParam = location?.search?.length ? location?.search?.replace('?','&') : ''

    const sortBy = searchParam?.split('=')[1];
    console.log(`channel/${section}?id=${id}&lang=${lang}${searchParam}`)


    const fetchContent = (isLoadMore = false)=>{

        setIsError(null);
        if(isLoadMore){
            setIsloadingMoreData(true);
        }else {
            setIsLoading(true);
        }

        if(section?.length > 0) {
            fetchChannelApi(`channel/${section}?id=${id}&lang=${lang}${searchParam}`)
            .then((data)=>{

                setContinuation(data?.continuation);

                if(isLoadMore){
                    setChannelViveos(prev=> [...prev,...data?.data]);
                }else {
                    setChannelViveos(data?.data);
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
                     continuation?.length &&
                      <LoadMoreBtn 
                            onClickHandler={fetchContent} 
                            isLoadingMore={isLoadingMoreData}
                         />
                   }
               
              </>
            }

      </div>  
    )
};

export default ChannelContent;