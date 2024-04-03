import { useContext, useState } from "react";
import { statesContext } from "../../Contexts/statesContext";


const Keywords = ({filters,onClickHandler})=>{

    const [currentFilter,setCurrentFilter] = useState('');;

    const {theme} = useContext(statesContext);

    return (
        <div className={`${theme} related-keywords home`}>
            <nav className='related-container'>
                <ul className={`${theme} taps`}>
                    {
                        filters?.map((filter,i)=>(
                            <li 
                                className={filter?.filter === currentFilter ? `${theme} active` : `${theme}`}
                                onClick={()=> {
                                if(currentFilter !== filter){ 
                                    setCurrentFilter(filter?.filter)
                                    onClickHandler(filter?.filter);
                                    } 
                                    if( i === 0) {
                                        setCurrentFilter(filter?.filter)
                                        onClickHandler(filter?.filter);
                                    }
                                }}
                                key={filter?.filter}
                                > 
                                    {filter?.filter}
                            </li>
                        ))
                        }
                </ul>
            </nav>
        </div>
    );
};

export default Keywords;