import Search from '../Search/Search';
import './Header.scss';
import Logo from '../Logo/Logo';
import ProfileCreate from './ProfileCreate';

const Header = ()=> {

    return (
        <header className="main-header">
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