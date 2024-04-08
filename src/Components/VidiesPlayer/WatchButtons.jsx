import { useContext, useState } from "react";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import OutlinedFlagOutlinedIcon from "@mui/icons-material/OutlinedFlagOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";

import { ternViewsTo } from "../../Lib/Constans";

import { statesContext } from "../../Contexts/statesContext";

import "./WatchButtons.scss";

const WatchButtons = ({ videoDetail }) => {
  const { theme, staticData, dispatch } = useContext(statesContext);

  const [isMoreBtn, setIsMoreBtn] = useState(false);

  const { save, download, share, clip, report } = staticData;

  const Btn = ({ text, Icon, clName = "box btn hide", onClickHanlder }) => {
    return (
      <>
        <button className={`${clName} t-color-${theme}-2 back-color-${theme}-1 back-hov-c-${theme}-2`} onClick={onClickHanlder}>
          {Icon}
          {text && text}
        </button>
      </>
    );
  };

  const DownloadBtn = () => {
    return (
      <button className={`back-color-${theme}-1 back-hov-c-${theme}-2 box down-btn btn`}>
        <a download rel="nofolow" href="mai.com" className={`t-color-${theme}-2 `}>
          <FileDownloadOutlinedIcon />
          {download}
        </a>
      </button>
    );
  };

  const MoreBtn = () => {
    return (
      <>
        <Btn text={clip} Icon={<ContentCutOutlinedIcon />} />
        <Btn text={save} Icon={<SaveOutlinedIcon />} />
        <Btn text={report} Icon={<OutlinedFlagOutlinedIcon />} />
      </>
    );
  };

  return (
    <div className="links-btns-container">
      <div className={`back-color-${theme}-1 t-color-${theme}-2 like-dis`}>
        <Btn onClickHanlder={() => dispatch({ type: "add-to-liked", payload: videoDetail })} text={videoDetail?.likeCount && ternViewsTo(videoDetail?.likeCount)} Icon={<ThumbUpOutlinedIcon />} clName="like-btn btn" />
        |
        <Btn Icon={<ThumbDownOffAltOutlinedIcon />} clName="dis-btn btn" />
      </div>
      <Btn text={share} Icon={<ShareOutlinedIcon />} />
      <DownloadBtn />
      <MoreBtn />
      <div className="more">
        <Btn Icon={<MoreHorizOutlinedIcon />} clName="btn more-btn" onClickHanlder={() => setIsMoreBtn(!isMoreBtn)} />
        {isMoreBtn && (
          <div className={`back-color-${theme}-1 more-btns`}>
            <DownloadBtn />
            <MoreBtn />
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchButtons;
