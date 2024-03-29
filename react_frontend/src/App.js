import React, { Component } from 'react';
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
		this.handleNameInputChange = this.handleNameInputChange.bind(this);
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
					<h1 id="tabelLabel" >Card Table</h1>
					{contents}
					<div>
						<label htmlFor="textInput">Name:</label>
						<input type="text" id="textInput" value={this.state.nameInput} onChange={this.handleNameInputChange} placeholder="Please enter your name and press Enter:" onKeyPress={(event) => {
							if (event.key === "Enter") {
								this.submitButtonClicked();
							}
						}}></input>
						{/*<button onClick={this.submitButtonClicked} value={this.state.nameInput} onChange={this.handleNameInputChange} >Submit</button>*/}
						
					</div>
				</header>
			</div>
		);
	}

	async handleNameInputChange(event) {
		this.setState({ nameInput: event.target.value });
	}

	async populatecardData() {
		const response = await fetch('cardpresentation');
		const data = await response.json();
		this.setState({ cards: data, loading: false });
	}

	async submitButtonClicked(event) {
		//alert('You clicked me');
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: this.state.nameInput,
			//	password: password,
			//	email: email,
			//	role: role
			}),
		};
		console.log("this.state.nameInput:", this.state.nameInput);
		await fetch('cardpresentation', requestOptions)
			.then((response) => response.text())
			.then((data) => {


			});
		this.setState({ nameInput: "" });
	}
}