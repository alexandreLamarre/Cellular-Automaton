import React from "react";
import Neighbors from "./Neighbors.js";
// import "reinvented-color-wheel/css/reinvented-color-wheel.min.css";
// import ReinventedColorWheel from "reinvented-color-wheel";
import {v4 as uuidv4} from "uuid";

import "./Rules.css";

class Rules extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      color_state: false,
      range: 1,
      dimension: this.props.dimension,
      color: 0,
      id: uuidv4(),
      type: this.props.type,
      input_id: 0,
    }
    this.neighbors = React.createRef();
    this.parent = this.props.parent;
    console.log("rules id", this.state.id);
  }


  componentDidMount(){
    // CREATE COLOR WHEEL
    // var colorWheel = new ReinventedColorWheel({
    // // appendTo is the only required property. specify the parent element of the color wheel.
    // appendTo: document.getElementById("colorwheel"+this.state.id),
    //
    // // followings are optional properties and their default values.
    //
    // // initial color (can be specified in hsv / hsl / rgb / hex)
    // hsv: [0, 100, 100],
    // // hsl: [0, 100, 50],
    // // rgb: [255, 0, 0],
    // // hex: "#ff0000",
    //
    // // appearance
    // wheelDiameter: 200,
    // wheelThickness: 20,
    // handleDiameter: 16,
    // wheelReflectsSaturation: true,
    //
    // // handler
    // onChange: function (color) {
    //   // the only argument is the ReinventedColorWheel instance itself.
    //   // console.log("hsv:", color.hsv[0], color.hsv[1], color.hsv[2]);
    //   },
    // })
    var input_id = this.state.input_id;
    const input_rules = [];
    console.log("rules dimension", this.state.dimension);
    if(this.state.type === "Elementary"){
      for(var i = 0; i < this.state.dimension; i++){
        const numberRules = [];
        for(var j = 0; j < 256; j++){
          numberRules.push(<option key = {j.toString()} value = {j.toString()}> {j} </option>);
        }
        input_rules.push(<InputRule
                          key = {input_id++}
                          numberRules = {numberRules}
                          label = "Rules"
                          default = "0"
                          id = {i}
                          ></InputRule>);
      }
      console.log("input rules", input_rules);
    }
    else if(this.state.type === "Totallistic"){
      input_rules.push(<InputRule
                        key = {input_id++}
                        label = "Code"
                        default = "0"
                        id = {this.state.id}
                        ></InputRule>);
    }
    else{
      input_rules.push(<InputRule
                        key = {input_id++}
                        label = "Code"
                        id = {this.state.id}
                        default = "Copy custom code here"
                        ></InputRule>);
    }
    this.setState({input_rules: input_rules, input_id: input_id})
  }


  updateRules(range, dimension, color){
    const new_range = (range === null || range === undefined)? this.state.range:
                                                                          range;
    const new_dimension = (dimension === null || range === undefined)?
                                                  this.state.dimension : dimension;

    const new_color = (color === null || color === undefined)? this.state.color:
                                                                          color;

    this.setState({range: new_range, dimension: new_dimension});
    this.neighbors.current.setState({range: new_range, dimension: new_dimension});
  }

  removeRule(e){
    const rules = this.parent.state.rules;
    for(var i = 0; i < rules.length; i++){
      if(rules[i].props.id === this.props.id) {
        rules.splice(i,1);
        break;
      }
    }

    this.parent.setState({rules:rules})
    // node_to_remove.remove();
  }


  render(){
    return(
      <div id = "rulesContainer"
      className = "rulesContainer">
        <div className = "rules settings">

          <label>Range (r) : </label>
          <select
          onChange = {(e) => this.updateRules(e.target.value, null, null)}
          disabled = {this.state.type === "Elementary"}>
            <option value = "1"> 1 </option>
            <option value = "0"> 0 </option>
            <option value = "2"> 2 </option>
            <option value = "3"> 3 </option>
          </select>
          <button className = "removeButton"
            onClick = {(e) => this.removeRule(e)}
            disabled = {this.state.type === "Elementary"}>
             X
           </button>
          <br/>
          {this.state.input_rules}

          {/*
          <label> Color </label>
          <div id = {"colorwheel"+this.state.id.toString()}> </div>
          */}
          <br></br>
          <br></br>
          <button>
            Advanced Rule Settings
          </button>
          <p> Color </p>
          <div
            id ={"squareColor" + this.state.id}
            className = "squareColor">
          </div>

          <br/>
        </div>
        <Neighbors
        ref = {this.neighbors}
        range = {this.state.range}
        dimension = {this.state.dimension}/>
      </div>
    )
  }
}

export default Rules;

class InputRule extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      numberRules: this.props.numberRules,
      label: this.props.label,
      default: this.props.default,
      id: this.props.id,
    }
    console.log("props passed to input rules", this.props)
  }

  render(){
    // console.log(this.state.numberRules)
    return (
      <div className = "inputRules">
        <label> {this.state.label} </label>
        <input id = {"automatonRules" + this.state.id}
          list = "numberRules"
          placeholder = {this.state.default}>
        </input>
        <datalist id= "numberRules">
          {this.state.numberRules}
        </datalist>
      </div>
    )
  }
}
