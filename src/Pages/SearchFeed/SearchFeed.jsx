import './SearchFeed.scss';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Videos from '../../Components/Videos/Videos';
import { fetchApi } from '../../Utils/FetchApi';
import Loading from '../../Components/Loading/Loading';
import Error from '../../Components/Error/Error';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import { lang } from '../../Utils/language';

const SearchFeed = ()=> {
    const { isDark, isEng } =useContext(isThemeDark)
    const [videos,setVideos] = useState();
    const [ispending,setIsPending] = useState(true);
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState();

    const { word } = useParams();

    useEffect(()=> {
        window.scrollTo(0,0);
        setIsError(false);
        setIsPending(true);
        fetchApi(`search?query=${word}`)
        .then((data)=> {
            setVideos(data.data);
            setIsPending(false)
        })
        .catch((error)=>{
            setIsError(true);
            setError(error);
        })
    },[word])
    return (
        isError ? <Error error={error} /> :
        <div className="search-feed">
            <h3 style={{color: Theme[isDark].lightPrColor}}>{lang[isEng].videos}</h3>
            {ispending ? <Loading /> :<Videos videos={videos} />}
        </div>
    );
};

export default SearchFeed;