import React from 'react'
import{BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import  jwtDecode from 'jwt-decode'
// Redux
import {Provider} from 'react-redux'
import store from './redux/store'
import{SET_AUTHENTICATED } from './redux/types'
import {logoutUser, getUserData} from './redux/actions/userActions'
// Components
import NavBar from './components/Navbar'
import themeFile from './utils/theme'
import AuthRoute from './utils/AuthRoute'
//Page
import home from './pages/home'
import signup from './pages/signup'
import login from './pages/login'
import axios from 'axios'

const theme = createMuiTheme(themeFile)
const token= localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp*1000<Date.now()){
    store.dispatch(logoutUser)
    window.location.href='/login'
  }
  else{
    store.dispatch({type: SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute exact path="/login" component={login}/>
              <AuthRoute exact path="/signup" component={signup}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
    
  )
}

export default App
