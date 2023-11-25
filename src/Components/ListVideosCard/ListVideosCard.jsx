import './ListVideosCard.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';
import { useContext, useState } from 'react';
import { Theme } from '../../Utils/Colors';
import { statesContext } from '../../Contexts/statesContext';

const ListVideosCard = ({meta, data, setVideoId, listVideoId, id})=> {

    const [isListClose,setIsListClose] = useState(false);
    const { theme } = useContext(statesContext);

    return (
        <div className={!isListClose ? `${theme} list-v-card active` :`${theme} list-v-card`}>
            <div className={`${theme} list-header`}>
                <div className={`${theme} h-left`}>
                    <h4 className={`${theme} l-title`}>
                        {meta?.title}
                    </h4>
                    <h5 className={`${theme} owner-channel`} >
                        {meta?.channelTitle} - {listVideoId + 1} / {meta?.videoCount}
                    </h5>
                </div>
                <button className={`${theme} l-toggle-btn`}
                        onClick={()=> setIsListClose(!isListClose)}
                        >
                   {isListClose ? <KeyboardArrowDownIcon /> : <ClearIcon />}
                </button>
            </div>
            <div className={isListClose ? `${theme} pl-v-content hidden` :`${theme} pl-v-content`}>
                {data?.map((video,i)=> (
                    <div data-videoid={i}
                        onClick={(e)=> {
                            setVideoId(+e.currentTarget.dataset.videoid); 
                         }}
                        key={video?.videoId} 
                        className={listVideoId === i ?`${theme} active pl-card`: `${theme} pl-card`}
                        >
                       <div className={`${theme} lift-img`}>
                            <img src={video?.thumbnail[0]?.url || video?.thumbnail[1]?.url} alt="" />
                            <spa className={`${theme} v-length`}>{video?.lengthText}</spa>
                       </div>
                       <div className={`${theme} right-content`}>
                            <h5 className={`${theme} l-v-title`}>
                                {video?.title?.length > 55 ? `${video?.title.slice(0,55)}...`: video?.title}
                            </h5>
                            <h6 className={`${theme} l-ch-name`}>
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