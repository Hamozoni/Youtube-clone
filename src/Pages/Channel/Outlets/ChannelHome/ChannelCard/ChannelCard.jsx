import React, { useContext } from 'react';
import { statesContext } from '../../../../../Contexts/statesContext';

import "./ChannelCard.scss";

const ChannelCard = ({data}) => {

    const {staticData,theme} = useContext(statesContext);
  return (
    <div className='h-ch-card'>
        <div className="h-ch-image">
            <img className='h-ch-image' src={data?.thumbnail[0]?.url} alt="" />
        </div>
        <div className="h-ch-info">
            <h5 className={`t-color-${theme}-1 ch-n`}>
                {data?.title}
            </h5>
            <h6 className={`t-color-${theme}-3 ch-subsc`}>
                {data?.subscriberCount} {staticData?.subscribers}
            </h6>
            <button className={`t-color-${theme} back-color-${theme}-1 back-hov-c-${theme}-2 subs-btn`}>
                {staticData?.subscribe}
            </button>

        </div>
    </div>
  )
}

export default ChannelCard