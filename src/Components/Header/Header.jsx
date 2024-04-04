import Search from '../Search/Search';
import './Header.scss';
import Logo from '../Logo/Logo';
import ProfileCreate from './ProfileCreate';
import { useContext } from 'react';
import { statesContext } from '../../Contexts/statesContext';

const Header = ()=> {

    const {theme} = useContext(statesContext)

    return (
        <header className={`back-color-${theme} main-header`}>
            <div className="container">
                <Logo />
                <div className="left-bar">
                    <Search />
                </div>
                <ProfileCreate />
            </div>
        </header>
    );
};

export default Header;