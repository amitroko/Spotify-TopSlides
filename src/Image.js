import React from 'react';

let imageStyles = {
    width: "100%",
    //height: "90vh",
    //overflow: "hidden"
    position: "absolute",
    top: "-9999px",
    bottom: "-9999px",
    left: "-9999px",
    right: "-9999px",
    margin: "auto"
}

function Image({src}) {
    return <img src={src} alt="slide-img" style={imageStyles}></img>
}

export default Image;