import React from 'react';
import './Posts.css';
import history from '../App/history';

function refreshPage() {
    window.location.reload(false);
}

class EditPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            open: false,
            showSuccessBlock: false,
            title: null,
            content: null
        }

        this.togglePanel = this.togglePanel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    togglePanel(e) {
        this.setState({ open: !this.state.open })
        this.setState({id: this.props.postID})
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:3001/post/${this.state.id}`, {
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
                    }, () => {
                        setTimeout(() => refreshPage(), 1000);
                    })
                }
            })
    }

    render() {
        if (!this.state.showSuccessBlock) {
            return (
                <div>
                    <button onClick={(e) => this.togglePanel(e)}>Edit</button>
                    {
                        this.state.open ? (
                            <div>
                                <div>Edit Posts</div>
                                <form className='editPost__form' onSubmit={this.onSubmit}>
                                    <label>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            id="title"
                                            name="title"
                                            value={this.state.title}
                                            onChange={this.onChange} />
                                    </label>
                                    <label>
                                        <input
                                            type="text"
                                            placeholder="Content"
                                            id="content"
                                            name="content"
                                            value={this.state.content}
                                            onChange={this.onChange} />
                                    </label>
                                    <input type="submit" value="Confirm Changes!" id="edit" onClick={() => history.push('/')}></input>
                                </form>
                            </div>
                        ) : null
                    }
                </div>
            )
        } else {
            return (
                <h2>Information Updated</h2>
            )
        }
    }
}

export default EditPost;