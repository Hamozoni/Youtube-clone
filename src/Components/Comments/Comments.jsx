import './Comments.scss';
import { ternViewsTo } from '../../Utils/Constans';
import { Link } from 'react-router-dom';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { useContext } from 'react';
import { lang } from '../../Utils/language';

const Comments = ({ comments })=> {

    const { isDark, isEng } = useContext(isThemeDark);
    return (
        <div className="comm-container" > 
          {comments?.map((comment,i)=>(
            <div key={i} className="comment-box">
                <Link to={`/channels/${comment?.authorChannelId}`} >
                   <img className='auther-img' src={comment?.authorProfileImageUrl[0].url || comment?.authorProfileImageUrl[1].url } alt="img" />
                </Link>   
                <div className="auther-desc">
                    <h4 className="auth-name" style={{color: Theme[isDark].blueColor}}>
                        {comment?.authorDisplayName}
                    </h4>
                    <span className="time" style={{color: Theme[isDark].lightBlColor}}>
                        {comment?.publishedTimeText}
                    </span>
                    <p className="comment" style={{color: Theme[isDark].lightPrColor}} >
                        {comment?.textDisplay}
                    </p>
                    <div className="likes">
                        <button style={{backgroundColor: Theme[isDark].whiteColor,color: Theme[isDark].lightBlColor}} >
                            <ThumbUpAltOutlinedIcon />
                            {ternViewsTo(comment?.likesCount)}
                        </button>
                        <button style={{backgroundColor: Theme[isDark].whiteColor,color: Theme[isDark].lightBlColor}} >
                            <ThumbDownOffAltOutlinedIcon />
                        </button>
                        <span className="replies">{comment?.replyCount}{lang[isEng].replies}</span>
                    </div>
    
                </div>
            </div>
          ))}
        </div>

    )
};

export default Comments;