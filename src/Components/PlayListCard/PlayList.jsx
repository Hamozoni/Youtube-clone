import './PlayList.scss';
import { Link } from 'react-router-dom';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import { useContext } from 'react';
import { lang } from '../../Utils/language';

const Playlist = ({playlist,i})=> {
     
    const { isDark, isEng } = useContext(isThemeDark);

    return (
        <div key={i} className="playlist-card">
        <div className="playlist-img">
            <Link to={`/playlist/${playlist?.playlistId}`} className='p-img'>
                    <img src={playlist?.thumbnail[1]?.url || playlist?.thumbnail[0]?.url} alt={playlist?.channelTitle} /> 
            </Link>
            <Link to={`/playlist/${playlist?.playlistId}`} className='count'>
                <h5>{playlist?.videoCount}</h5>
                <PlaylistPlayIcon />
            </Link>
        </div>          
        <div className="p-t-box">
            <h4 className="p-l-title"
                style={{color: Theme[isDark].primaryColor}}
                >
                {playlist?.title?.length > 53 ? playlist?.title.slice(0,53) + '...' :  playlist?.title}
            </h4>
            {playlist?.publishedTimeText?.length > 3  &&
             <h5 className="type" style={{color: Theme[isDark].lightBlColor}}>
                {playlist?.publishedTimeText}
            </h5>}
            {playlist?.channelTitle &&
             <h5 className="type" style={{color: Theme[isDark].blueColor}} >
                {playlist?.channelTitle}
            </h5>}
            <h5 className="v-count type" style={{color: Theme[isDark].lightPrColor}}>
                {playlist?.videoCount} {lang[isEng].video}
            </h5>
        </div>
    </div>
    );
};

export default Playlist;