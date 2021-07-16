import React from 'react';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: ''
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

        fetch('http://localhost:3001/users/signup', {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        });
    }

    render() {
        return (
            <form className='signUp__form' onSubmit={this.onSubmit}>
                <label>First name:
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.onChange} />
                </label>
                <label>Last name:
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.onChange} />
                </label>
                <label>Username:
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange} />
                </label>
                <label>Email:
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange} />
                </label>
                <label>Password:
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange} />
                </label>
                <input type="submit" value="Sign Up" id="signUp"></input>
            </form>
        )
    }
}

export default SignUp;