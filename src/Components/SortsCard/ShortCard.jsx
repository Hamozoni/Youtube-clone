import { useNavigate } from 'react-router-dom';
import { statesContext } from '../../Contexts/statesContext';
import { useContext } from 'react';

import './ShortsCard.scss';

const ShortCard = ({short,shorts})=> {

    const { theme, setShorts } = useContext(statesContext);

    const navgate = useNavigate();

    const clickHandler = ()=> {
         
        setShorts(shorts.map((short)=>{
          if('thumbnail' in short){
            return short
          } else {
            return;
          }
        }));

        navgate(`/short/${short?.videoId}`)
    }

    return (
        <div 
            className='short-card'
            onClick={clickHandler}
        >
           { short?.thumbnail ?
            <img 
                src={short?.thumbnail[0]?.url} 
                alt={'channel'}
            />: <div></div>}
            <div className="short-desc">
                <h4 
                    className={`${theme} short-title`} 
                    >
                    { short?.title?.length > 30 ? `${short?.title.slice(0,30)}...`: short?.title }
                </h4>
                <h6 
                    className={`${theme} sh-viwes`} 
                    >
                    {short?.viewCountText}
                </h6>
            </div>
        </div>
    )
}

export default ShortCard;