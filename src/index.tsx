//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// This serves as an entry point to the DOM and server renderers for React
import ReactDOM from "react-dom";
// DOM bindings for React Router
import { BrowserRouter as Router } from "react-router-dom";
// Provider
import { Provider } from "react-redux";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// Allows to manually display a LoadingBar
import { loadingBarMiddleware } from "react-redux-loading-bar";
// Thunk
import thunk from "redux-thunk";
//> Client
import { SnekClient } from "snek-client";

//> Font Awesome
// Font Awesome is an awesome icon library
import "@fortawesome/fontawesome-free/css/all.min.css";
//> Bootstrap
import "bootstrap-css-only/css/bootstrap.min.css";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import "mdbreact/dist/css/mdb.css";

//> Services
import Services from "./serviceRegistry.json";
//> Style sheet
// Root SCSS file
import "./index.scss";
//> Components
// Root component
import App from "./App";
//> Root Reducer
import rootReducer from "./store/reducers";
//> Service Worker
import * as serviceWorker from "./serviceWorker";
//#endregion

//#region > Redux Store Initialization
let serviceIndex = window.localStorage.getItem("ohrwurm_service_index");

const SERVICE_INDEX = serviceIndex ? parseInt(serviceIndex) : 0;
const getClientSnek = () => new SnekClient(Services.ohrwurm[SERVICE_INDEX].url);

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const enhancer = composeEnhancers(
  applyMiddleware(
    loadingBarMiddleware(),
    thunk.withExtraArgument({
      getClientSnek,
    })
  )
  // other store enhancers if any
);

const STORE = createStore(rootReducer /* preloadedState, */, enhancer);
//#endregion

//Render the root component to <div id="root"></div>
ReactDOM.render(
  <Provider store={STORE}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
