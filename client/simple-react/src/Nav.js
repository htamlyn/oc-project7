import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

function Nav() {
    const [loginDisplay, setLoginDisplay] = React.useState(false);
    const showLogin = () => {
        setLoginDisplay(true)
    }
    const hideLogin = () => {
        setLoginDisplay(false)
    }
    const [signUpDisplay, setSignUpDisplay] = React.useState(false);
    const showSignUp = () => {
        setSignUpDisplay(true)
    }
    const hideSignUp = () => {
        setSignUpDisplay(false)
    }

    return (

        <div>
            <nav>
                <div className='navDiv__logo'>
                    Groupomania
                </div>
                <div className='navDiv__login' onClick={showLogin}>
                    Login
                </div>
                <div className='navDiv__signup' onClick={showSignUp}>
                    Sign Up
                </div>
            </nav>
            {loginDisplay ?
                < div className='lightbox'>
                    <div className='login'>
                        <h2>Login!</h2>
                        <span className='closeLightBox' onClick={hideLogin}>X</span>
                        <Login />
                    </div>
                </div>
                : ''}
            {signUpDisplay ?
                < div className='lightbox'>
                    <div className='signUp'>
                        <h2>Sign Up!</h2>
                        <span className='closeLightBox' onClick={hideSignUp}>X</span>
                        <SignUp />
                    </div>
                </div>
                : ''}
        </div >
    )
};

export default Nav;