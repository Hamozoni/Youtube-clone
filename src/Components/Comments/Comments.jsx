import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Error from "../../Layouts/Error/Error";
import Comment from "./Comment";

import { statesContext } from "../../Contexts/statesContext";

import { useContext, useEffect, useState } from "react";
import { fetchChannelApi } from "../../Lib/FetchApi";

import "./Comments.scss";
import LoadMoreBtn from "../../Layouts/LoadMoreBtn/LoadMoreBtn";
import FireLoading from "../Loading/SpinLoading/SpinLoading";

const VideoComments = ({ id, fetchQuery, renderedFrom }) => {
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [continuation, setContinuation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isComm, setComm] = useState(true);

  const { staticData, lang, theme } = useContext(statesContext);

  const fetchComments = (isLoadMore = false) => {
    setError(null);
    if (isLoadMore) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }
    fetchChannelApi(`${fetchQuery}?id=${id}&sort_by=newest&lang=${lang}${isLoadMore ? `&token=${continuation}`: ''}`)
      .then((data) => {
        if (isLoadMore) {
          setComments((prev) => [...prev, ...data?.data]);
        } else {
          setComments(data?.data);
          setCommentsCount(data?.commentsCount);
        }
        setContinuation(data?.continuation);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoadingMore(false);
      });
  };

  useEffect(fetchComments, [id, lang, fetchQuery]);

  return error ? (
    <Error error={error} />
  ) : isLoading ? <FireLoading /> : (
    <div className={`${!isComm ? "active" : ''} ${renderedFrom} back-color-${theme}-1 border-c-${theme}-3 comments`}>
      <section className={`border-c-${theme}-2 comment-head`}>
        <h5 className={`t-color-${theme} comm-title`} onClick={() => setComm(!isComm)}>
          {commentsCount} {staticData?.comments}
          {renderedFrom === "watch" && <span className={`${theme} comm-arrows`}>{isComm ? <ExpandMoreIcon /> : <ClearIcon />}</span>}
        </h5>
      </section>
      <div className={`${isComm && "active"} ${renderedFrom} wrapper`}>
        <div className="scroll">
          {
            comments?.map((comment) => (
              <Comment 
                  key={comment?.commentId} 
                  comment={comment} 
                  />
            ))
          }

          { continuation?.length > 0 ?
              <LoadMoreBtn 
                  onClickHandler={() => fetchComments(true)} 
                  isLoadingMore={isLoadingMore} 
                  /> 
              : ''
          }

        </div>
      </div>
    </div>
  );
};

export default VideoComments;
