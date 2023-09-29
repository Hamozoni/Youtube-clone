import './Error.scss';
import { lang } from '../../Utils/language';
import { isThemeDark } from '../../Contexts/Theme';
import { useContext } from 'react';
const Error = ({error})=>{

    const { isEng } = useContext(isThemeDark)
    return (
        <div className="error">
            <h3>oops {error?.message}</h3>
            <button onClick={()=> window.location.reload()}>{lang[isEng].retry}</button>
        </div>
    );
};

export default Error;
