import React,{useState, useRef, useEffect} from 'react';
import './Canvas.css';
import ImageResizer from "./ImageResizer";

var img = new Image();
const Canvas = ({ styleParam,imgSrc,displayProp }) => {
    const canvasRef = useRef(null);
    const [imgParam, setImgParam] = useState({width:700,height:700});
    // const [styleParam, setStyleParam] = useState(styleParam);
    const [imgScaleValue, setImgScaleValue] = useState(10);
    const [context, setContext] = useState(null);
    //console.log(styleParam.filter);
    
   
    
    useEffect(() => {
        img.src = imgSrc;
        const canvas = canvasRef.current;
        setContext(canvas.getContext('2d'));
      // console.log("in start");
        img.addEventListener('load', function() {
            //console.log(img.width, img.height);
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            setImgParam({
                width:img.width,
                height:img.height
            })
            context.filter = styleParam.filter;
            context.drawImage(img, 0, 0, img.width, img.height);
          }, false);
          //console.log("in canvas draw",img,imgParam);
        
      }, [imgSrc, styleParam.filter])

      const downloadImage = (el)=>{
            //context.drawImage(img, 0, 0, imgParam.width*10/imgScaleValue, imgParam.height*10/imgScaleValue);
            const canvas = canvasRef.current;
            var url = canvas.toDataURL("image/png");
            var link = document.createElement('a');
            link.download = 'filename.png';
            link.href = url;
            link.click();
            
      }

      const handleImageSizeChange = (e)=>{
       // console.log("on handle change",e.target.value);
        setImgScaleValue(e.target.value);
    }
    useEffect(() => {
        console.log("img scaleing",imgScaleValue);
        let updatedWidth=(img.width/10)*imgScaleValue;
        let updatedHeight=(img.height/10)*imgScaleValue;
        setImgParam({
            width:updatedWidth,
            height:updatedHeight
        })
       
        
    }, [imgScaleValue])

   
    useEffect(() => {
        
            //console.log("in useeffect");
            if(context){
                //console.log("in useeffect",imgParam.width, imgParam.height);
                context.filter = styleParam.filter;
                context.drawImage(img, 0, 0, imgParam.width, imgParam.height);
            }
    }, [styleParam.filter, context, imgParam])
    
    return (
            <div style={displayProp?{display:'flex'}:{display:'none'}} className="canvasContainer">
                <ImageResizer handleChange={handleImageSizeChange}/>
                <div className="canvasWrapper">
                    <canvas ref={canvasRef} id="myCanvas" width={imgParam.width} height={imgParam.height} />
                </div>
                <button className="downloadBtn" href="" onClick={()=>downloadImage(this)}>Download Image</button>
            </div>
    )
}

export default Canvas;
