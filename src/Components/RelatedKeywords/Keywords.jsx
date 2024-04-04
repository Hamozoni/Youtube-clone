import { useContext } from "react";
import { statesContext } from "../../Contexts/statesContext";


const Keywords = ({filters,currentFilter,setCurrentFilter,onClickHandler})=>{


    const {theme} = useContext(statesContext);

    return (
        <div className={`back-color-${theme} related-keywords home`}>
            <nav className='related-container'>
                <ul className={`${theme} taps`}>
                    {
                        filters?.map((filter,i)=>(
                            <li 
                                className={`${filter?.filter === currentFilter ?  'active' : ''}
                                     back-hov-c-${theme}-2 back-color-${theme}-1 back-act-c-${theme}-4 t-color-${theme}`
                                    }
                                onClick={()=> {
                                if(currentFilter !== filter?.filter){ 
                                    setCurrentFilter(filter?.filter)
                                    onClickHandler(filter?.filter,false);
                                    } 
                                    if( i === 0) {
                                        setCurrentFilter(filter?.filter)
                                        onClickHandler(filter?.filter,false);
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