import { useContext } from "react";
import { statesContext } from "../../Contexts/statesContext";
import './LoadMoreBtn.scss';

const LoadMoreBtn = ({onClickHandler,isLoadingMore})=>{

    const {theme} = useContext(statesContext);

    return (
        <div className={`${theme} load-more`}> 
            <button  disabled={isLoadingMore} onClick={onClickHandler} >
                {isLoadingMore ? 'loading...':'load more'}
            </button>
        </div>
    );
};

export default LoadMoreBtn;