import { useContext } from "react";
import ChannelSubscribeBtn from "../ChannelSubscibeBtn/ChannelSubscribeBtn";
import { statesContext } from "../../Contexts/statesContext";

import "./SreachChannelCard.scss";
import { Link } from "react-router-dom";

const SearchChannelCard = ({data}) => {

    const {staticData,theme} = useContext(statesContext)
  return (
    <div className={`border-c-${theme}-3 s-ch-c`}>
        <Link  to={`/channel/${data?.channelId}`}   className="ch-image">
           <img src={data?.thumbnail[1]?.url || data?.thumbnail[0]?.url} alt={data?.title} />
        </Link>
        <div className="s-ch-info">
            <Link  to={`/channel/${data?.channelId}`}   className={`t-color-${theme}-3 ifo-box`}>
                <h5 className={`t-color-${theme} t`}>
                    {data?.title}
                </h5>
                <p className="u-h">
                    {data?.channelTitle} . {data?.subscriberCount + " " + staticData.subscribers}
                </p>
                <article className="desc">
                    {data?.description}
                </article>

            </Link>
            <ChannelSubscribeBtn />
        </div>
    </div>
  )
}

export default SearchChannelCard