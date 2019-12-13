import React from "react";
import axios from "axios";

const validator = require("email-validator");

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      errFirstName: '',
      errLastName: '',
      errEmail: '',
      errPassword: '',
    };
  }


  handleInputFirstName = e => {
    this.setState({ firstname: e.target.value });
  };

  handleInputLastName = e => {
    this.setState({ lastname: e.target.value });
  };

  handleInputEmail = e => {
    this.setState({ email: e.target.value });
  };


  handleInputPassword = e => {
    this.setState({ password: e.target.value });
  };

  handleClick = async () => {
    let error = false

    this.setState({
      errFirstName: '',
      errLastName: '',
      errEmail: '',
      errPassword: ''
    })


    if (!validator.validate(this.state.email)) {
      this.setState({
        errEmail: 'Email Invalida'
      })
      error = true;
    }

    if(this.state.firstname == '' || this.state.firstname == undefined){
      this.setState({
        errFirstName: 'FirstName vuota o sbagliata'
      })
      error = true;
    }

    if(this.state.lastname == '' || this.state.lastname == undefined){
      this.setState({
        errLastName: 'LastName vuota o sbagliata'
      })
      error = true;
    }    

    if(this.state.password == '' || this.state.password == undefined){
      this.setState({
        errPassword: 'Password vuota o sbagliata'
      })
      error = true;
    }


    if(!error) {
      const result = await axios.post("http://localhost:3001/auth/signup", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      });
      this.props.signup("login")
      return result;
    };
  }


  render() {
    return (
      <div>
        <div>
          <input
            placeholder={"firstname"}
            value={this.state.firstname}
            onInput={this.handleInputFirstName}
            type={"text"}
            className={"Input"}
          />
        </div>
        {!(this.state.errFirstName == "") ? (
          <div className="errInput">
            {this.state.errFirstName}
          </div>
        ) : null}
        <div>
          <input
            placeholder={"lastname"}
            value={this.state.lastname}
            onInput={this.handleInputLastName}
            type={"text"}
            className={"Input"}
          />
        </div>
        {!(this.state.errLastName == "") ? (
          <div className="errInput">
            {this.state.errLastName}
          </div>
        ) : null}
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
            type={"text"}
            className={"Input"}
          />
        </div>
        {!(this.state.errPassword == "") ? (
          <div className="errInput">
            {this.state.errPassword}
          </div>
        ) : null}
        <div style={{ maxWidth: "120px", margin: "auto" }}>
          <button className={"btnSubmit"} onClick={this.handleClick}>
            SignUp
          </button>
        </div>
      </div>

    );
  }
}
