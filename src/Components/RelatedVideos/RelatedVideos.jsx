import { useContext } from "react";
import Playlist from "../PlayListCard/PlayList";
import VideoCard from "../VideoCard/VideoCard";

import "./style.scss";
import Shorts from "../../Assets/shorts.svg";

import ShortCard from "../SortsCard/ShortCard";
import { statesContext } from "../../Contexts/statesContext";
import { Link } from "react-router-dom";
import SearchChannelCard from "../../Layouts/SearchChannelCard/SearchChannelCard";

const RelatedVideos = ({ elements, renderFrom }) => {
  const { theme } = useContext(statesContext);

  const QueryListing = ({ query }) => {
    return (
      <Link to={`/search?query=${query?.query}`} className={`${theme} query`}>
        <img src={query?.thumbnail[0]?.url} alt={query?.query} />
        <h5 className={`${theme} query-title`}>{query?.query}</h5>
      </Link>
    );
  };

  return (
    <div className={`${renderFrom} ${theme} related-videos `}>
      {elements?.map((el, i) =>
        el?.type === "video" ? (
          <VideoCard key={el?.videoId + i} data={el} renderFrom={renderFrom} />
        ) : el.type === "playlist" ? (
          <Playlist key={el.playlistId + i} playlist={el} renderFrom={renderFrom} />
        ) : el?.type === "shorts_listing" ? (
          <section className={`${theme} listing`}>
            <h5 className={`${theme} listing-title`}>
              <img src={Shorts} alt="shorts" />
              {el?.title}
            </h5>
            <div className={`${theme} shorts-container`}>
              {el?.data?.map((short, i, shorts) => (
                <ShortCard key={short?.videoId + i} short={short} shorts={shorts} />
              ))}
            </div>
          </section>
        ) : el?.type === "video_listing" ? (
          <section className={`${theme} listing`}>
            <h5 className={`${theme} listing-title`}>{el?.title}</h5>
            <div className={`${renderFrom} ${theme} videos-container`}>
              {el?.data?.map((el, i) => (
                <VideoCard key={el?.videoId + i} data={el} renderFrom={renderFrom} />
              ))}
            </div>
          </section>
        ) : el?.type === "query_listing" ? (
          <section className={`${theme} listing`}>
            <h5 className={`${theme} listing-title`}> {el?.title}</h5>
            <div className={`${theme} query-container`}>
              {el?.data?.map((query, i) => (
                <QueryListing key={query?.query + i} query={query} />
              ))}
            </div>
          </section>
        ) : el?.type === "channel" ?(
          <SearchChannelCard data={el} />
        ) :'',
      )}
    </div>
  );
};

export default RelatedVideos;
