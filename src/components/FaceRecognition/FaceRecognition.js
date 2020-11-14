import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) =>{
    return(
        <div className = 'centro'>
        <div className = 'absolute mt2'>
            <img id='inputImage' className = 'imagen' alt='' src={imageUrl}></img>
            <div className='bounding' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
        </div>
    );
}

export default FaceRecognition;
