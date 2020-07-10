import React, {useState} from 'react';
import './Slider.scss';
import Image from './Image.js';

let pos = 1;

function Slider({images, names}) { 
    let urls = {images}.images;
    let artistNames = {names}.names;
    let imgArr = [];
    for(let i = 0; i < 20; i++) {   //resolves the images from their respective URLs
        imgArr.push(<Image className="Image" src={urls[i]}/>);
    }

    const [x, setX] = useState(950);
    const leftSlide = () => {
        if(pos > 1) {
            setX(x + 100);
            pos--;
        }
    };
    const rightSlide = () => { 
        if(pos < imgArr.length) {
            setX(x - 100);
            pos++;
        }
    };

    return(
            <div className="slider">
                {
                    imgArr.map((item, index) => {
                        return(
                            <div key={index} className="slide" style={{transform: `translateX(${x}%)`}}>
                                {item}
                            </div>
                        )
                    })
                }  
                <button id="left" onClick={leftSlide}><p className="btnText">&lt;</p></button>
                <button id="right" onClick={rightSlide}><p className="btnText">&gt;</p></button>
                <p className="txt">{pos}: {artistNames[pos-1]}</p>  
            </div>
    )
}

export default Slider;