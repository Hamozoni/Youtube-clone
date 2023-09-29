import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import './Search.scss';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import { lang } from '../../Utils/language';
const Search = ()=> {

      const { isDark, isEng } = useContext(isThemeDark);
      const [isMobSerch,setIsMobSearch] = useState(false);
       
      const navgate = useNavigate()

      const [serchTrem,setSearchTerm] = useState('');

      const handlSearch = (e)=>{
       
           e.preventDefault();
           if(serchTrem.length) {
              navgate(`/search/${serchTrem}`);   
           }
           setSearchTerm('');
           setIsMobSearch(false)
      };

      return (
        <div className="search">
            <form className={isMobSerch ? 'active': ''} style={{backgroundColor: Theme[isDark].whiteColor}} >
                <input value={serchTrem}
                      onFocus={()=>  setIsMobSearch(true)}
                      type="text" className={isDark === 0 ? 'light search-input' :'search-input'} 
                      placeholder={`${lang[isEng].search}...`} 
                      onChange={(e)=> setSearchTerm(e.currentTarget.value) } 
                    />
                  <button className='search-btn' onClick={ handlSearch } >
                    <YoutubeSearchedForIcon />
                  </button>
            </form>
        </div>
      );
};

export default Search;