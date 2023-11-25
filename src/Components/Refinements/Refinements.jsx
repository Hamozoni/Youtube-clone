
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {statesContext} from '../../Contexts/statesContext'

const Refinements = ({refinements})=> {

    const {theme} = useContext(statesContext)

    return (
        <nav className={`${theme} related-keywords`}>
            <ul className={`${theme} taps`}>
                {
                    refinements?.map((refine,i)=>(
                        <li key={refine + i} >
                            <Link to={`/search/${refine}`}>
                                {refine}
                            </Link>
                        </li>
                    ))
                }
            </ul>
       </nav>
    )
}

export default Refinements;