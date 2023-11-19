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
                    <h4 className="auth-name" style={{color: Theme[isDark].blueColor}}>
                        {authorText}
                    </h4>
                    <span className="time" 
                        style={{color: Theme[isDark].lightBlColor}}
                        >
                        {moment(publishedAt).fromNow()}
                    </span>
                    <p className="comment"
                        style={{color: Theme[isDark].lightPrColor}} 
                        >
                        {textDisplay}
                    </p>
                    <div className="like-dislike-btn">
                        <button 
                            style={{color: Theme[isDark].lightBlColor}} 
                            >
                            <ThumbUpAltOutlinedIcon />
                            {likesCount}
                        </button>
                        <button 
                            style={{color: Theme[isDark].lightBlColor}}
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