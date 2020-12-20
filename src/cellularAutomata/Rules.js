import React from "react";
import Neighbors from "./Neighbors.js";
import "reinvented-color-wheel/css/reinvented-color-wheel.min.css";
import ReinventedColorWheel from "reinvented-color-wheel";
import {v4 as uuidv4} from "uuid";

import "./Rules.css";

class Rules extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      color_state: false,
      range: 1,
      dimension: 1,
      color: 0,
      id: uuidv4(),
    }
    this.type = this.props.type;
    this.neighbors = React.createRef();
    this.parent = this.props.parent;
    console.log(this.props.id)
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
    const numberRules = [];
    for(var i = 0; i < 256; i++){
      numberRules.push(<option value = {i.toString()}> {i} </option>);
    }
    this.setState({numberRules:numberRules});
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
    console.log(rules)
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
          <select onChange = {(e) => this.updateRules(e.target.value, null, null)}>
            <option value = "1"> 1 </option>
            <option value = "0"> 0 </option>
            <option value = "2"> 2 </option>
            <option value = "3"> 3 </option>
          </select>
          <button className = "removeButton" onClick = {(e) => this.removeRule(e)}> X </button>
          <br/>
          <label> Rule </label>
          <input id = "automatonRules"
          list = "numberRules"
          defaultValue = "0">
          </input>
          <datalist id= "numberRules">
            {this.state.numberRules}
          </datalist>
          {/*
          <label> Color </label>
          <div id = {"colorwheel"+this.state.id.toString()}> </div>
          */}


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
