import React from 'react';
import history from '../App/history';
import './CreatePost.css'

class CreatePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileInputState: false,
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
                previewSource: reader.result,
                fileInputState: true
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
                <h3 className='createPost__header'>What's on your mind?</h3>
                <div className='createPost__formWrapper'>
                    <form className='createPost__form' onSubmit={this.onSubmit}>
                        <label className='createPost__title'>
                            <input
                                type="text"
                                placeholder="Title"
                                id="title"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange} />
                        </label>
                        <label className='createPost__content'>
                            <textarea
                                type="text"
                                id="content"
                                name="content"
                                value={this.state.content}
                                onChange={this.onChange} />
                        </label>
                        <div className='createPost__btnWrapper'>
                            <input
                                style={{ display: 'none' }}
                                type="file"
                                onChange={this.fileSelectedHandler}
                                ref={fileInput => this.fileInput = fileInput} />
                            {(this.state.fileInputState === false ?
                                (
                                    <button type='button' className='createPost__button' onClick={() => this.fileInput.click()}>Add an Image/Gif</button>
                                ) : null
                            )}
                            {(this.state.fileInputState === true && this.state.uploaded !== true ?
                                (
                                    <button className='createPost__button' onClick={this.handleFileSubmit}>Confirm Image</button>
                                ) : null
                            )}
                            {(this.state.uploaded === true ?
                                (
                                    <div>Uploaded successfully</div>
                                ) : null
                            )}
                            {this.state.previewSource && (
                                <img src={this.state.previewSource} id='previewImage' alt='chosen' />
                            )}
                            <input className='createPost__button' type="submit" value="Post!" id="post" onClick={() => history.push('/')}></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default CreatePost;