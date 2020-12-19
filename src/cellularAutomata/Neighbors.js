import React from "react";
import "./Neighbors.css";

class Neighbors extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      range: this.props.range,
      dimension: this.props.dimension,
    }
  }

  componentDidMount(){
    
  }

  componentDidUpdate(){

  }

  render(){
    return(
      <div>
      </div>
    )
  }
}

export default Neighbors;
