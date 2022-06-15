import React, { Component } from "react"
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Assets from './components/assets'
import Home from './components/home'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <main className = 'container'>
        <Switch>
        <Route path='/:addr'  component={Assets} />
        <Route path='/'  component={Home} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
