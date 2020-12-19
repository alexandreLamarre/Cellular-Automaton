import React from "react";
import "./AutomataCell.css";
import {v4 as uuidv4} from "uuid";

import Rules from "./Rules.js";


class AutomataCell extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cell_id: 0,
      rows: 50,
      columns:50,
      automaton_type: "1D Elementary Cellular Automaton",
      rules: [],
      height: 0,
      rules_id: 0,
    }
    this.canvas = React.createRef();
  }

  componentDidMount(){
    //setting up states
    const cell_id = uuidv4();
    const rules = this.state.rules;
    const height = document.getElementById("automatonContainer").offsetHeight;
    const rules_id = this.state.rules_id;
    console.log("div height", height);
    rules.push(<Rules type = {this.state.automaton_type}
      key = {rules_id}/>);

    this.setState({cell_id:cell_id, rules: rules, height:height, rules_id:rules_id+1});

    // adding resize event listener
    window.onresize = (e) => this.changeHeight(e);

    //drawing initial grid
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
    const rules = this.state.rules;
    const rules_id = this.state.rules_id;
    rules.push(<Rules type = {this.state.automaton_type} key = {rules_id}/>);
    this.setState({rules:rules, rules_id: rules_id+1});
  }

  changeHeight(e){
    console.log("resizing document");
    const height = document.getElementById("automatonContainer").offsetHeight;
    this.setState({height: height});
  }

  render(){
    return(
      <div id = {"cell_"+this.state.cell_id}
      className = "cell">

        <div id = "automatonContainer"
        onResize = {(e) => this.changeHeight(e)}
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
        style = {{maxHeight: this.state.height}}
        className = "automatonSettings">


          <p className = "settingsType"> {this.state.automaton_type} </p>
          <div id = "rules_list"
               className = "rules_list">
            <div id = "automatonRules">
              {this.state.rules}
            </div>
            <br/>
            <button onClick = {(e) => this.addAutomaton(e)}> Add Cellular Automaton</button>
          </div>
        </div>

      </div>
    )
  }
}

export default AutomataCell;
