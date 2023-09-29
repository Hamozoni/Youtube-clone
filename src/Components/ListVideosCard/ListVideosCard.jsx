import './ListVideosCard.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';
import { useContext, useState } from 'react';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';

const ListVideosCard = ({meta, data, setVideoId, listVideoId, id})=> {

    const [isListClose,setIsListClose] = useState(false);
    const { isDark } = useContext(isThemeDark);




    return (
        <div className={!isListClose ? "list-v-card active" :"list-v-card"}
             style={{backgroundColor: Theme[isDark].whiteColor}}
        >
            <div className="list-header">
                <div className="h-left">
                    <h4 className="l-title" style={{color: Theme[isDark].primaryColor}}>
                        {meta?.title}
                    </h4>
                    <h5 className="owner-channel" style={{color: Theme[isDark].blueColor}}>
                        {meta?.channelTitle} - {listVideoId + 1} / {meta?.videoCount}
                    </h5>
                </div>
                <button className='l-toggle-btn'
                        onClick={()=> setIsListClose(!isListClose)}
                        style={{color: Theme[isDark].primaryColor}}
                        >
                   {isListClose ? <KeyboardArrowDownIcon /> : <ClearIcon />}
                </button>
            </div>
            <div className={isListClose ? "pl-v-content hidden" :"pl-v-content"}>
                {data?.map((video,i)=> (
                    <div data-videoid={i}
                        onClick={(e)=> {
                            setVideoId(+e.currentTarget.dataset.videoid); 
                         }}
                        key={video?.videoId} 
                        className={listVideoId === i ?"active pl-card": "pl-card"}
                        style={{backgroundColor: Theme[isDark].tranWhiteColor}}>
                       <div className="lift-img">
                            <img src={video?.thumbnail[0]?.url || video?.thumbnail[1]?.url} alt="" />
                            <spa className="v-length">{video?.lengthText}</spa>
                       </div>
                       <div className="right-content">
                            <h5 className="l-v-title" style={{color: Theme[isDark].primaryColor}}>
                                {video?.title?.length > 55 ? `${video?.title.slice(0,55)}...`: video?.title}
                            </h5>
                            <h6 className="l-ch-name" style={{color: Theme[isDark].lightPrColor}}>
                                {video?.videoOwnerChannelTitle}
                            </h6>
                       </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ListVideosCard;