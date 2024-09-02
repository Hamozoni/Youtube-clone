import { useContext } from "react";
import Playlist from "../PlayListCard/PlayList";
import VideoCard from "../VideoCard/VideoCard";

import "./style.scss";
import Shorts from "../../Assets/shorts.svg";

import ShortCard from "../SortsCard/ShortCard";
import { statesContext } from "../../Contexts/statesContext";
import { Link } from "react-router-dom";
import SearchChannelCard from "../../Layouts/SearchChannelCard/SearchChannelCard";

const RelatedVideos = ({ elements}) => {
  const { theme } = useContext(statesContext);

  const QueryListing = ({ query }) => {
    return (
      <Link to={`/search?query=${query?.query}`} className={`${theme} query`}>
        <img src={query?.thumbnail[0]?.url} alt={query?.query} />
        <h5 className={`${theme} query-title`}>{query?.query}</h5>
      </Link>
    );
  };

  const list_b_class = `border-c-${theme}-2 listing`;
  const list_t_class = `t-color-${theme} listing-title`;

  return (
    <div className={`${theme} related-videos `}>
      {elements?.map((el, i) =>
        el?.type === "video" ? (
          <VideoCard key={el?.videoId + i} data={el}  />
        ) : el.type === "playlist" ? (
          <Playlist key={el.playlistId + i} playlist={el} />
        ) : el?.type === "shorts_listing" ? (
          <section className={list_b_class }>
            <h5 className={list_t_class }>
              <img src={Shorts} alt="shorts" />
              {el?.title}
            </h5>
            <div className='shorts-container'>
              {el?.data?.map((short, i, shorts) => (
                <ShortCard 
                  key={short?.videoId} 
                  short={short} shorts={shorts}
                  />
              ))}
            </div>
          </section>
        ) : el?.type === "video_listing" ? (
          <section className={list_b_class}>
            <h5 className={list_t_class }>{el?.title}</h5>
            <div className='videos-container'>
              {
                el?.data?.map((el, i) => (
                   <VideoCard key={el?.videoId} data={el} />
                ))
              }
            </div>
          </section>
        ) : el?.type === "query_listing" ? (
          <section className={list_b_class}>
            <h5 className={list_t_class}> {el?.title}</h5>
            <div className='query-container'>
              {el?.data?.map((query, i) => (
                <QueryListing key={query?.query + i} query={query} />
              ))}
            </div>
          </section>
        ) : el?.type === "channel" ?(
          <SearchChannelCard key={el?.channelId} data={el} />
        ) :'',
      )}
    </div>
  );
};

export default RelatedVideos;
