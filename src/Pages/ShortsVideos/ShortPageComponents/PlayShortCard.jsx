import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import ClearIcon from '@mui/icons-material/Clear';

import  ReactPlayer from 'react-player';

import { Theme } from '../../../Utils/Colors';
import { statesContext } from '../../../Contexts/statesContext';
import { language } from '../../../Utils/language';
import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';

const PlayShortCard = ({active, short, activeShort=''})=> {
    const navgate = useNavigate()

    const { theme, lang } = useContext(statesContext);

   return (
    <div className={`${theme} short-v-container`} 
        id={active? activeShort?.videoId : short?.videoId} >
        <div className={`${theme} short-v-player`} >
            <section className={`${theme} short-video`}>
                { active && <h4 className="sh-v-title">
                    {activeShort?.title?.length > 30 ? `${activeShort?.title?.slice(0,30)}...`: activeShort?.title}
                </h4>}
               { active ? 
                 <ReactPlayer 
                    url={`hppts://www.youtube.com/watch?v=${activeShort?.videoId}`} 
                    className='short-player'
                    controls
                    playing
                /> : 
                <img src={short?.thumbnail && short?.thumbnail[0]?.url} alt={short?.title} className="short-player" />
                }
            </section>
            <ul className={`${theme} sh-links-comment`} >
                <li>
                    <ThumbUpIcon /> 
                    <h5> { active ? activeShort?.likeCountText : language[lang].like} </h5>
                </li>
                <li>
                    <ThumbDownIcon /> 
                    <h5> {language[lang].dislike} </h5>
                </li>
                <li 
                //   onClick={commentsHandler}
                   >
                    <CommentIcon />
                    <h5>{ active ? activeShort?.commentCount : language[lang].comments}</h5>
                </li>
                <li>
                    <ShareIcon />
                    <h5>{language[lang].share}</h5>
                </li>
                <li>
                    <MoreVertIcon />
                </li>
                {  active &&
                 <li 
                    onClick={()=> navgate(`/channels/${activeShort?.channelId}`)}
                    >{
                        activeShort?.channelThumbnail &&
                        <img src={activeShort?.channelThumbnail[0]?.url} alt="short" />
                    }
                </li>
                }
            </ul> 
        </div>
    </div>
   )
};

export default PlayShortCard;