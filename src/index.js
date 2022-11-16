import React from 'react';
import ReactDOM from 'react-dom/client';

//* App & Style
import './index.css';
import App from './App';

//* Router
import { BrowserRouter as Router } from 'react-router-dom';

//* Redux
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);


