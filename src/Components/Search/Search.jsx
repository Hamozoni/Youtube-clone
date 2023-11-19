import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardVoiceSharpIcon from '@mui/icons-material/KeyboardVoiceSharp';

import './Search.scss';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import { language } from '../../Utils/language';

const Search = ()=> {

      const { isDark, lang } = useContext(isThemeDark);
      const [isMobSerch,setIsMobSearch] = useState(false);
       
      const navgate = useNavigate()

      const [serchTrem,setSearchTerm] = useState('');
      const searchInput = document.getElementById('search-id')

      const handlSearch = (e)=>{
           e.preventDefault();
           searchInput.focus();
           if(serchTrem.length) {
              navgate(`/search/${serchTrem}`);  
           }
           if(window.innerWidth < 668){
             setIsMobSearch(!isMobSerch);
           }
      };

      return (
        <div className="header-search">
            <form className={isMobSerch ? 'active': ''}>
                <input value={serchTrem}
                      id='search-id'
                      type="search" className={isDark === 0 ? 'light search-input' :'search-input'} 
                      placeholder={`${language[lang].search}...`} 
                      onChange={(e)=> setSearchTerm(e.currentTarget.value) } 
                  />
                  <button className='search-btn' onClick={ handlSearch } >
                    <SearchOutlinedIcon />
                  </button>
            </form>
            <div className="mike">
               <KeyboardVoiceSharpIcon />
            </div>
        </div>
      );
};

export default Search;