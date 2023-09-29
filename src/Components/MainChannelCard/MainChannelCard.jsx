import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './MainChannelCard.scss';
import { fetchApi } from '../../Utils/FetchApi';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import { lang } from '../../Utils/language';


const MainChannelCard = ({id, direction = 'row'})=> {

    const { isDark, isEng } = useContext(isThemeDark)

    const [channelDetail,setChannelDetail] = useState();

    useEffect(()=>{
            fetchApi(`channel?id=${id}`)
            .then((data)=>{
                setChannelDetail(data?.meta);
            });
    
    },[id])

    return (
        <div className='main-chan-card' style={{flexDirection:direction}}>
            <div className="card" style={{flexDirection:direction}}>
                <Link to={`/channels/${id}`} className='img-l'>
                <img className='chan-img' src={channelDetail?.thumbnail[0]?.url || channelDetail?.thumbnail[1]?.url} alt="" />
                </Link>
                <div className='subsc-title'>
                    <Link to={`/channels/${id}`} className='name-l'>
                        <h3 className='name' style={{color: Theme[isDark].primaryColor}}>
                            {
                            channelDetail?.title ||
                            channelDetail?.channelTitle 
                            }
                        </h3>
                    </Link>
                    <h5 className='subsc'style={{color: Theme[isDark].blueColor}}>
                        {channelDetail?.subscriberCount + ' ' + lang[isEng].subscribers} 
                    </h5>
                </div>

            </div>
            <div className="subscribe">
                    <button className='btn'  onClick={(e)=>{ 
                        if(e.target.classList.contains('subscribed')){
                            e.target.classList.remove('subscribed')
                            e.target.innerText = lang[isEng].subscribe
                        }else {
                            e.target.classList.add('subscribed')
                            e.target.innerText = lang[isEng].subscribed
                        }
                        }
                      }
                    >
                        {lang[isEng].subscribe}
                    </button>
                </div>
        </div>
    );
};

export default MainChannelCard;