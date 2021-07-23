import React from 'react';
import history from '../App/history';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            selectedFile: '',
            employeeID: '',
            title: '',
            content: '',
            imagePath: '',
            timeStamp: '',
            likes: 0
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    fileSelectedHandler = event => {
        event.preventDefault();
        this.setState({
            selectedFile: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0])
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const tokenString = localStorage.getItem('token')
        const userToken = JSON.parse(tokenString);
        const userId = userToken.userId
        const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.setState({
            employeeID: userId,
            timeStamp: dateTime
        }, () => {
            const formData = new FormData();
            formData.append("employeeID", this.state.employeeID);
            formData.append("title", this.state.title);
            formData.append("file", this.state.selectedFile);
            console.log(formData.values)
            console.log(this.state)
            fetch('http://localhost:3001/post', {
                crossDomain: true,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: formData
            });
        })
    }

    render() {
        return (
            <div className='postDiv'>
                <h3>Create Post</h3>
                <form className='createPost__form' onSubmit={this.onSubmit}>
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
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        onChange={this.fileSelectedHandler} 
                        ref = {fileInput => this.fileInput = fileInput}/>
                    <div onClick={() => this.fileInput.click() }>Upload an Image</div>
                    <img src={this.state.file}/>
                    <input type="submit" value="Post!" id="post" onClick={() => history.push('/')}></input>
                </form>
            </div>
        )
    }
};

export default CreatePost;