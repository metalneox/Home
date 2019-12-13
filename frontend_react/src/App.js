import React from 'react';
//import axios from "axios";
//import ReactDOM from 'react-dom';

import './App.css';

import Houses from "./components/Houses"
import SignUpScreen from "./components/SignUpScreen";
import LoginScreen from "./components/LoginScreen";


export default class App extends React.Component {
	constructor() {
		super();

    this.state = {
      showScreen: "login",
      email: '',
      password: ''
    };
	}

  handleInputEmail = e => {
    this.setState({ email: e.target.value });
    console.log(this.state.email)
  };

  handleInputPassword = e => {
    this.setState({ password: e.target.value });
    console.log(this.state.password)
  };

  routeSignUp = () => {
    this.setState({ showScreen: 'signup' });
  };

  handleSignUp= (data) =>{
    if(data === 'login'){
      this.setState({ showScreen: 'login' });
    }
  }

  //valore di ritorno dall props mandata
  handleLogin = (data) =>{
    if(data === 'logged'){
      this.setState({ showScreen: 'logged' });
    }
  }

  handleLogout = async event => {
    window.localStorage.clear();
    this.setState({ showScreen: 'login' });
  };


  componentDidMount(){
    if(window.localStorage.getItem('jwt') != null){
      this.setState({ showScreen: 'logged' });
    }
  }

  render(){
    return (
      <div>
        {this.state.showScreen === "login" ? (
          <LoginScreen signup={this.routeSignUp} login={this.handleLogin}/>
        ) : null}
        {this.state.showScreen === "signup" ? (
          <SignUpScreen signup={this.handleSignUp}/>
        ) : null}
        {this.state.showScreen === "logged" ? (
          <Houses logout={this.handleLogout}/>
        ) : null}
      </div>
    );
  }

}
