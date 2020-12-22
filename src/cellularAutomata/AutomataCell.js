import React from "react";
import "./AutomataCell.css";
import {v4 as uuidv4} from "uuid";

import Rules from "./Rules.js";


class AutomataCell extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cell_id: 0,
      cells: 100,
      automaton_type: "Elementary",
      dimension: 1,
      rules: [], //stores each of our React Rules components
      height: 0, //stores height of right div
      rules_id: 0, //keeps track of the next unique id for rules
    }
    this.canvas = React.createRef();
  }

  componentDidMount(){
    //setting up states
    const cell_id = uuidv4();
    const rules = this.state.rules;
    const height = document.getElementById("automatonContainer").offsetHeight;
    const rules_id = this.state.rules_id;
    // console.log("div height", height);
    rules.push(<Rules type = {this.state.automaton_type}
                      parent = {this}
                      dimension= {this.state.dimension}
                      key = {rules_id}
                      id = {"rules" + rules_id.toString()}/>);

    this.setState({cell_id:cell_id, rules: rules, height:height, rules_id:rules_id+1});

    // adding resize event listener
    window.onresize = (e) => this.changeHeight(e);

    const canvas = this.canvas.current;
    console.log("canvas dimensions", canvas.height, canvas.width)
    //drawing initial grid
    // const ctx = this.canvas.current.getContext("2d");
    // let s = Math.min(this.canvas.current.width/this.state.rows,
    //     this.canvas.current.height/this.state.columns);
    // let nX = Math.floor(this.canvas.current.width / s) - 2;
    // let nY = Math.floor(this.canvas.current.height / s) - 2;
    // let pX = this.canvas.current.width - nX * s;
    // let pY = this.canvas.current.height - nY * s;
    // let pL = pX / 2;
    // let pR = pX / 2;
    // let pT = pY / 2;
    // let pB = pY / 2;
    //
    // ctx.strokeStyle = 'lightgrey'
    // ctx.lineWidth = 0.5;
    // ctx.beginPath();
    // for (var x = pL; x <= this.canvas.current.width - pR; x += s) {
    //   ctx.moveTo(x+0.5, pT+0.5)
    //   ctx.lineTo(x+0.5, (this.canvas.current.height - pB)+0.5)
    // }
    // for (var y = pT; y <= this.canvas.current.height - pB; y += s) {
    //   ctx.moveTo(pL+0.5, y+0.5)
    //   ctx.lineTo((this.canvas.current.width - pR)+0.5, y+0.5)
    // }
    // ctx.stroke();
    // ctx.closePath();
  }

  componentDidUpdate(){
    // console.log(this.state);
  }

  // regrid(rows, cols){
  //   // console.log(rows)
  //   const new_rows = (rows === null || rows === undefined)? this.state.rows:
  //                                                                 parseInt(rows);
  //   const new_cols = (cols === null || cols === undefined)? this.state.columns:
  //                                                                 parseInt(cols);
  //   this.setState({rows: new_rows, columns: new_cols});
  //   const ctx = this.canvas.current.getContext("2d");
  //   ctx.clearRect(0,0, this.canvas.current.width, this.canvas.current.height);
  //   let s = Math.min(this.canvas.current.width/new_rows,
  //       this.canvas.current.height/new_cols);
  //   let nX = Math.floor(this.canvas.current.width / s) - 2;
  //   let nY = Math.floor(this.canvas.current.height / s) - 2;
  //   let pX = this.canvas.current.width - nX * s;
  //   let pY = this.canvas.current.height - nY * s;
  //   let pL = pX / 2;
  //   let pR = pX / 2;
  //   let pT = pY / 2;
  //   let pB = pY / 2;
  //
  //   ctx.strokeStyle = 'lightgrey'
  //   ctx.lineWidth = 0.5;
  //   ctx.beginPath()
  //   for (var x = pL; x <= this.canvas.current.width - pR; x += s) {
  //     ctx.moveTo(x+0.5, pT+0.5)
  //     ctx.lineTo(x+0.5, (this.canvas.current.height - pB)+0.5)
  //   }
  //   for (var y = pT; y <= this.canvas.current.height - pB; y += s) {
  //     ctx.moveTo(pL+0.5, y+0.5)
  //     ctx.lineTo((this.canvas.current.width - pR)+0.5, y+0.5)
  //   }
  //   ctx.stroke()
  // }

  regrid(e){
    const canvas = this.canvas.current;
    canvas.style.width = e.target.value;
    canvas.style.height = e.target.value;
    this.setState({cells: e.target.value});
  }

  addAutomaton(e){
    const rules = this.state.rules;
    const rules_id = this.state.rules_id;
    rules.push(<Rules type = {this.state.automaton_type}
                      key = {rules_id}
                      parent = {this}
                      id = {"rules"+rules_id.toString()}
                      dimension = {this.state.dimension}/>);
    this.setState({rules:rules, rules_id: rules_id+1});
  }

  changeHeight(e){
    console.log("resizing document");
    const height = document.getElementById("automatonContainer").offsetHeight;
    this.setState({height: height});
  }


  updateType(e){
    const value = e.target.value;
    const dimension = parseInt(value.match(new RegExp("[0-9]+D{1}"))[0]);
    const type = value.includes("Elementary")? "Elementary":
                 value.includes("Totallistic")? "Totallistic":
                 "Custom";
    //TODO: handle changing rule states and warning screen
            // for unsaved changes if rules have been modified
    const rules = this.state.rules;
    for(var i = 0; i < rules.length; i++){
      // console.log(rules[i]);
    }
    const new_rules = [];
    var rules_id = this.state.rules_id;
    new_rules.push(<Rules type = {type}
                      key = {rules_id}
                      parent = {this}
                      id = {"rules"+rules_id.toString()}
                      dimension = {dimension}/>);
    // console.log("new_rules are", new_rules);
    this.setState({dimension: dimension,
                   automaton_type:type,
                   rules_id: rules_id+1,
                   rules:new_rules});
  }

  updatePreset(e){

  }

  render(){
    return(
      <div id = {"cell_"+this.state.cell_id}
      className = "cell">

        <div id = "automatonContainer"
        className = "automatonContainer">
            <div className = "toplabel1">
              <p> Select Automaton Type</p>
              <select list = "types" onChange = {e => this.updateType(e)}>
                <option value = "1D Elementary">
                1D Elementary Cellular Automata
                </option>

                <option value = "1D Totallistic">
                1D Totallistic Celular Automata
                </option>

                <option value = "1D Custom">
                1D Custom Celular Automata
                </option>

                <option value = "2D Elementary">
                2D Elementary Cellular Automata
                </option>

                <option value = "2D Totallistic"
                disabled = {true}>
                2D Totallistic Celular Automata
                </option>

                <option value = "2D Custom">
                2D Custom Celular Automata
                </option>

                <option value = "3D Elementary">
                3D Elementary Cellular Automata
                </option>

                <option value = "3D Totallistic"
                disabled = {true}>
                3D Totallistic Celular Automata
                </option>

                <option value = "3D Custom"
                disabled = {true}>
                3D Custom Celular Automata
                </option>

              </select>

            </div>
            <div className = "toplabel2">
              <p> Select Rule Preset </p>
              <select onChange = {(e) => this.updatePreset(e)}>
                <option value = "None">
                  None
                </option>
                <option value = "Conway"
                  disabled = {true}>
                 2D Conway's Game of Life
                </option>
                <option value = "Wire"
                  disabled = {true}>
                2D Wire (Electronic Circuits)
                </option>
              </select>

            </div>

            <canvas id = "simulation"
            ref = {this.canvas}
            className = "simulation">
            </canvas>


            <div className = "bottomLabel">
              <p> Cells: {this.state.cells} x {this.state.cells}</p>
              <input type = "range"
              min = "10"
              max = "1000"
              value = {this.state.cells}
              onInput = {(e) => this.regrid(e)}>
              </input>
            </div>
            {/*
            <div className = "bottomLabel">
              <p> Columns: </p>
              <input type = "range"
              min = "10"
              max = "50"
              value = {this.state.columns}>
              </input>
            </div> */}
            <div className = "bottomLabel">
              <button> Zoom </button>
              <br/>
              <button> Browse plugins </button>
              <br/>
              <button> Run </button>
            </div>
            <div className = "bottomLabel">
              <p> k-Color </p>
              <select>
                <option> Black </option>
              </select>
            </div>
        </div>
        <div id = "automatonSettings"
        style = {{maxHeight: this.state.height, minHeight: this.state.height}}
        className = "automatonSettings">


          <p className = "settingsType"> {this.state.dimension}D {this.state.automaton_type} Cellular Automata</p>
          <div id = "rules_list"
               className = "rules_list">
            <div id = "automatonRules">
              {this.state.rules}
            </div>
            <br/>
            <button
            onClick = {(e) => this.addAutomaton(e)}
            className = "addAutomaton"
            disabled = {this.state.automaton_type === "Elementary"}
            > Add Cellular Automaton</button>
            <button>
              Configure Initial Layout
            </button>
          </div>
        </div>

      </div>
    )
  }
}

export default AutomataCell;
