import React from "react"
import axios from "axios"

const token_temp = window.localStorage.getItem('jwt');
//const user_id = window.localStorage.getItem('id');


export default class ModifyHouse extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      name: props.data.name,
      maxPlaces: props.data.maxPlaces,
      address: props.data.address,
      description: props.data.description
    };
  }


  handleInputName = e => {
    this.setState({ name: e.target.value });
  };
  handleInputMaxPlaces = e => {
    this.setState({ maxPlaces: e.target.value });
  };
  handleInputAddress = e => {
    this.setState({ address: e.target.value });
  };
  handleInputDescription = e => {
    this.setState({ description: e.target.value });
  };

  handleModify = async event => {
    console.log('aaaaa')
    console.log(this.state.id)
    
    const response = await axios.put("http://localhost:3001/user/houses/" + this.state.id + "", {
      name: this.state.name,
      maxPlaces: this.state.maxPlaces,
      address: this.state.address,
      description: this.state.description
    },
      {
        headers: {
          Authorization: token_temp //the token is a variable which holds the token
        }
      }
    )
    this.props.modify("successo")
    return response;

  };


  render() {
    //console.log(this.state.id)
    return (
      <div>
        <div>
          <input
            placeholder={"Inserisci Nome"}
            value={this.state.name}
            onInput={this.handleInputName}
            type={"text"}
            className={"Input"}
          />
        </div>
        <div>
          <input
            placeholder={"Inserisci quanti posti"}
            value={this.state.maxPlaces}
            onInput={this.handleInputMaxPlaces}
            type={"text"}
            className={"Input"}
          />
        </div>
        <div>
          <input
            placeholder={"Inserisci indirizzo"}
            value={this.state.address}
            onInput={this.handleInputAddress}
            type={"text"}
            className={"Input"}
          />
        </div>
        <div>
          <input
            placeholder={"Inserisci descrizione"}
            value={this.state.description}
            onInput={this.handleInputDescription}
            type={"text"}
            className={"Input"}
          />
        </div>
        <div style={{ maxWidth: "120px", margin: "auto" }}>
          <button className={"btnSubmit"} onClick={this.handleModify}>
            Modifica
          </button>
        </div>
      </div>

    );
  }
}
