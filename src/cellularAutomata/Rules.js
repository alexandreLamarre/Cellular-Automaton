import React from "react";
import Neighbors from "./Neighbors.js";
import "./Rules.css";

class Rules extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      color_state: false,
      range: 1,
      dimension: 1,
      color: 0,
    }
    this.type = this.props.type;
    this.neighbors = React.createRef();
  }


  componentDidMount(){
    // parse this.props.type into setting range/dimension
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
