import Search from '../Search/Search';
import './Header.scss';
import Logo from '../Logo/Logo';
import ProfileCreate from './ProfileCreate';
import { useContext, useState } from 'react';
import { statesContext } from '../../Contexts/statesContext';
import AcountSetting from '../AcountSetting/AcountSetting';

const Header = ()=> {

    const {theme} = useContext(statesContext);
    const [isAcountModel,setIsAcountModel] = useState(false);

    return (
        <header className={`back-color-${theme} main-header`}>
            <div className="container">
                <Logo />
                <div className="left-bar">
                    <Search />
                </div>
                <ProfileCreate setIsAcountModel={setIsAcountModel} />
            </div>
            {
                isAcountModel && <AcountSetting setIsAcountModel={setIsAcountModel} />
            }

        </header>
    );
};

export default Header;