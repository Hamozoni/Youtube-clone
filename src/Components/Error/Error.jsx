import './Error.scss';
import { language } from '../../Utils/language';
import { isThemeDark } from '../../Contexts/Theme';
import { useContext } from 'react';
const Error = ({error})=>{

    const { lang } = useContext(isThemeDark)
    return (
        <div className="error">
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
