import { useContext, useEffect, useState } from 'react';
import './Home.scss';
import { fetchApi } from '../../Utils/FetchApi';
import Videos from '../../Components/Videos/Videos';
import Loading from '../../Components/Loading/Loading';
import Error from '../../Components/Error/Error';


const Home = ()=> {

    const [videos,setVideos] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=> {
        setIsLoading(true)
        setError(null)
        fetchApi(`search?query=الاخبار`)
        .then((data)=> {
            setVideos(data.data)
            setIsLoading(false);
        })
        .catch((error)=>{
            console.error(error)
            setError(error)
            setIsLoading(false);
        })
    },[])

    return (
        <div className="home">
            <div className="container">
                    {error ? <Error error={error}/>: ( isLoading ? <Loading /> :  <Videos videos={videos} /> )} 
            </div>
        </div>
    );
};

export default Home;