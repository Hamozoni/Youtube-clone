
import { Link } from 'react-router-dom';

const Refinements = ({refinements})=> {

    return (
        <nav className="related-keywords">
            <ul className='taps'>
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