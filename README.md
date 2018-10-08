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
