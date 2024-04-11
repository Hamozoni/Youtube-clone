import { useContext } from "react";
import ChannelSubscribeBtn from "../ChannelSubscibeBtn/ChannelSubscribeBtn";
import { statesContext } from "../../Contexts/statesContext";

import "./SreachChannelCard.scss";
import { Link } from "react-router-dom";

const SearchChannelCard = ({data}) => {

    const {staticData,theme} = useContext(statesContext)
  return (
    <Link to={`/channel/${data?.channelId}`}  className={`border-c-${theme}-3 s-ch-c`}>
        <div className="ch-image">
           <img src={data?.thumbnail[1]?.url || data?.thumbnail[0]?.url} alt={data?.title} />
        </div>
        <div className="s-ch-info">
            <div className={`t-color-${theme}-3 ifo-box`}>
                <h5 className={`t-color-${theme} t`}>
                    {data?.title}
                </h5>
                <p className="u-h">
                    {data?.channelTitle} . {data?.subscriberCount + " " + staticData.subscribers}
                </p>
                <article className="desc">
                    {data?.description}
                </article>

            </div>
            <ChannelSubscribeBtn />
        </div>
    </Link>
  )
}

export default SearchChannelCard