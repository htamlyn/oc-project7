import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import useToken from './useToken';

library.add( faUser, faThumbsUp)

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return (
      <div>
        <Login setToken={setToken} />
        <BrowserRouter>
          <div className='signup__container'>
            <Link to={'/signup'} className='signup__link'> New user? Sign Up <strong>Here</strong> </Link >
            <Switch>
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
