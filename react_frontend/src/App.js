import React, { Component } from 'react';
import logo from './hexagon_logo.svg';
import './App.css';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            loading: true,
            nameInput:""
        };
    }

    componentDidMount() {
        this.populatecardData();
    }

    static rendercardsTable(cards) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Card Name</th>
                        <th>Card Color</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map(card =>
                        <tr key={card.cardName}>
                            <td>{card.cardName}</td>
                            <td>{card.cardColor}</td>
                            <td>{card.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
            : App.rendercardsTable(this.state.cards);

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 id="tabelLabel" >Card Table</h1>
                    {contents}
                    <div>
                        <label for="nameInput">Name:</label>
                        <input type="text" id="nameInput" placeholder="Please enter your name:"></input>
                        <button onClick={this.submitButtonClicked}>Submit</button>
                        
                    </div>
                </header>
            </div>
        );
    }

    async populatecardData() {
        const response = await fetch('cardpresentation');
        const data = await response.json();
        this.setState({ cards: data, loading: false });
    }

    async submitButtonClicked() {
        alert('You clicked me');
    }
}