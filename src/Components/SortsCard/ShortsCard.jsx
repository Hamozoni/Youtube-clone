
import { useContext, useEffect, useState } from 'react';
import {fetchChannelApi } from "../../Utils/FetchApi";
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import ShortCard from './ShortCard';
import { statesContext } from '../../Contexts/statesContext';

const ShortsCard = ({id})=> {

    const {lang} = useContext(statesContext);

    const [data,setData] = useState([]);
    const [isEror,setIsError] = useState(null);
    const [isLoading,setLoading] = useState(false);


     
    useEffect(()=>{
            setLoading(true);
            setIsError(null);
            fetchChannelApi(`channel/shorts?id=${id}&sortby=lastdateadded&lang=${lang}`)
            .then((data)=> {
                setLoading(false);
                setData(data?.data);
                console.log(data?.data);
            })
            .catch((error)=> {
                setLoading(false);
                setIsError(error);
            })

    },[id,lang]);

    return (
           
         isEror ? <Error error={isEror} />  :
        isLoading ? <Loading /> :
        data?.map((short,_,arr)=> (
          short?.type === "shorts" ?
          <ShortCard  key={short?.videoId} short={short} shorts={arr} /> :
          <h3>this video is not availble</h3>
        ))

    );
};

export default ShortsCard;