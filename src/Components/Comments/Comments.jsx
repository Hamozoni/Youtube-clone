import './Comments.scss';
import { ternViewsTo } from '../../Utils/Constans';
import { Link } from 'react-router-dom';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { useContext} from 'react';
import { language } from '../../Utils/language';

import moment from 'moment/moment';

const Comments = ({comment })=> {

    const { isDark, lang } = useContext(isThemeDark);
    const { authorChannelId,
            authorThumbnail, 
            authorText, 
            publishedAt, 
            textDisplay, 
            likesCount, 
            replyCount } = comment

    return (
        <div className="comm-container" > 
            <div className="comment-box">
                <Link to={`/channels/${authorChannelId}`} >
                   <img 
                        className='auther-img' 
                        src={authorThumbnail[0]?.url}
                        alt="img" 
                    />
                </Link>   
                <div className="auther-desc">
                    <h4 className="auth-name">
                        {authorText}
                    </h4>
                    <span className="time" 
                       
                        >
                        {moment(publishedAt).fromNow()}
                    </span>
                    <p className="comment"
                       
                        >
                        {textDisplay}
                    </p>
                    <div className="like-dislike-btn">
                        <button 
                          
                            >
                            <ThumbUpAltOutlinedIcon />
                            {likesCount}
                        </button>
                        <button 
                        
                            >
                            <ThumbDownOffAltOutlinedIcon />
                        </button>
                        <span className="replies" >
                            {replyCount} {language[lang].replies}
                        </span>
                    </div>
    
                </div>
            </div>
        </div>

    )
};

export default Comments;