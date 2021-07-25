import React from 'react';
import './Nav.css'
import AccountEdit from '../AccountFunctionality/AccountEdit';
import AccountDelete from '../AccountFunctionality/AccountDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function refreshPage() {
    const tokenString = localStorage.getItem('token')
    const userID = JSON.parse(tokenString)
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    let data = {
        lastLogin: dateTime
    }
    fetch(`http://localhost:3001/users/logout/${userID.userId}`, {
        crossDomain: true,
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    localStorage.clear()
    window.location.reload(false);
}

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e) {
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <div>
                <nav>
                    <div className='navDiv__logo'>
                        Groupomania
                    </div>
                    <div className='navDiv__account' onClick={(e) => this.togglePanel(e)}>
                        <FontAwesomeIcon icon="user" id='icon' />
                        Account
                    </div>
                    <div onClick={refreshPage}>
                        Logout
                    </div>
                </nav>
                {this.state.open ? (
                    <div className='navDiv__lightboxWrapper'>
                        <div className='navDiv__lightbox'>
                            <AccountEdit />
                            <AccountDelete />
                        </div>
                    </div>
                ) : null}
            </div >
        )
    }


}


export default Nav;