import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import history from '../App/history';

async function loginUser(credentials) {
    return fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    // .then(data => data.json())
    .then(res => {
        if (res.status === 401) {
            alert('Incorrect Password')
        } else if (res.status === 404) {
            alert('User not found')
        } else {
            return res.json()
        }
    })
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        if (token != null) {
            setToken(token);
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Welcome to the Groupomania Demo!</h1>
            <h2>Please Log In</h2>
            <form onSubmit={handleSubmit}>
                <label for="username">
                    Username
                    <input type="text" className="client-info" id="username" onChange={e => setUserName(e.target.value)} />
                </label>
                <label for="password">
                    Password
                    <input type="password" className="client-info" id="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <br></br>
                <input type="submit" value="Login" id="login" onClick={() => history.push('/')}></input>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

