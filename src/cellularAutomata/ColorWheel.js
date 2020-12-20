import React from "react";
import ReactDOM from "react-dom";
import "./ColorWheel.css";



class ColorWheel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      color: this.props.color,
      id: this.props.id,
      open: false,
      backgroundColor: "#fff",
    }
    this.canvas = React.createRef();

  }

  componentDidMount(){
    const canvas = this.canvas.current;
    const ctx = canvas.getContext("2d");

    var image = new Image(250,250);
    image.onload = () => {
      ctx.drawImage(image,0, 0, image.width, image.height);
      console.log("IMAGE LOADED")
    }
    image.src = "../../public/colorwheel.jpg";
  }

  componentDidUpdate(){
    console.log("open?", this.state.open);
  }

  assignColor(e){
    console.log("clicked color wheel");
  }

  render(){
    console.log("should be root", document.getElementById("automatonContainer"));
    return ReactDOM.createPortal(
      <div className = "modal" style = {{display: this.state.open === true?"block":"none"}}>
        <button className = "closeButton" onClick = {(e) => this.setState({open:false})}> X </button>
        <canvas ref = {this.canvas}
        className = "colorcanvas"
        onClick = {(e) => this.assignColor(e)}></canvas>
        <p> r: g: b: a:</p>
      </div>,
      document.getElementById("automatonContainer"))
  }
}

export default ColorWheel;
