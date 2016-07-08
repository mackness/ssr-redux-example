import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__

console.log(initialState)

// Create Redux store with initial state
const store = createStore(todoApp, initialState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)