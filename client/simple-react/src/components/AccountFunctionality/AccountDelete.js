import React from 'react';

function refreshPage() {
    localStorage.clear()
    window.location.reload(false);
}


class AccountDelete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }

        this.togglePanel = this.togglePanel.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    togglePanel(e) {
        this.setState({ open: !this.state.open })
    }

    deleteAccount() {
        let userId = ''
        const tokenString = localStorage.getItem('token');
        if (tokenString) {
            const userToken = JSON.parse(tokenString);
            userId = userToken.userId
        }
        fetch(`http://localhost:3001/users/${userId}`, {
            crossDomain: true,
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (res.status === 500) {
                    alert('Error in deleting account')
                } else {
                    refreshPage()
                }
            })
    }


    render() {
        return (
            <div className='editAccount-wrapper'>
                <h2>Delete Account</h2>
                <button id='deleteButton'onClick={(e) => this.togglePanel(e)}>Delete</button>
                {
                    this.state.open ? (
                        <div className='delete__lightbox'>
                            <h4>Permanently delete account?</h4>
                            <button id='deleteConfirm' onClick={() => this.deleteAccount()}>Confirm Account Deletion</button>
                        </div>
                    ) : null
                }
            </div >
        )
    }
}

export default AccountDelete;