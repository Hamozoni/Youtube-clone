import { useContext, useState } from "react";
import { statesContext } from "../../Contexts/statesContext";
import { language } from "../../Utils/language";
import { ternViewsTo } from "../../Utils/Constans";

import { Link } from 'react-router-dom';

import "./VideoDescribtion.scss"

import moment from "moment";


const VideoDescribtion = ({videoDetail})=>{

    const { theme, lang } = useContext(statesContext);

    const [isDesc,setDesc] = useState(true);

    const {showMore,showLess, views} = language[lang];

    const {publishDate, description, viewCount} = videoDetail;

    const urlTest = /\b(https?:\/\/)?(www.|\w+.)?\w+(.com|.dev|.org|.io|.me|.ly|.to|.co|.fi|.link)\/?\w+?/i;


    return (
        <div className={`${theme} views-desc`}>
            <section className={`${theme} desc-content`}>
                <header className={`${theme} desc-head`} >
                    <p className={`${theme} views`}>
                        {ternViewsTo(viewCount) } {views}
                    </p>
                    <span className={`${theme} time`}>
                        {moment(publishDate).fromNow()}
                    </span>
               </header>
              <div className={`${theme} desc`} >
                
                {
                    isDesc && description?.length > 180 ? 
                        description?.slice(0,150) :
                        description?.split(/(.\s|-|:\s)/)?.map((desc)=>(
                            urlTest?.test(desc) ? 
                                ( <div >
                                    <Link to={urlTest?.test(desc) ? desc :''} target='_blank'>
                                        {desc}
                                    </Link>
                                </div>
                                ) : desc 
                      
                    ))
                }
                <h4 className={`${theme} show-more`} onClick={()=> setDesc(!isDesc)}>
                    { isDesc ?
                        showMore :
                        showLess
                    }
                </h4>
            </div> 
            
        </section>
    </div>
    )
}

export default VideoDescribtion;