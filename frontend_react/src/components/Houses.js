import React from "react";
import axios from "axios";
import ModifyHouse from "./ModifyHouse"
import AddHouse from "./AddHouse"

//FIX BUG WITH DIDMOUNT PROBABILMENTE
const token_temp = window.localStorage.getItem('jwt');


export default class Houses extends React.Component {

    constructor() {
        super();

        this.state = {
            showScreen: "listhouses",
            DATA: [],
            currentHouse: {},
        };
    }

    async handleDelete(id) {

        let result = window.confirm('Sei sicuro di cancellare questa casa?');

        if (result) {
            const response = await axios.delete("http://localhost:3001/user/houses/" + id + "", {
                headers: {
                    Authorization: token_temp //the token is a variable which holds the token
                },
            }
            )
            this.componentDidMount();
            return response;
        }
    };

    routeModify(currentHouse) {
        this.setState({ currentHouse: currentHouse })
        this.setState({ showScreen: 'modifyhouse' })
    };

    routeAdd = () => {
        this.setState({ showScreen: 'addhouse' })
    };

    handleModify = (risposta) => {
        if (risposta === 'successo') {
            alert("House modificata con successo")
            this.componentDidMount();
            this.setState({ showScreen: 'listhouses' });
        }
    }

    handleAdd = (risposta) => {
        if (risposta === 'successo') {
            alert("House inserita con successo")
            this.componentDidMount();
            this.setState({ showScreen: 'listhouses' });
        }
    }


    async componentDidMount() {
        try {
            const user_id = window.localStorage.getItem('id');
            const response = await axios.get("http://localhost:3001/houses")

            // <li key={item.id}>
            //     <div><strong>Nome:</strong>{item.name}</div>
            //     <div><strong>Posti:</strong>{item.maxPlaces}</div>
            //     <div><strong>Indirizzo:</strong>{item.address}</div>
            //     <div><strong>Descrizione:</strong>{item.description}</div>
            //     {item.fk_users == user_id ? (
            //         <div>
            //             <button onClick={() => this.routeModify(item)}>Modifica</button>
            //             <button onClick={() => this.handleDelete(item.id)}>Cancella</button>
            //         </div>
            //     ) : null}

            // </li>


            const lista = response.data.map((item) =>
                <section key={item.id}>
                    <h1>Casa {item.id}</h1>
                    <ul>
                        <li><strong>Nome:</strong>{item.name}</li>
                        <li><strong>Posti:</strong>{item.maxPlaces}</li>
                        <li><strong>Indirizzo:</strong>{item.address}</li>
                        <li><strong>Descrizione:</strong>{item.description}</li>


                        {item.fk_users === user_id ? (
                            <li>
                                <button onClick={() => this.routeModify(item)}>Modifica</button>
                                <button onClick={() => this.handleDelete(item.id)}>Cancella</button>
                            </li>
                        ) : null}
                    </ul>
                </section>
            );


            this.setState({
                DATA: lista
            })


        } catch (e) {
            console.error(e)
        }
    }



    render() {

        return (
            <div>
                {this.state.showScreen === "listhouses" ? (

                    <ul>
                        <li>
                            <button onClick={this.routeAdd}>Aggiungi Casa</button>
                            <button onClick={this.props.logout}>Logout</button>
                        </li>
                        <li>
                            {this.state.DATA}
                        </li>
                    </ul>
                ) : null}

                {this.state.showScreen === "modifyhouse" ? (

                    <ModifyHouse data={this.state.currentHouse} modify={this.handleModify} />
                ) : null}

                {this.state.showScreen === "addhouse" ? (

                    <section id="task">
                        <h1>Houses</h1>
                        <AddHouse add={this.handleAdd} />
                    </section>
                ) : null}

            </div>
        );
    }
}





