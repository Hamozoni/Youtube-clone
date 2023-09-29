import './ChannelAbout.scss';
import { Theme } from '../../Utils/Colors';
import { lang } from '../../Utils/language';
import  { isThemeDark } from '../../Contexts/Theme';
import { useContext } from 'react';


const ChannelAbout = ({about})=> {

    const { isDark, isEng } = useContext(isThemeDark)
    return (
        <div className="ch-about-container">
            <div className="desc-det">
                <h5 style={{color: Theme[isDark].primaryColor}}> {lang[isEng].description}</h5>
                <p style={{color: Theme[isDark].lightPrColor}}>
                    {about?.snippet?.description}
                </p>
            </div>
            <div className="stats">
                <h5 style={{color: Theme[isDark].primaryColor}}>{lang[isEng].stats}</h5>
                <div className="joined" style={{color: Theme[isDark].lightPrColor}}>
                    <span>{lang[isEng].joined}</span>    {new Date( about?.snippet?.publishedAt).toDateString() }
                </div>
                <div className="views" style={{color: Theme[isDark].lightPrColor}}>
                    {Number(about?.statistics?.viewCount).toLocaleString()}  <span>{lang[isEng].views}</span>   
                </div>

            </div>
        </div>
    )
}

export default ChannelAbout;