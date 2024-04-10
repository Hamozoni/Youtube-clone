import { useContext, useEffect, useRef, useState } from "react";
import { statesContext } from "../../Contexts/statesContext";
import { ternViewsTo } from "../../Hooks/Constans";

import "./VideoDescribtion.scss";

import moment from "moment";

const VideoDescribtion = ({ videoDetail }) => {
  const { theme, staticData } = useContext(statesContext);
  const [isDesc, setDesc] = useState(true);
  const { showMore, showLess, views } = staticData;
  const { publishDate, description, viewCount } = videoDetail;

  const descArticle = useRef();

  useEffect(() => {
    descArticle.current.innerText = isDesc ? description.slice(0, 90) : description;
  }, [description, isDesc]);

  return (
    <div className={`back-color-${theme}-1 border-c-${theme}-3 views-desc`}>
      <section className="desc-content">
        <header className={`t-color-${theme} desc-head`}>
          <p className="views">
            {ternViewsTo(viewCount)} {views}
          </p>
          <span className="time">{moment(publishDate).fromNow()}</span>
          <span className={`t-color-${theme}-3 super-title`}>{videoDetail?.superTitle}</span>
        </header>
        <div className="desc">
          <article ref={descArticle} className={`t-color-${theme}-1 vid-desc`}></article>
          <h4 className={`t-color-${theme} show-more`} onClick={() => setDesc(!isDesc)}>
            {isDesc ? showMore : showLess}
          </h4>
        </div>
      </section>
    </div>
  );
};

export default VideoDescribtion;
