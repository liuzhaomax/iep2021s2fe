import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import liuzhaomax from "./liuzhaomax"
import App from "./app/App";
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux";
import rootReducer from "./state/reducers";
import configJson from "./config/config.json"
import axios from "axios";
import config from "./config/config"
// import reportWebVitals from '../test/reportWebVitals';
// import logger from "redux-logger"

// https upgrading config
if (configJson.run_mode === "release") {
    const head = document.getElementsByTagName("head")[0]
    const https = document.createElement("meta")
    https.setAttribute("http-equiv", "Content-Security-Policy")
    https.setAttribute("content", "upgrade-insecure-requests")
    head.appendChild(https)
    liuzhaomax()
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

axios.defaults.baseURL = config.beBaseUrl

ReactDOM.render(
    <Provider store={store}>
        <App store={store}/>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();