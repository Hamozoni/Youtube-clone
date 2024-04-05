
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';


import { ternViewsTo } from '../../Utils/Constans';

import { language } from '../../Utils/language';
import { useContext, useState } from 'react';
import { statesContext } from '../../Contexts/statesContext';

import "./WatchButtons.scss";
import { videoDetailsContext } from '../../Pages/Watch/Watch';

const WatchButtons = ()=>{

    const { theme,lang,dispatch } = useContext(statesContext);
    const {videoDetail} = useContext(videoDetailsContext);

    const [isMoreBtn,setIsMoreBtn] = useState(false)

    const {save, download , share, clip, report} = language[lang];

    const Btn = ({text, Icon, clName = 'box btn hide', onClickHanlder})=> {
        return(
            <>
            <button 
                className={`${clName} ${theme}`} 
                onClick={onClickHanlder}
            >
                    {Icon}
                    {text && text}
            </button>
        </>
        )
    }

    const DownloadBtn = ()=>{
        return (
            <button className={`${theme} box down-btn btn`}>
                <a download 
                    rel='nofolow' href='mai.com' 
                    className={`${theme} btn`} 
                    >
                    <FileDownloadOutlinedIcon /> 
                    {download}
                </a>
        </button>
        )
    }

    const MoreBtn = ()=>{
        return (
           <>
             <Btn text={clip} Icon={<ContentCutOutlinedIcon />} />
             <Btn text={save} Icon={<SaveOutlinedIcon />} />
             <Btn text={report} Icon={<OutlinedFlagOutlinedIcon />}/>
            </>
        )
    };

    return (
        <div className={`${theme} links-btns-container`}>
            <div className={`${theme} like-dis btn`} >
                <Btn 
                    onClickHanlder={()=> dispatch({type: 'add-to-liked',payload: videoDetail})}
                    text={ videoDetail?.likeCount && ternViewsTo(videoDetail?.likeCount)} 
                    Icon={<ThumbUpOutlinedIcon />}
                    clName='like-btn btn'
                />
                <Btn Icon={<ThumbDownOffAltOutlinedIcon />} clName='dis-btn btn' />
            </div>
            <Btn text={share} Icon={<ShareOutlinedIcon />} clName='box btn' />
            <DownloadBtn />
            <MoreBtn />
            <div
                className={`${theme} more`}
               >
                <Btn 
                    Icon={<MoreHorizOutlinedIcon />} 
                    clName="btn"
                    onClickHanlder={()=> setIsMoreBtn(!isMoreBtn)}
                    />
                {
                    isMoreBtn && 
                 <div className={`${theme} more-btns`}>
                    <DownloadBtn />
                    <MoreBtn />
                 </div>
                }

            </div>
        </div>
    )
};

export default WatchButtons;