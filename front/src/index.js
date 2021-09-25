import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Store from "./store/index";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import * as serviceWorker from "./serviceWorker";

const {persistor, store } = Store();

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>,
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();