import './App.css';
import Slider from './Slider';
import SidebarItem from './SidebarItem';
import Canvas from './Canvas';
import React, { useState} from 'react';

const DEFAULT_OPTIONS=[
  {
    name:'Brightness',
    property:'brightness',
    value:100,
    range:{
      min:0,
      max:200
    },
    unit:'%'
   },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  },
  {
    name: 'Invert',
    property: 'invert',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  }
  
]

function App() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [selectedOptionIndex, setSelectedOptionIndex]= useState(0);
  const [imageUpload, setImageUpload] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const selectedOption = options[selectedOptionIndex];
  //const imgRef = React.useRef('');
  let imgUrl = '';

  function handleSliderChange({ target }) {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: target.value }
      })
    })
  }

  function getImageStyle() {
    const filters = options.map(option => {
      //console.log(`${option.property}(${option.value}${option.unit})`);
      return `${option.property}(${option.value}${option.unit})`
    })

    return { filter: filters.join(' ') }
  }

  const handleChange = e => {
    if (e.target.files.length) {
      console.log(URL.createObjectURL(e.target.files[0]));
      imgUrl=URL.createObjectURL(e.target.files[0])
    }
    console.log(imgUrl);
  };

  const handleUpload =()=> {
   //imgRef.current.style.backgroundImage = `url(${imgUrl})`;
   setImageUpload(true);
   setImgSrc(imgUrl);
   //imgRef.current.style.display="block";
  };
  

  return (
    <div className="container">
      <div className="image-container">
          {/* <div className='main-image' ref={imgRef} style={getImageStyle()}/> */}
          <Canvas styleParam={getImageStyle()} imgSrc={imgSrc} displayProp={imageUpload}/>
            <div className="image-upload" style={imageUpload ? {display:'none'} : {display:'flex'}}>
                <input
                type="file"
                id="upload-button"
                onChange={handleChange}
                />
                <button onClick={handleUpload}>Upload Image</button>
            </div>
      </div>
      
      <div className='sidebar'>
        {
          options.map((option, index)=>{
            return(
              <SidebarItem
              key={index}
              name={option.name}
              active={index === selectedOptionIndex}
              handleClick={()=>setSelectedOptionIndex(index)}
              />
              
            )
          })
        }
      </div>
      <Slider
      min={selectedOption.range.min}
      max={selectedOption.range.max}
      value={selectedOption.value}
      handleChange={handleSliderChange}
      />
    </div>
  );
}

export default App;
