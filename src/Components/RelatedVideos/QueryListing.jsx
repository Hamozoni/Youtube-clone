import { useContext } from "react";
import { Link } from "react-router-dom";

import './Query.scss';

import {statesContext} from "../../Contexts/statesContext"
const QueryListing = ({query})=> {
    const {theme} = useContext(statesContext)
    return (
        <Link to={`/search?query=${query?.query}`} className={`${theme} query`}>
             <img src={query?.thumbnail[0]?.url} alt={query?.query} />
             <h5 className={`${theme} query-title`}>
                   {query?.query} 
             </h5>
        </Link>
    );
};

export default QueryListing;