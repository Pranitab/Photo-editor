import React from 'react';
import './Slider.css';

const Slider = ({ min, max, value, handleChange }) => {
    return (
        <div className="slider-container">
            <input 
            type='range' 
            className='slider'
            min={min}
            max={max}
            value={value || ''}
            onChange={handleChange}/>
        </div>
    )
}

export default Slider
