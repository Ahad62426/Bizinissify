import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserDetail from './UserDetail';
import PurchaseDetail from './PurchaseDetail';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import Navbar from './Navbar';
import Purchase from './Purchase';
import Categories from './Categories'



ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  //   <main></main>
  
  // </React.StrictMode>
  <React.StrictMode>
  
    <Router>
      <Navbar></Navbar>
    
      <Route  exact path="/" component={App}  />
      
       <Route  path="/main" component={UserDetail}  />
       <Route  path="/purchase" component={Purchase}  />
       <Route  path="/purchasedetail" component={PurchaseDetail}  />
       <Route  path="/categories" component={Categories}  />
       
     
      </Router>
    
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
