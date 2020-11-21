import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/register/register';

// Importar Clarifai y el codigo para al API
const app = new Clarifai.App({
  apiKey: 'cb504494aeea4e889ed473e9c94cb018'});

// Importar las propiedades para la pagina web
const particleOption ={
    particles: {
      number: {
        value:80,
        density: {
          enable: true,
          value_area: 800 
        }
      },
      line_linked: {
        shadow: {
          enable: true,
          color: "#3CA9D1",
          blur: 5
        }
      }
    }
  }

class App extends Component {
  constructor (){
    super();
    this.state= {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name : '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }


loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name : data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }
})
}

faceLocation = (data) => {
const clariFace = data.outputs[0].data.regions[0].region_info.bounding_box;
console.log(clariFace)
const image = document.getElementById('inputImage');
const Bwidth = Number(image.width);
console.log(Bwidth)
const Bheight = Number(image.height);
console.log(Bheight)
return {
  leftCol: clariFace.left_col * Bwidth,
  topRow: clariFace.top_row * Bheight,
  rightCol: Bwidth - (clariFace.right_col * Bwidth),
  bottomRow: Bheight - (clariFace.bottom_row * Bheight)
}
  }

displayFaceBox = (Bbox) => {
this.setState({box: Bbox});
console.log(Bbox)
}

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onClickChange =() => {
    this.setState({imageUrl: this.state.input});
    app.models.predict({id:'d02b4508df58432fbb84e800597b8959'}, this.state.input)
    .then(response => {
      if(response) {
        fetch('https://murmuring-lake-33449.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
        })
      })
      .then(res => res.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
    }
    this.displayFaceBox(this.faceLocation(response))
  })
}

  onRouteChange = (state) => {
    if (state === 'signin') {
      this.setState({imageUrl:''})
    }
    this.setState({route: state});
  }


  render() {
    const {imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
              params={particleOption}
            />
      <Navigation onRouteChange={this.onRouteChange} route={route}/>
      {route === 'home'
      ?<div>
      <Logo />
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onClickChange={this.onClickChange}/>
      <FaceRecognition box={box} imageUrl={imageUrl}/>
      </div>
      :(
        this.state.route === 'signin'
        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      )      
      }
    </div>
  );
};
};

export default App;
