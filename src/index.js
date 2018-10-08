// STEP 1: Import packages
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// STEP 2: Create components
class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Author name='Alex Taguchi' />
        <Time />
        <Clock />
        <Math />
      </div>
    )
  }
}

class Author extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h5>Created by {this.props.name}</h5>
    )
  }
}

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>You visited at {this.state.date.toLocaleTimeString()}</div>
    )
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    setInterval( () => this.setState({date: new Date()}), 1000);
  }

  render() {
    return (
      <div>The time is {this.state.date.toLocaleTimeString()}</div>
    )
  }
}

class Math extends React.Component {
  constructor(props) {
    super(props);
    this.state = {x: '', y: ''};
    this.changeX = this.changeX.bind(this)
    this.changeY = this.changeY.bind(this)
  }

  changeX(event) {
    this.setState({x: event.target.value});
  }

  changeY(event) {
    this.setState({y: event.target.value});
  }

  render() {
    return (
        <div>
          <div>
            First number:
            <input type="text" value={this.state.x} onChange={this.changeX} />
          </div>
          <div>
            Second number:
            <input type="text" value={this.state.y} onChange={this.changeY} />
          </div>
          <Sum numbers={this.state} />
        </div>
    );
  }
}

class Sum extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (Number(this.props.numbers.x) && Number(this.props.numbers.y)) {
      return (
        <div>
          {Number(this.props.numbers.x) + Number(this.props.numbers.y)}
        </div>
      )
    }
    else {return null}
  }
}

// STEP 3: Render top-most component
ReactDOM.render(
  <Welcome/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
