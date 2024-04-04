import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardVoiceSharpIcon from '@mui/icons-material/KeyboardVoiceSharp';

import './Search.scss';
import { statesContext } from '../../Contexts/statesContext';
import { language } from '../../Utils/language';

const Search = ()=> {

      const {theme, lang,isRecording,setIsRecording } = useContext(statesContext);
      const [isMobSerch,setIsMobSearch] = useState(false);
  
      const navgate = useNavigate()

      const [serchTrem,setSearchTerm] = useState('');
      const searchInput = document.getElementById('search-id')

      const handlSearch = (e)=>{
           e.preventDefault();
           searchInput.focus();
           if(serchTrem.length) {
              navgate(`/search?query=${serchTrem}`);  
           }
           if(window.innerWidth < 668){
             setIsMobSearch(!isMobSerch);
           }
      };

      return (
        <div className='header-search'>
            <form className={`${isMobSerch ? 'active' : '' } back-color-${theme} border-c-${theme}-2`}>
                <input value={serchTrem}
                      id='search-id'
                      type="search" 
                      className={`t-color-${theme} search-input`} 
                      placeholder={`${language[lang]?.search}...`} 
                      onChange={(e)=> setSearchTerm(e.currentTarget.value) } 
                  />
                  <button 
                      className={`back-color-${theme}-1 t-color-${theme}-3 search-btn`} 
                      onClick={ handlSearch }
                       >
                    <SearchOutlinedIcon />
                  </button>
            </form>
            <div 
                className={`back-hov-c-${theme}-2 t-color-${theme}-1 mike`} 
                onClick={()=> setIsRecording(!isRecording)}
                >
               <KeyboardVoiceSharpIcon />
            </div>
        </div>
      );
};

export default Search;