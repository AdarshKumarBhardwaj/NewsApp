
import './App.css';
import Navbar from './components/Navbar'
import News from './components/News'
import React, { Component } from 'react'


import {
  BrowserRouter as Router,
  Routes,
  Route,

 
} from "react-router-dom";


export default class App extends Component {

  render() {
    return (
      <div>
      <Router>
        <Navbar/>
      <Routes>
      <Route exact path="/general"element={<News key="general"  pageSize={15} country="in" category="general"/>} ></Route>
      <Route exact path="/entertainment"element={<News key="entertainment"  pageSize={15} country="in" category="entertainment"/>} ></Route>
      <Route exact path="/health"element={<News key="health"  pageSize={15} country="in" category="health"/>} ></Route>
      <Route exact path="/science"element={<News key="science"  pageSize={15} country="in" category="science"/>} ></Route>
      <Route exact path="/sports"element={<News key="sports"  pageSize={15} country="in" category="sports"/>} ></Route>
      <Route exact path="/technology"element={<News key="technology"  pageSize={15} country="in" category="technology"/>} ></Route>
       </Routes>
      </Router>
      </div>
    )
  }
}



