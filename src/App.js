import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect, Route,
  Switch
} from "react-router-dom";
import styled from 'styled-components';
import CenteredSpinner from './components/CenteredSpinner';
import NavbarChatty from './components/NavbarChatty';
import Chat from './pages/Chat';
import ChatsList from './pages/ChatsList';
import CreateChat from './pages/CreateChat';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import { auth } from './services/firebase';


export default function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(()=>
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true)
        setLoading(false)
      } else {
        setAuthenticated(false)
        setLoading(false)
      }
    })
  , [])


  return (
  <>
    <Router>
      <ViewHeight>
        {loading === true 
          ? <CenteredSpinner /> 
          : (
            <Switch>
              <PrivateRoute exact path="/" component={ChatsList}></PrivateRoute>
              <PublicRoute path="/signup" authenticated={authenticated} component={Signup}></PublicRoute>
              <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
              <PrivateRoute path="/profile" authenticated={authenticated} component={Profile}></PrivateRoute>
              <PrivateRoute path="/chats" exact authenticated={authenticated} component={ChatsList}></PrivateRoute>
              <PrivateRoute path="/chats/:chatID" authenticated={authenticated} component={Chat}></PrivateRoute>
              <PrivateRoute path="/create" authenticated={authenticated} component={CreateChat}></PrivateRoute>
            </Switch>
          )}
      </ViewHeight>
    </Router>
    </>
  )
}

const ViewHeight = styled.div`
  --height: 100vh;
`

//only show navbar in authenticated routes
function PrivateRoute({ component: Component, authenticated, ...rest }){
  return(
    <>
    <NavbarChatty/>
    <Route 
      {...rest} 
      render = {(props)=>
          authenticated === true 
            ? <Component {...props} />
            : <Redirect to={{ pathname: "/signup", state:{from: props.location} }} />
      }
    />
    </>
  )
}
function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false
          ? <Component {...props} />
          : <Redirect to={{ pathname: "/chats"}} />
      }
    />
  )
}