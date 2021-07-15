import React from 'react'

const ImageResizer = ({handleChange}) => {
   
    return (
        <div className="image-resizer-container">
            <input 
            type='range' 
            className='image-resizer'
            min="0"
            max="10"
            onChange={handleChange}/>
        </div>
    )
}

export default ImageResizer
