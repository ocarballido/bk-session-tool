import React from 'react';
import './styles.scss';

const Spinner = () => {
    return (
        <div class="bkSpinner">
            <div class="bkSpinner-wrapper mb-2">
                <svg id="spinnerSymbol" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 57">
                    <path class="spinnerPath" stroke="#202020" fill="transparent" stroke-width="8" d="M39.88,24.86s-5.67-6.43-12.7-6.43-13,3.95-14.53,9S5.7,52.23,5.7,52.23H35.86S51.42,22,55.29,14.32,65.79,4.77,69,4.77c5.93,0,13.27,2.45,15.64,11S94.3,52.23,94.3,52.23H53.79l-4.26-7.85"/>
                </svg>
                <svg id="spinnerSymbolStatic" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 57">
                    <path class="spinnerPathStatic" stroke="#e1e1e1" fill="transparent" stroke-width="8" d="M39.88,24.86s-5.67-6.43-12.7-6.43-13,3.95-14.53,9S5.7,52.23,5.7,52.23H35.86S51.42,22,55.29,14.32,65.79,4.77,69,4.77c5.93,0,13.27,2.45,15.64,11S94.3,52.23,94.3,52.23H53.79l-4.26-7.85"/>
                </svg>
            </div>
        </div>
    );
};

export default Spinner;