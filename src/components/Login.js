import React, { useState } from 'react';
import '../styles/login.css'
import {Link, useHistory} from "react-router-dom";
import { auth } from '../firebase';

function Login(props) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email,password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            console.log(auth);
            if(auth) {
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <Link to ="/">
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/640px-Amazon_logo.svg.png" alt=""/>
            </Link>

            <div className="login__container">
                <h1>Sign In</h1>

                <form action="">
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button className="login__signInBtn" onClick={signIn} type="submit">Sign In</button>
                </form>

                <p>
                    By continuing, you agree to Amazon clone of Nayomal Moragane's Conditions of Use and Privacy Notice.
                </p>

                <button className="login__registerBtn" onClick={register}>Create your Amazon Account</button>
            </div>

        </div>
    );
}

export default Login;