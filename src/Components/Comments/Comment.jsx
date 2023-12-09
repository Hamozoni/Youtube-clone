import './Comment.scss';
import { Link } from 'react-router-dom';
import { statesContext } from '../../Contexts/statesContext';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { useContext} from 'react';
import { language } from '../../Utils/language';

const Comments = ({comment })=> {

    const { theme, lang } = useContext(statesContext);
    const { authorChannelId,
            authorThumbnail, 
            authorText, 
            publishedTimeText, 
            textDisplay, 
            likesCount, 
            replyCount } = comment

    return (
        <div className={`${theme} comm-container`} > 
            <div className={`${theme} comment-box`}>
                <Link to={`/channels/${authorChannelId}`} >
                   <img 
                        className='auther-img' 
                        src={authorThumbnail[0]?.url}
                        alt="img" 
                    />
                </Link>   
                <div className={`${theme} auther-desc`}>
                    <h4 className={`${theme} auth-name`}>
                        {authorText}
                    </h4>
                    <span className={`${theme} time`}
                       
                        >
                        {publishedTimeText}
                    </span>
                    <p className={`${theme} comment`}
                        >
                        {textDisplay}
                    </p>
                    <div className={`${theme} like-dislike-btn`}>
                        <button
                            >
                            <ThumbUpAltOutlinedIcon />
                            {likesCount}
                        </button>
                        <button 
                            >
                            <ThumbDownOffAltOutlinedIcon />
                        </button>
                        {
                            replyCount > 0 &&
                            <span className={`${theme} replies`} >
                                {replyCount} {language[lang].replies}
                            </span>
                        }
                    </div>
    
                </div>
            </div>
        </div>

    )
};

export default Comments;