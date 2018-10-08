# ReactTutorial
Simple example of building a one page React website
---

Create a new React project
```
create-react-app my-react-app
```

Deploy on localhost
```
cd my-react-app
npm start
```

Replace the contents of my-react-app/src/index.js with the following minimal app
```jsx
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
      </div>
    )
  }
}

// STEP 3: Render components
ReactDOM.render(
  <Welcome/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

```
Creating a React app can be boiled down into three steps:
- Import required packages
- Design the component architecture
- Render the components on the DOM

Here we will only make changes to the component structure (STEP 2)

What are components? They are small blocks of code responsible for rendering specific sections of the DOM. Components are organized in a tree-like structure, where the master component that encompasses the entire DOM forms the trunk of the tree. All other components branch out from the master component. In the above case the "Welcome" class is our master component, because it is rendered at the root of the DOM in STEP 3.

In order to communicate with eachother, components receive information from their parent (root) components and pass information down to their child (branch) components in the form of properties, or "props". Therefore, components normally require two methods: A "constructor" method to construct the component based on the props received from the parents, and a "render" method to display the constructed component. Since the "Welcome" class is the master component and doesn't receive any props, it doesn't need a "constructor" method.

Let's make our first child component, which will display the name of the website's author. Add the following below the "Welcome" class
```jsx
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
```
Also, update "Welcome" to include our newly created component
```jsx
class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Author name='Alex Taguchi' />
      </div>
    )
  }
}
```
We passed down 'Alex Taguchi' as a prop to the "Author" class. The constructor of "Author" receives the props, and the "super(props)" calls React.Component to take care of it. React.Component automatically converts the props into an attribute accessible as "this.props.name" (it's called "name", because that's how it was passed down from "Welcome".

What if we want to create a component attribute that's different than the props it receives? These attributes are called "states" and may or may not depend on the props. Let's make a component that (1) is a child of "Welcome", (2) doesn't rely on any props from "Welcome", and (3) creates its own state attribute to disply the time the webpage was opened
```jsx
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
```
(Update "Welcome" as follows)
```jsx
class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Author name='Alex Taguchi' />
        <Time />
      </div>
    )
  }
}
```
Even though "Time" doesn't receive any props, we still need to write out the constructor method. The constructor method is still required to create the state attributes.

All of the components we've written thus far are static. If we want to make a component dynamic, we need to give it additional methods to change its state attributes. Let's make another component that dynamically displays the time
```jsx
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
```
(Add "Clock" to "Welcome" like before)

componentDidMount() is a special method that runs whenever the component renders something onto the DOM. Thus, as soon as the time is posted, this function will wait one second before changing the date attribute. Changing the date attribute therefore updates the DOM, so componentDidMount() will fire again, continuing the cycle.

Finally, let's actively pass information from one component to another, and have it update the child component's behavior in real time. In this case we will create a "Math" component that has two form fields, which will later be passed to a "Sum" component to display the sum of the numbers
```jsx
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
```
(Add "Math" to "Welcome" like before)

"Math" doesn't receieve any props, and initializes with two state attributes "x" and "y". Two event handler functions "changeX" and "changeY" dynamically update the values of x and y. We have to bind "this" to the event handlers, because they're used as callback functions. Rember that callback functions continue to run even after their parent event handling function has finished (they are let loose to run asynchronously), and therefore callbacks lose their memory of what "this" is (closure). The event we are monitoring is "onChange", so everytime the user changes the value, it gets updated in the states attribute, and passed to "Sum"
```jsx
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
```
Note the use of an if clause here. Only compute and display the sum if both form fields are filled. Otherwise display nothing.
