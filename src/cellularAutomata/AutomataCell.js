import React from "react";
import "./AutomataCell.css";
import {v4 as uuidv4} from "uuid";
import ReactDOM from "react-dom";

import Rules from "./Rules.js";


class AutomataCell extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cell_id: 0,
      rows: 50,
      columns:50,
      automaton_type: "1D Elementary Cellular Automaton",
    }
    this.canvas = React.createRef();
    this.rule = React.createRef();
    this.rules = [];
    this.rules.push(this.rule);
  }

  componentDidMount(){
    const cell_id = uuidv4();

    this.setState({cell_id:cell_id});

    const ctx = this.canvas.current.getContext("2d");
    let s = Math.min(this.canvas.current.width/this.state.rows,
        this.canvas.current.height/this.state.columns);
    let nX = Math.floor(this.canvas.current.width / s) - 2;
    let nY = Math.floor(this.canvas.current.height / s) - 2;
    let pX = this.canvas.current.width - nX * s;
    let pY = this.canvas.current.height - nY * s;
    let pL = pX / 2;
    let pR = pX / 2;
    let pT = pY / 2;
    let pB = pY / 2;

    ctx.strokeStyle = 'lightgrey'
    ctx.lineWidth = 0.5;
    ctx.beginPath()
    for (var x = pL; x <= this.canvas.current.width - pR; x += s) {
      ctx.moveTo(x+0.5, pT+0.5)
      ctx.lineTo(x+0.5, (this.canvas.current.height - pB)+0.5)
    }
    for (var y = pT; y <= this.canvas.current.height - pB; y += s) {
      ctx.moveTo(pL+0.5, y+0.5)
      ctx.lineTo((this.canvas.current.width - pR)+0.5, y+0.5)
    }
    ctx.stroke()
  }

  regrid(rows, cols){
    console.log(rows)
    const new_rows = (rows === null || rows === undefined)? this.state.rows:
                                                                  parseInt(rows);
    const new_cols = (cols === null || cols === undefined)? this.state.columns:
                                                                  parseInt(cols);
    this.setState({rows: new_rows, columns: new_cols});
    const ctx = this.canvas.current.getContext("2d");
    ctx.clearRect(0,0, this.canvas.current.width, this.canvas.current.height);
    let s = Math.min(this.canvas.current.width/new_rows,
        this.canvas.current.height/new_cols);
    let nX = Math.floor(this.canvas.current.width / s) - 2;
    let nY = Math.floor(this.canvas.current.height / s) - 2;
    let pX = this.canvas.current.width - nX * s;
    let pY = this.canvas.current.height - nY * s;
    let pL = pX / 2;
    let pR = pX / 2;
    let pT = pY / 2;
    let pB = pY / 2;

    ctx.strokeStyle = 'lightgrey'
    ctx.lineWidth = 0.5;
    ctx.beginPath()
    for (var x = pL; x <= this.canvas.current.width - pR; x += s) {
      ctx.moveTo(x+0.5, pT+0.5)
      ctx.lineTo(x+0.5, (this.canvas.current.height - pB)+0.5)
    }
    for (var y = pT; y <= this.canvas.current.height - pB; y += s) {
      ctx.moveTo(pL+0.5, y+0.5)
      ctx.lineTo((this.canvas.current.width - pR)+0.5, y+0.5)
    }
    ctx.stroke()
  }

  addAutomaton(e){
    ReactDOM.render(<Rules type = {this.state.automaton_type}/>,
      document.getElementById("automatonRules"));
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
              <p> Select Preset </p>
              <input list = "presets"></input>
              <datalist id = "presets">
                <option> Wire </option>
              </datalist>
            </div>

            <canvas id = "simulation"
            ref = {this.canvas}
            className = "simulation">
            </canvas>


            <div className = "bottomLabel">
              <p> Rows:</p>
              <input type = "range"
              min = "10"
              max = "100"
              value = {this.state.rows}
              onInput = {(e) => this.regrid(e.target.value, null)}>
              </input>
            </div>
            <div className = "bottomLabel">
              <p> Columns: </p>
              <input type = "range"
              min = "10"
              max = "50"
              value = {this.state.columns}
              onInput = {(e) => this.regrid(null, e.target.value)}>
              </input>
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


          <p className = "settingsType"> {this.state.automaton_type} </p>
          <div id = "automatonRules">
          <Rules ref = {this.rule}/>
          </div>
          <br/>
          <button onClick = {(e) => this.addAutomaton(e)}> Add Cellular Automaton</button>
        </div>

      </div>
    )
  }
}

export default AutomataCell;
