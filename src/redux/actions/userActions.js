/* eslint-disable no-console */
import axios from 'axios'
import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types'

export const loginUser = (userData, history) =>(dispatch) =>{
  dispatch({type: LOADING_UI})
  axios.post('/login', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({type: CLEAR_ERRORS})
      history.push('/')
    })
    .catch(error=>{
      dispatch({
        type:SET_ERRORS,
        payload: error.response.data
      })
    })
}

export const  getUserData =()=>(dispatch) =>{
  dispatch({type: LOADING_USER})
  const FBIdToken = localStorage.getItem('FBIdToken')
  axios.defaults.headers.common['Authorization'] = FBIdToken
  axios.get('/user')
    .then(res =>{
      dispatch({
        type: SET_USER,
        payload: res.data})
    })
    .catch(error=>{
      console.log(error)
    })
}

export const signupUser = (userData, history) =>(dispatch) =>{
  dispatch({type: LOADING_UI})
  axios.post('/signup', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({type: CLEAR_ERRORS})
      history.push('/')
    })
    .catch(error=>{
      dispatch({
        type:SET_ERRORS,
        payload: error.response.data
      })
    })
}

export const uploadImage = (formData) =>dispatch=>{
  dispatch({type: LOADING_USER})
  axios.post('/user/image', formData)
    .then(()=>{
      dispatch(getUserData())
    })
    .catch(error=>{console.log(error)})
}

const setAuthorizationHeader = token =>{
  const FBIdToken = `Bearer ${token}`
  localStorage.setItem('FBIdToken', FBIdToken)
  axios.defaults.headers.common['Authorization'] = FBIdToken
}

export const logoutUser = () => dispatch =>{
  localStorage.removeItem('FBIdToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({type: SET_UNAUTHENTICATED})
}

export const editUserDetails = (userDetails) => dispatch =>{
  dispatch({type: LOADING_USER})
  axios.post('/user', userDetails)
    .then(()=>{
      dispatch(getUserData())
    })
    .catch(error=>console.log(error))
}