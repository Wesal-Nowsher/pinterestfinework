import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import registerServiceWorker from './serviceWorker';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Provider } from "react-redux";
import store from './store/configureStore';

ReactDOM.render(

    <Provider store={store}>
            <App/>
        </Provider>
    ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker();
