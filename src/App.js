import './App.css';
import Header from './components/Header'
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Checkout from './components/Checkout';
import Login from './components/Login';
import { auth } from './firebase';
import { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import Payment from './components/Payment';

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>', authUser);

      if (authUser) {
        //user is logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])

  return (

    <Router>
      <div className="app">
      

        <Switch>
          <Route path="/login">            
            <Login/>
          </Route>
          <Route path="/checkout">
            <Header/>        
            <Checkout/>
          </Route>
          <Route path="/payment">
            <Header/>        
            <Payment/>
          </Route>

          <Route path="/">
            <Header/>
            <Home/>
          </Route>
          
        </Switch>
      </div>
    </Router>  

  );
}

export default App;
