import React from 'react';
import ReactDOM from 'react-dom/client';

//* Router
import { BrowserRouter as Router } from 'react-router-dom';

//* App & Style
import './index.css';
import App from './App';

//* Redux
import store from './store'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);


