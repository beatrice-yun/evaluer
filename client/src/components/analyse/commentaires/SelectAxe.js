import React, { Component } from "react";
// import axios from "axios";

class SelectAxe extends Component {
    state = {
      axes: [],
      selectedAxe: ""
    }
   
    componentDidMount() {
        fetch("http://localhost:5000/api/axes")
        .then((response) => {
          return response.json();
        })
        .then(data => {
          let axeFromAPI = data.map(oneAxe => { return {value: oneAxe._id, display: oneAxe.title, ao: oneAxe.ao} })
          this.setState({ axes: [{value: '', display: '', ao: ''}].concat(axeFromAPI) });
        }).catch(error => {
          console.log(error);
        });
    }
   
    render() {

      return (
        <div>
          <h3>Choisir un axe</h3>
          <select value={this.state.selectedAxe} 
            onChange={(e) => this.setState({selectedAxe: e.target.value})}> {/*appeler ici la fonction qui prend l'ao sélectionné */}

            {this.state.axes.filter(axe => {
              return false;
            }).map((oneAxe) => { 
            return <option key={oneAxe.value} value={oneAxe.value}>{oneAxe.display}</option>})}

          </select>
        </div>
      )
    }
}

export default SelectAxe;