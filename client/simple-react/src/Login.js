import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            login: false,
            store: null
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:3001/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then((res) => {
            res.json().then((result) => {
                console.log(result);
                localStorage.setItem('login', JSON.stringify(
                    {
                        login: true,
                        id: result.userId,
                        token: result.token
                    }
                ))
                if(res.status === 200) {
                    this.setState({ login: true })
                } else if(res.status === 404) {
                    alert('No user with that username')
                } else if(res.status === 401) {
                    alert('Incorrect Password')
                }
            });
        });
    };

    render() {
        return (
            <div>
                {
                    !this.state.login ?
                        <form className='login__form' onSubmit={this.onSubmit}>
                            <label>Username:
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChange} />
                            </label>
                            <label for="password">Password:
                                <input
                                    type="text"
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </label>
                            <input type="submit" value="Login" id="signUp" ></input>
                        </form>
                    :
                    <div>
                        <h3>Logged in</h3>
                    </div>
                }
            </div>
        )
    }
}

export default Login;