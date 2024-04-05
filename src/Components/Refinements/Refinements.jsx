
import { useContext } from 'react';
import {statesContext} from '../../Contexts/statesContext'

const Refinements = ({refinements,onClick})=> {

    const {theme} = useContext(statesContext);

    return (
        <div className={`back-color-${theme} related-keywords`}>
            <nav className="related-container">
                <ul className={`${theme} taps`}>
                    {
                        refinements?.map((refine,i)=>(
                            <li 
                                onClick={()=> onClick(refine,false)}
                                key={refine + i} 
                                className={` back-color-${theme}-1 back-hov-c-${theme}-2 t-color-${theme}-1  back-act-c-${theme}-3 `} >
                                  {refine}
                            </li>
                        ))
                    }
                </ul>
            </nav>
       </div>
    )
}

export default Refinements;