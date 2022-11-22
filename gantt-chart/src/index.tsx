import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from "./components/root/root";
import {Provider} from "react-redux";
import {setupStore} from "./store";
import "./styles/variables.scss";
import "./styles/global.scss";

const store = setupStore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.Fragment>
    <Provider store={store}>
      <Root/>
    </Provider>
  </React.Fragment>
);
