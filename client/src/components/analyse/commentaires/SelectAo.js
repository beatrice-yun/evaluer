import React, { Component } from "react";

class SelectAo extends Component {
    state = {
      ao: [],
      selectedAo: ""
    }
   
    componentDidMount() {
      fetch("http://localhost:5000/api/ao")
        .then((response) => {
          return response.json();
        })
        .then(data => {
          let aoFromAPI = data.map(oneAo => { return {value: oneAo._id, display: oneAo.title} })
          this.setState({ ao: [{value: '', display: ''}].concat(aoFromAPI) });
        }).catch(error => {
          console.log(error);
        });
    }
   
    render() {
      return (
        <div>
          <select value={this.state.selectedAo} 
              onChange={(e) => this.setState({selectedTeam: e.target.value})}>

            {this.state.ao.map((oneAo) => { 
            return <option key={oneAo.value} value={oneAo.value}>{oneAo.display}</option>})}

          </select>
        </div>
      )
    }
}

export default SelectAo;