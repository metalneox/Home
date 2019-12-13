import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import axios from 'axios';
var validator = require("email-validator");

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      errFirstname: '',
      errLastname: '',
      errEmail: '',
      errPassword: ''
    }
  }

  handleSignUp = async event => {
    let error = false
    this.setState({   
      errFirstname: '',
      errLastname: '',
      errEmail: '',
      errPassword: ''
    })

    if(this.state.firstname == '' || this.state.firstname == undefined){
      this.setState({
        errFirstname: 'FirstName vuoto o sbagliato'
      })
      error = true;
    }

    if(this.state.lastname == '' || this.state.lastname == undefined){
      this.setState({
        errLastname: 'LastName vuoto o sbagliato'
      })
      error = true;
    }

    if(!validator.validate(this.state.email)){
      this.setState({
        errEmail: 'Email Invalida'
      })
      error = true;
    }

    if(this.state.password == '' || this.state.password == undefined){
      this.setState({
        errPassword: 'Password vuota o sbagliata'
      })
      error = true;
    }

    if(!error){
      const result = await axios.post("http://localhost:3001/auth/signup", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      });
  
      this.setState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',      
        errFirstname: '',
        errLastname: '',
        errEmail: '',
        errPassword: ''
      })
  
      alert("Registrazione compiuta con successo")
      console.log(result.data.jwt)
  
      return result;
    }

  };

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.sector}>
          <Text style={styles.text}>FirstName</Text>
          <TextInput style={styles.input} placeholder="Inserisci Nome" onChangeText={(text) => {
            this.setState({
              firstname: text
            })
          }} value={this.state.firstname}
          />
        </View>
        {!(this.state.errFirstname == "") ? (
          <View style={styles.err}>
            <Text>{this.state.errFirstname}</Text>
          </View>
        ) : null}

        <View style={styles.sector}>
          <Text style={styles.text}>Lastname</Text>
          <TextInput style={styles.input} placeholder="Inserisci cognome" onChangeText={(text) => {
            this.setState({
              lastname: text
            })
          }} value={this.state.lastname}
          />
        </View>
        {!(this.state.errLastname == "") ? (
          <View style={styles.err}>
            <Text>{this.state.errLastname}</Text>
          </View>
        ) : null}
        <View style={styles.sector}>
          <Text style={styles.text}>Email</Text>
          <TextInput style={styles.input} placeholder="Inserisci Email" onChangeText={(text) => {
            this.setState({
              email: text
            })
          }} value={this.state.email}
          />
        </View>
        {!(this.state.errEmail == "") ? (
          <View style={styles.err}>
            <Text>{this.state.errEmail}</Text>
          </View>
        ) : null}
        <View style={styles.sector}>
          <Text style={styles.text}>Password</Text>
          <TextInput secureTextEntry={true} style={styles.input} placeholder="Inserisci Password" onChangeText={(text) => {
            this.setState({
              password: text
            })
          }} value={this.state.password}
          />
        </View>
        {!(this.state.errPassword == "") ? (
          <View style={styles.err}>
            <Text>{this.state.errPassword}</Text>
          </View>
        ) : null}
        <View style={styles.button}>
          <Button title="Registrati" onPress={this.handleSignUp} />
        </View>
      </View>
    )
  }
}

/*
<Button onPress={()=>{
  alert(this.state.ca + ',' +this.state.campo2)
}} title="Registrati" />
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sector:{
    marginTop: '10px',
    marginBottom: '10px'
  },
  text:{
    fontWeight: 'bold',
    marginBottom: '10px',
    alignSelf: 'center'
  },
  err:{
    borderWidth: '1px',
    width: '200px',
    padding: '10px',
    borderColor: 'red',
    backgroundColor: 'pink'
  },
  input:{
    borderWidth: '1px',
    width: '200px',
    padding: '10px',
    borderColor: 'grey'
  },
  button: {
    width: '150px',
    padding: '10px',
    marginTop: '20px'
  }
});
