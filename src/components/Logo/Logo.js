import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt';
import oveja from './oveja.png'

const Logo = () =>{
    return(
        <div className='ma4 mt0 pa4'>
<Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
 <div className="Tilt-inner"> <img alt= 'logo' src={oveja} height='130'></img></div>
</Tilt>
        </div>
    );
}

export default Logo;