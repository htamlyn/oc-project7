import React from 'react';
import history from '../App/history';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileInputState: '',
            previewSource: '',
            uploaded: false,
            employeeID: '',
            title: '',
            content: '',
            imagePath: '',
            imageId: '',
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


    previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                previewSource: reader.result
            })
        }
    };

    fileSelectedHandler = (e) => {
        const file = e.target.files[0];
        this.previewFile(file);
    }

    handleFileSubmit = (e) => {
        e.preventDefault();
        if (!this.state.previewSource) return;
        this.uploadImage(this.state.previewSource)
    }

    async uploadImage(base64EncodedImage) {
        const response = await fetch('http://localhost:3001/upload', {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: base64EncodedImage })
        });
        if (response.status === 500) {
            console.log('error occured')
        } else {
            const data = await response.json();
            this.setState({
                imagePath: data.url,
                imageId: data.public_id,
                uploaded: true
            })
        }
    }


    async onSubmit(e) {
        e.preventDefault();
        const tokenString = localStorage.getItem('token')
        const userToken = JSON.parse(tokenString);
        const userId = userToken.userId
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        this.setState({
            employeeID: userId,
            timeStamp: dateTime
        }, () => {
            const formData = new FormData();
            formData.append("employeeID", this.state.employeeID);
            formData.append("title", this.state.title);
            formData.append("timeStamp", this.state.timeStamp);
            formData.append("imagePath", this.state.imagePath);
            formData.append("imageId", this.state.imageId);
            formData.append("content", this.state.content);
            formData.append("likes", this.state.likes);
            const values = Object.fromEntries(formData.entries());
            const toSend = JSON.stringify(values)
            fetch('http://localhost:3001/post', {
                crossDomain: true,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: toSend
            });
            window.location.reload(false);
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
                        value={this.state.fileInputState}
                        onChange={this.fileSelectedHandler}
                        ref={fileInput => this.fileInput = fileInput} />
                    <div onClick={() => this.fileInput.click()}>Upload an Image</div>
                    {(this.state.uploaded === false ?
                        (
                            <button onClick={this.handleFileSubmit}>Confirm Image</button>
                        )
                        : <div>Uploaded successfully</div>
                    )}

                    {this.state.previewSource && (
                        <img src={this.state.previewSource} alt='chosen' style={{ height: '300px' }} />
                    )}
                    <input type="submit" value="Post!" id="post" onClick={() => history.push('/')}></input>
                </form>
            </div>
        )
    }
};

export default CreatePost;