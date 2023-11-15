// Legend.js

import React from 'react';
import colorScheme from './ColorScheme';
import '../styles/main.css'

const Legend = () => {

    return (
        <div>
            <h3>Color Key</h3>
            <ul className="legend" style={{ listStyleType: 'none', padding: 0 }}>
                {Object.entries(colorScheme).map(([bodyPart, color]) => (
                    <li key={bodyPart} className="legend-item">
                        <div className="color-box" style={{backgroundColor: color}}>
                        </div>
                        {bodyPart}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Legend;
