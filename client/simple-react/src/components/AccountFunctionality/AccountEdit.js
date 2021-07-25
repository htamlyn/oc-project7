import React from "react";
import history from '../App/history';

const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

let userId = ''
const tokenString = localStorage.getItem('token');
if(tokenString){
const userToken = JSON.parse(tokenString);
userId = userToken.userId
}



class AccountEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            username: null,
            email: null,
            showSuccessBlock: false,
            errors: {
                firstName: '',
                lastName: '',
                username: '',
                email: ''
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(e) {
        const { name, value } = e.target;
        let errors = this.state.errors;

        switch (name) {
            case 'firstName':
                errors.firstName =
                    value.length < 3
                        ? 'First name must be more than 3 characters!'
                        : '';
                break;
            case 'lastName':
                errors.lastName =
                    value.length < 3
                        ? 'Last name must be more than 3 characters!'
                        : '';
                break;
            case 'username':
                errors.username =
                    value.length < 2
                        ? 'Username must be more than 1 character!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
        // this.setState({
        //     [e.target.name]: e.target.value
        // });
    }

    onSubmit(e) {
        e.preventDefault();

        if (validateForm(this.state.errors)) {
            console.info('Valid Form')
            fetch(`http://localhost:3001/users/${userId}`, {
                crossDomain: true,
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
            })
                .then(res => {
                    if (res.status === 500) {
                        alert('Error updating, please try again')
                    } else {
                        this.setState({
                            showSuccessBlock: true
                        })
                    }
                })
        } else {
            console.error('Invalid Form')
        }
    }


    render() {
        const { errors } = this.state;
        if (!this.state.showSuccessBlock) {
            return (
                <div className='signup-wrapper'>
                    <h2>Edit Account Details</h2>
                    <form className='signUp__form' onSubmit={this.onSubmit}>
                        <label>
                            <p>First name</p>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.onChange} />
                        </label>
                        {errors.firstName.length > 0 &&
                            <span className='error'>{errors.firstName}</span>}
                        <label>
                            <p>Last name</p>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.onChange} />
                        </label>
                        {errors.lastName.length > 0 &&
                            <span className='error'>{errors.lastName}</span>}
                        <label>
                            <p>Username</p>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChange} />
                        </label>
                        {errors.username.length > 0 &&
                            <span className='error'>{errors.username}</span>}
                        <label>
                            <p>Email</p>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange} />
                        </label>
                        {errors.email.length > 0 &&
                            <span className='error'>{errors.email}</span>}
                        <input type="submit" value="Confirm" id="confirm" onClick={() => history.push('/')}></input>
                    </form>
                </div>
            )
        } else {
            return (
                <h2>Information Updated</h2>
            )
        }
    }
}

export default AccountEdit;