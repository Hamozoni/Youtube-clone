import { Link } from "react-router-dom";


const QueryListing = ({query})=> {
    return (
        <Link to={`/search/${query?.query}`} className="query">
             <img src={query?.thumbnail[0]?.url} alt={query?.query} />
             <h5 className="query-title">
             {query?.query} 
             </h5>
        </Link>
    );
};

export default QueryListing;