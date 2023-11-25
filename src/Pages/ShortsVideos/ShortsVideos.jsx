import './ShortsVideos.scss';
import {useParams} from 'react-router-dom';
import {useContext, useEffect, useState } from 'react';

import {fetchChannelApi} from '../../Utils/FetchApi';
import Loading from '../../Components/Loading/Loading';
import PlayShortCard from './ShortPageComponents/PlayShortCard';
import Error from '../../Components/Error/Error';
import { statesContext } from '../../Contexts/statesContext';



const ShortsVideos = ()=> {

    const {shorts, lang, theme} = useContext(statesContext);
    console.log(shorts)

    const {id} = useParams();
    const [shortInfo,setShortInfo] = useState();
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);
    const [activeSectionId,setActiveSectionId] = useState(id);
   
    useEffect(()=>{
        fetchChannelApi(`shorts/info?id=${activeSectionId}&lang=${lang}`)
        .then((data)=> {
            setShortInfo(data)
            setIsLoading(false)
        })
        .catch((error) => {
            setIsLoading(false);
            setIsError(error);
            console.log(error);

        });

            // fetchChannelApi(`shorts/soundAttribution?id=${id}`)
            // .then((data)=>{
            //     console.log(data);
            //     data?.data?.map((data)=>{
            //           shortHandler(data);
            //     });
            // })
        

},[activeSectionId,lang]);


const handleScrollIntoView = (scrollPosition)=> {
    const sections = document.querySelectorAll('.short-v-container')
    console.log(sections)
    for(let i = 0; i < sections.length; i++){
        if( scrollPosition.scrollTop === sections[i].offsetTop - 60 ){
                setActiveSectionId(sections[i].id);
                console.log(sections[i].id);
        }
    }
}

    return (
        
       <main 
            className={`${theme} short-videos`} 
            onScroll={(e)=> handleScrollIntoView(e.target)}>
            { isError ? <Error error={isError}/>  :  isLoading ? <Loading /> :
            <>
              {shorts?.map((short)=>(
                  'thumbnail' in short &&
                     <PlayShortCard 
                        key={short?.videoId} 
                        active={short?.videoId === activeSectionId} 
                        short={short} 
                        activeShort={short?.videoId === activeSectionId && shortInfo }
                    />
               ))}
            </> 
            }
       </main>
    );
};

export default ShortsVideos;