
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';


import { ternViewsTo } from '../../Utils/Constans';


import { Theme } from '../../Utils/Colors';

import { language } from '../../Utils/language';
import { useContext, useState } from 'react';
import { isThemeDark } from '../../Contexts/Theme';


const WatchButtons = ({like})=>{

    const { isDark,lang } = useContext(isThemeDark);

    const [isMoreBtn,setIsMoreBtn] = useState(false)

    const {save, download , share, clip, report} = language[lang];

    const Btn = ({text, Icon, clName = 'box btn hide', onClickHanlder})=> {
        return(
            <>
            <button 
                className={clName} 
                style={{backgroundColor: Theme[isDark].whiteColor,color: Theme[isDark].lightBlColor}} 
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
            <button 
            className='box down-btn' 
            style={{backgroundColor: Theme[isDark].whiteColor,color: Theme[isDark].lightBlColor}} 
        >
            <a download 
                rel='nofolow' href='mai.com' 
                className='btn' 
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
        <div className="links-btns-container">
            <div 
                className="like-dis" 
                style={{backgroundColor: Theme[isDark].whiteColor, color: Theme[isDark].lightBlColor}}
                >
                <Btn 
                    text={ like && ternViewsTo(like)} 
                    Icon={<ThumbUpOutlinedIcon />}
                    clName='like-btn btn' 
                />
                <Btn Icon={<ThumbDownOffAltOutlinedIcon />} clName='dis-btn btn' />
            </div>
            <Btn text={share} Icon={<ShareOutlinedIcon />} clName='box btn' />
            <DownloadBtn />
            <MoreBtn />
            <div
                className="more"
               >
                <Btn 
                    Icon={<MoreHorizOutlinedIcon />} 
                    clName="btn"
                    onClickHanlder={()=> setIsMoreBtn(!isMoreBtn)}
                    />
                {
                    isMoreBtn && 
                 <div className="more-btns">
                    <DownloadBtn />
                    <MoreBtn />
                 </div>
                }

            </div>
        </div>
    )
};

export default WatchButtons;