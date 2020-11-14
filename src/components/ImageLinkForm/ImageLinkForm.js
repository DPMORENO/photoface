import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onClickChange}) =>{
    return(
        <div>
            <p className="f3">
                This Magic App will detect faces in your pictures. Give it a try.
            </p>
            <div id="box">
                <input type="text" onChange={onInputChange}/>
                <button className = 'button' onClick={onClickChange}> Detect </button>
            </div>
        </div>
    );
}

export default ImageLinkForm;