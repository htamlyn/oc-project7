import React from 'react';
import './Nav.css'
import AccountEdit from '../AccountEdit/AccountEdit';
import AccountDelete from '../AccountEdit/AccountDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function refreshPage() {
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