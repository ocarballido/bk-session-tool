import React from 'react';
import Button from '@atoms/Button';
import './styles.scss';

const HeaderActions = () => {
    return (
        <div id="headerActions" class="col">
            <div class="container px-3 d-flex justify-content-between">
                <Button id="btnNewSession">
                    Nueva sesión
                </Button>
            </div>
        </div>
    );
};

export default HeaderActions;