import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'

import todoApp from './src/reducers'
import App from './src/components/App'
import VisibleTodoList from './src/containers/VisibleTodoList'

const app = Express()
const port = 3000
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
})

app.use(handleRender)

function renderFullPage(html, initialState) {
	return (
		`<!doctype html>
		  <html>
		    <head>
		      <title>Redux Universal Example</title>
		    </head>
		    <body>
		      <div id="root">${html}</div>
		      <script>
		        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
		      </script>
		      <script src="/static/bundle.js"></script>
		    </body>
		  </html>`
	)
}

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(todoApp)

  // Render the component to a string
  const html = renderToString(
	  <Provider store={store}>
	    <App />
	  </Provider>,
  )

  // Grab the initial state from our Redux store
  const initialState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, initialState))
}

app.listen(port, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});



