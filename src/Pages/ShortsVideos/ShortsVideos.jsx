import './ShortsVideos.scss';
import {useParams} from 'react-router-dom';
import {useContext, useEffect, useState } from 'react';

import {fetchChannelApi} from '../../Utils/FetchApi';
import Loading from '../../Components/Loading/Loading';
import PlayShortCard from './ShortPageComponents/PlayShortCard';
import Error from '../../Components/Error/Error';
import { isThemeDark } from '../../Contexts/Theme';



const ShortsVideos = ()=> {

    const {shorts} = useContext(isThemeDark);
    console.log(shorts)

    const {id} = useParams();
    const [shortInfo,setShortInfo] = useState();
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);
    const [activeSectionId,setActiveSectionId] = useState(id);
   
    useEffect(()=>{
        fetchChannelApi(`shorts/info?id=${activeSectionId}`)
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
        

},[activeSectionId]);


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
            className="short-videos" 
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
            {/* <div className={isCommets ?"comments active" :"comments"}>
                <div className="comm-container" 
                    style={{backgroundColor: Theme[isDark].whiteColor}}
                    >
                    <header className="comm-head" 
                        style={{color: Theme[isDark].lightPrColor}}
                        >
                        <h5> {shortVideo?.commentCount} {language[lang].comments} </h5>
                        <ClearIcon onClick={()=> setIsComments(false) } />
                    </header>
                    <div className="comm-wrapper" >
                         {isComLoading ? <Loading /> :
                          <Comments comments={commets} /> }
                    </div>
                </div>
            </div>    */}
       </main>
    );
};

export default ShortsVideos;