import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketches/p';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      stateSketch : sketch
    };
  }

	render () {
		return (
			<div>
				<P5Wrapper sketch={this.state.stateSketch}/></div>
		);
	}
}



export default App;
