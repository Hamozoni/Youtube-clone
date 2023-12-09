
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {statesContext} from '../../Contexts/statesContext'

const Refinements = ({refinements})=> {

    const {theme} = useContext(statesContext)

    return (
        <div className={`${theme} related-keywords`}>
            <nav className="related-container">
                <ul className={`${theme} taps`}>
                    {
                        refinements?.map((refine,i)=>(
                            <li key={refine + i} className={theme} >
                                <Link to={`/search/${refine}`}>
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