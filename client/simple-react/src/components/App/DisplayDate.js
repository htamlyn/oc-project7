import React from 'react';

class DisplayDate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date,
            display: ''
        }

    }

    makeDate() {
        let d = this.state.date;
        let t = d.split(/[- : T Z]/);
        let string = `${t[3]}:${t[4]} ${t[2]}/${t[1]}/${t[0]}`
        this.setState({
            display: string
        })
    }

    componentDidMount() {
        this.makeDate()
    }

    render() {
        return (
            <div>
                <p>{this.state.display}</p>
            </div>
        )
    }
}

export default DisplayDate;