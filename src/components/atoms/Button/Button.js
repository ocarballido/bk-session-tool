import React from 'react';
import './styles.scss';

export const BUTTON_VARIANT = {
    PRIMARY: 'primary',
    WHITE: 'white'
};

const Button = (props) => {
    const { id, variant = BUTTON_VARIANT.PRIMARY, children } = props;
    return (
        <button id={id} type="button" class={`btn btn-${variant}`}>
            { children }
        </button>
    );
};

export default Button;