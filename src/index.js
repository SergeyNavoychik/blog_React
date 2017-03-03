import './styles/main.sass'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { Router, browserHistory } from 'react-router'
import { routes } from './route/routes'
const store = configureStore()
ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory } routes={ routes }/>
    </Provider>,
    document.getElementById('app')
)
