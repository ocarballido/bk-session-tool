import React from 'react';
import Logo from '@assets/7131b3385062f757251c.png';
import './styles.scss';

const HeaderLogo = () => {
    return (
        <div id="headerLogo" class="col-auto">
            <img src={Logo} alt="Bkool" height="60" width="60" />
            <p class="text-white mb-0 me-3 d-none d-sm-inline-block">
                Session Manager
            </p>
        </div>
    );
};

export default HeaderLogo;