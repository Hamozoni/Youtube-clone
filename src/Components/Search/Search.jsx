import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardVoiceSharpIcon from '@mui/icons-material/KeyboardVoiceSharp';

import './Search.scss';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Theme } from '../../Utils/Colors';
import { statesContext } from '../../Contexts/statesContext';
import { language } from '../../Utils/language';
import SearchRecorder from '../SearchRecording/SearchRecorder';

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
        <div className={`${theme} header-search`}>
            <form className={isMobSerch ? `active ${theme}`: theme}>
                <input value={serchTrem}
                      id='search-id'
                      type="search" className={`${theme} search-input`} 
                      placeholder={`${language[lang]?.search}...`} 
                      onChange={(e)=> setSearchTerm(e.currentTarget.value) } 
                  />
                  <button className={`${theme} search-btn`} onClick={ handlSearch } >
                    <SearchOutlinedIcon />
                  </button>
            </form>
            <div className={`${theme} mike`} onClick={()=> setIsRecording(!isRecording)}>
               <KeyboardVoiceSharpIcon />
            </div>
        </div>
      );
};

export default Search;