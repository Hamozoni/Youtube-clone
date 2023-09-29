import './ShortsCard.scss';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import { useContext } from 'react';

const ShortsCard = ({data})=> {
     const { isDark } = useContext(isThemeDark)

    const navgate = useNavigate();

    return (
        <>
        {data?.map((short,i)=> (
            <div key={i} className="short-card" onClick={()=> navgate(`/short/${short?.videoId}`)}>
            <img src={short?.thumbnail[0]?.url} alt={'channel'} />
            <div className="short-desc">
                <h4 className="short-title" style={{color: Theme[isDark].primaryColor}}>
                     {short?.title?.length > 30 ? `${short?.title.slice(0,30)}...`: short?.title}
                </h4>
                <h6 className="sh-viwes" style={{color: Theme[isDark].lightBlColor}}>
                  {short?.viewCountText}
                </h6>
            </div>
        </div>
     
        ))}
    </>
    );
};

export default ShortsCard;