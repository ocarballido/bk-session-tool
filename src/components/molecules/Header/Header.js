import React from 'react';
import HeaderLogo from '@atoms/HeaderLogo';
import HeaderActions from '@molecules/HeaderActions';
import './styles.scss';

const Header = () => {
    return (
        <header>
            <nav class="nav-main navbar-dark bg-dark py-2 row align-items-center g-0">
                <HeaderLogo />
                <HeaderActions />
            </nav>
        </header>
    );
};

export default Header;