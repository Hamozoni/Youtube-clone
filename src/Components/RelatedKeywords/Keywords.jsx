import { useContext, useState } from "react";
import { statesContext } from "../../Contexts/statesContext";


const Keywords = ({filters,onClickHandler,continuation})=>{

    const [currentFilter,setCurrentFilter] = useState('');;

    const {theme} = useContext(statesContext);

    return (
        <nav className={`${theme} related-keywords home`}>
            <ul className={`${theme} taps`}>
                {
                    filters?.map((fil,i)=>(
                        <li 
                            className={fil === currentFilter ? `${theme} active` : `${theme}`}
                            onClick={()=> {
                            if(currentFilter !== fil){ 
                                setCurrentFilter(fil)
                                onClickHandler(false,fil?.continuation);
                                } 
                                if( i === 0) {
                                    setCurrentFilter(fil)
                                    onClickHandler(false,continuation);
                                }
                            }}
                            key={fil?.filter}
                            > 
                                {fil?.filter}
                        </li>
                    ))
                    }
            </ul>
        </nav>
    );
};

export default Keywords;