import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg orange">
        <a className="navbar-brand  text-white" href="index.html">
          AdminStore
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
           
            
            
          </ul>
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link  text-white" href="login.html">
                Welcome
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link  text-white" href="login.html">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
            </div>
        )
    }
}
