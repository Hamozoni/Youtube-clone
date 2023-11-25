import './Error.scss';
import { language } from '../../Utils/language';
import { statesContext } from '../../Contexts/statesContext';
import { useContext } from 'react';
const Error = ({error})=>{

    const { lang, theme } = useContext(statesContext)
    return (
        <div className={`${theme} error`}>
            <h3>
                oops {error?.message}
            </h3>
            <button onClick={()=> window.location.reload()}>
                {language[lang].retry}
            </button>
        </div>
    );
};

export default Error;
