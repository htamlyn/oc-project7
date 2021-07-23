import React from 'react';

function refreshPage() {
    localStorage.clear()
    window.location.reload(false);
}

let userId = ''
const tokenString = localStorage.getItem('token');
if (tokenString) {
    const userToken = JSON.parse(tokenString);
    userId = userToken.userId
}

class AccountDelete extends React.Component {

    deleteAccount() {
        console.log(userId)
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
            <div className='signup-wrapper'>
                <h2>Delete Account</h2>
                <div>
                    <button onClick={this.deleteAccount}>Delete Account</button>
                </div>
            </div>
        )
    }
}

export default AccountDelete;