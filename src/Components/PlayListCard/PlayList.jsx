import './PlayList.scss';
import { Link } from 'react-router-dom';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import { useContext } from 'react';
import { language } from '../../Utils/language';

const Playlist = ({playlist, shorts, renderFrom})=> {
     
    const { isDark, lang } = useContext(isThemeDark);
    const { playlistId, thumbnail, channelTitle, videoCount, title, publishedTimeText} = playlist

    return (
        <div className={`${renderFrom} playlist-card`}>
            <div className="playlist-img">
                <Link to={{pathname:`/playlist/${playlistId}`, shorts}} className='p-img'>
                        <img src={thumbnail[1]?.url || thumbnail[0]?.url} alt={channelTitle} /> 
                </Link>
                <Link to={`/playlist/${playlistId}`} className='count'>
                     <PlaylistPlayIcon />
                    <h5> {videoCount?.replace("videos",'') + " " + language[lang]?.videos} </h5>
                </Link>
            </div>          
            <div className="p-t-box">
                <h4 className="p-l-title"
                    style={{color: Theme[isDark].primaryColor}}
                    >
                    {title?.length > 53 ? title.slice(0,53) + '...' :  title}
                </h4>
                { publishedTimeText?.length > 3  &&
                <h5 className="type" style={{color: Theme[isDark].lightBlColor}}>
                    {publishedTimeText}
                </h5>}
                {channelTitle &&
                <h5 className="type" style={{color: Theme[isDark].blueColor}} >
                    {channelTitle}
                </h5>}
                <h5 className="v-count type" style={{color: Theme[isDark].lightPrColor}}>
                    {videoCount} {language[lang].video}
                </h5>
            </div>
        </div>
    );
};

export default Playlist;