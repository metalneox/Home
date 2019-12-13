import React from "react";
import axios from "axios";

const validator = require("email-validator");

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errEmail: '',
      errPassword: ''
    };
  }

  handleInputEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleInputPassword = e => {
    this.setState({ password: e.target.value });
  };

  handleLogin = async () => {
    let error = false

    this.setState({   
      errEmail: '',
      errPassword: ''
    })


    if(!validator.validate(this.state.email)){
      this.setState({
        errEmail: 'Email Invalida'
      })
      error = true;
    }
    
    if(this.state.password == '' || this.state.password == undefined){
      console.log("errore password")
      this.setState({
        errPassword: 'Password vuota o sbagliata'
      })
      error = true;
    }

    // non posta se ci sono errori
    if(!error){
      const result = await axios.post("http://localhost:3001/auth/login", {
        email: this.state.email,
        password: this.state.password
      });

      window.localStorage.setItem('jwt', result.data.jwt);
      window.localStorage.setItem('id', result.data.user.id);
  
  
      this.props.login("logged")
      //return result;

    }
  };

  render() {
    return (
      <div>
        <div>
          <input
            placeholder={"Inserisci email"}
            value={this.state.email}
            onInput={this.handleInputEmail}
            type={"text"}
            className={"Input"}
          />
        </div>
        {!(this.state.errEmail == "") ? (
          <div className="errInput">
            {this.state.errEmail}
          </div>
        ) : null}
        <div>
          <input
            placeholder={"Inserisci un password"}
            value={this.state.password}
            onInput={this.handleInputPassword}
            type={"password"}
            className={"Input"}
          />
        </div>
          {!(this.state.errPassword == '') ? (
            <div className="errInput">
              {this.state.errPassword}
            </div>
          ) : null}
        <div style={{ maxWidth: "120px", margin: "auto" }}>
          <button className={"btnSubmit"} onClick={this.handleLogin}>
            Login
          </button>
        </div>
        <div style={{ maxWidth: "222px", margin: "auto" }}>
          <a href='#' className={"txtSignUp"} onClick={this.props.signup}>
            Registrati
          </a>
        </div>
      </div>

    );
  }
}
