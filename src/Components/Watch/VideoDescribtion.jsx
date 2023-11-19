import { useContext, useState } from "react";
import { isThemeDark } from "../../Contexts/Theme";
import { language } from "../../Utils/language";
import { Theme } from "../../Utils/Colors";
import { ternViewsTo } from "../../Utils/Constans";

import { Link } from 'react-router-dom';

import moment from "moment";


const VideoDescribtion = ({videoDetail})=>{

    const { isDark, lang } = useContext(isThemeDark);

    const [isDesc,setDesc] = useState(true);

    const {showMore,showLess, views} = language[lang];

    const {publishDate, description, viewCount} = videoDetail;

    const urlTest = /\b(https?:\/\/)?(www.|\w+.)?\w+(.com|.dev|.org|.io|.me|.ly|.to|.co|.fi|.link)\/?\w+?/i;


    return (
        <div className="views-desc">
            <section className="desc-content">
                <header className="desc-head" style={{color: Theme[isDark].blueColor}}>
                    <p className="views">
                        {ternViewsTo(viewCount) } {views}
                    </p>
                    <span className='time'>
                        {moment(publishDate).fromNow()}
                    </span>
               </header>
              <div className="desc" >
                
                {
                    isDesc && description?.length > 180 ? 
                        description?.slice(0,150) :
                        description?.split(/(.\s|-|:\s)/)?.map((desc)=>(
                            urlTest?.test(desc) ? 
                                ( <div >
                                    <Link to={desc} target='blank'>
                                        {desc}
                                    </Link>
                                </div>
                                ) : desc 
                      
                    ))
                }
            <h4 className='show-more' onClick={()=> setDesc(!isDesc)}>
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