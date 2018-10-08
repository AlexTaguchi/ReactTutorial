# ReactTutorial
Simple example of building a one page React website

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

In order to communicate with eachother, components receive information from their parent (root) components and pass down information to their child (branch) components in the form of properties, or "props". Therefore, components normally require two methods: A "constructor" method to construct the component based on the props received from the parents, and a "render" method to display the constructed component (since the "Welcome" class is the master component and doesn't receive any props, it doesn't need a "constructor" method).

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
Note that we passed down 'Alex Taguchi' as a prop to the "Author" class. The constructor of "Author" took props, and the "super(props)" calls React.Component to handle it. React.Component automatically converts the props into an attribute that can be readily accessed as "this.props.name", where the attribute is called "name", because that's the name with which we passed it down from "Welcome" (<Author name='Alex Taguchi' />).
