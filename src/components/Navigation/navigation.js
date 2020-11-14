import React from 'react';
import './navigation.css'

const Navigation = ({onRouteChange, route}) => {
    if(route === "home") {
        return (
            <nav>
            <p id='Sign' className ='f3 link dim black pointer' onClick={() => onRouteChange('signin')}> Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav>
            </nav>
        )
    }

}

export default Navigation;