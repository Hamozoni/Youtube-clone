
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {statesContext} from '../../Contexts/statesContext'

const Refinements = ({refinements})=> {

    const {theme} = useContext(statesContext);

    const location = useLocation().search.split("?")[1];

    return (
        <div className={`back-color-${theme} related-keywords`}>
            <nav className="related-container">
                <ul className={`${theme} taps`}>
                    {
                        refinements?.map((refine,i)=>(
                            <li 
                                key={refine + i} 
                                className={`${refine === location ? 'active' : ''} back-color-${theme}-1 back-hov-c-${theme}-2  back-act-c-${theme}-3 `} >
                                <Link 
                                    className={`t-color-${theme}-1`}
                                    to={`/search?query=${refine}`}
                                    >
                                    {refine}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
       </div>
    )
}

export default Refinements;