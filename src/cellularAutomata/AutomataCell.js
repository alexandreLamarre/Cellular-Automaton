import React from "react";
import "./AutomataCell.css";
import {v4 as uuidv4} from "uuid";

class AutomataCell extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cell_id: 0,
    }
  }

  componentDidMount(){
    const cell_id = uuidv4();
    this.setState({cell_id:cell_id});
  }

  render(){
    return(
      <div id = {"cell_"+this.state.cell_id}
      className = "cell">

        <div id = "automatonContainer"
        className = "automatonContainer">
            <div className = "toplabel1">
              <p> Select Automaton Type</p>
              <input list = "types"></input>
              <datalist id = "types">
                <option> 1D elementary cellular automaton </option>
              </datalist>
            </div>
            <div className = "toplabel2">
              <p> Select Presets </p>
              <input list = "presets"></input>
              <datalist id = "presets">
                <option> Wire </option>
              </datalist>
            </div>

            <canvas id = "simulation"
            className = "simulation">
            </canvas>


            <div className = "bottomLabel">
              <p> Rows </p>
              <input type = "range"></input>
            </div>
            <div className = "bottomLabel">
              <p> Columns </p>
              <input style = {{verticalAlign: "middle"}} type = "range"></input>
            </div>
            <div className = "bottomLabel">
              <p> k-Color </p>
              <input list = "available-colors"></input>
              <datalist id= "available-colors">
                <option> This should show the available automaton colors </option>
              </datalist>
            </div>
        </div>

        <div id = "automatonSettings"
        className = "automatonSettings">
          <button> Add Cellular Automaton</button>
        </div>

      </div>
    )
  }
}

export default AutomataCell;
