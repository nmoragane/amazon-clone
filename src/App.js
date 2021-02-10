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
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from './components/Orders';

const promise = loadStripe("pk_test_51IHCQbBMf5KAvc4xzAPt7DK1bi4Tvk94S3Z7GrtNtkmLukCh8I5i0zwJ2E4tI4bSDSlICwd8HnaVrIosvQ3UooFS00X8bnz6FO");


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
          
          <Route path="/orders">
            <Header/>        
            <Orders/>
          </Route>

          <Route path="/payment">
            <Header/> 
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
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
