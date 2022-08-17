import React from 'react'
import ReactDOM from "react-dom/client"
import './index.css'
import 'typeface-roboto'
import 'src/styles/fonts/roboto-condensed.regular.ttf'
import App from './App'
import store from './features/App/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>
)

serviceWorker.unregister()
