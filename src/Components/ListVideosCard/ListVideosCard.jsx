import { memo, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ListVideosCard.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";

import { useParams } from "react-router-dom";
import { fetchChannelApi } from "../../Lib/FetchApi";
import { statesContext } from "../../Contexts/statesContext";

import Error from "../../Components/Error/Error";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

const ListVideosCard = () => {
  const { id, plId, index } = useParams();
  const { lang, theme } = useContext(statesContext);
  const navigate = useNavigate();

  const [playListDetails, setPlayListDetails] = useState(null);
  const [ListVideos, setListVideos] = useState(null);
  const [isListClose, setIsListClose] = useState(false);
  const [continuation, setContinuation] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlayListVid = (isLoadMore = false) => {
    setError(null);
    if (isLoadMore) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    fetchChannelApi(`playlist?id=${plId}&token=${continuation}&lang=${lang}`)
      .then((data) => {
        setContinuation(data?.continuation);
        if (isLoadMore) {
          setListVideos((prev) => [...prev, ...data?.data]);
        } else {
          setListVideos(data?.data);
          setPlayListDetails(data?.meta);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoadingMore(false);
      });
  };

  useEffect(fetchPlayListVid, [plId]);

  return error ? (
    <Error error={error} />
  ) : isLoading ? (
    ""
  ) : (
    <div className={`${!isListClose ? "active" : ""} border-c-${theme}-2 list-v-card`}>
      <div className={`back-color-${theme}-1 list-header`}>
        <div className="h-left">
          <h4 className={`t-color-${theme} l-title`}>{playListDetails?.title}</h4>
          <h5 className={`t-color-${theme}-2 owner-channel`}>
            {playListDetails?.channelTitle} - {index} / {playListDetails?.videoCount}
          </h5>
        </div>
        <button className={`t-color-${theme}-3 l-toggle-btn`} onClick={() => setIsListClose(!isListClose)}>
          {isListClose ? <KeyboardArrowDownIcon /> : <ClearIcon />}
        </button>
      </div>
      <div className={`${isListClose ? "hidden" : ""} pl-v-content`}>
        {ListVideos?.map((video) => (
          <div
            onClick={() => {
              navigate(`/watch/${video?.videoId}/list/${plId}/${video?.index}`);
            }}
            key={video?.videoId}
            className={`${id === video?.videoId ? `active back-act-c-${theme}-2 border-c-${theme}-4` : ""} back-hov-c-${theme}-1 pl-card`}
          >
            <div className="lift-img">
              <img src={video?.thumbnail[0]?.url || video?.thumbnail[1]?.url} alt="video" />
              <spa className={`${theme} v-length`}>{video?.lengthText}</spa>
            </div>
            <div className="right-content">
              <h5 className={`t-color-${theme}-1 l-v-title`}>{video?.title?.length > 55 ? `${video?.title.slice(0, 55)}...` : video?.title}</h5>
              <h6 className={`t-color-${theme}-3 l-ch-name`}>{video?.videoOwnerChannelTitle}</h6>
            </div>
          </div>
        ))}
        {continuation?.length > 0 && <LoadMoreBtn onClickHandler={() => fetchPlayListVid(true)} isLoadingMore={isLoadingMore} />}
      </div>
    </div>
  );
};

export default memo(ListVideosCard);
