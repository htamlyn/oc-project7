import React from 'react';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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

    onSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:3001/post', {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        });
    }
};

export default CreatePost;