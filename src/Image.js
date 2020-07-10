import React from 'react';

let imageStyles = {
    width: "100%",
    height: "90vh",
}

function Image({src}) {
    return <img src={src} alt="slide-img" style={imageStyles}></img>
}

export default Image;