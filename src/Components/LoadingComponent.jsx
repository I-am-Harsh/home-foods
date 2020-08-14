import React, { Component } from 'react';
import { Spinner } from 'reactstrap';


class Loading extends Component {
    state = {
        loading: 0
    }

    updateLoading = () => {
        this.setState({ loading: this.state.loading + 1 });
    }

    componentDidMount() {
        const { small = false } = this.props;
        if (small) {
            setInterval(() => this.updateLoading(), 1000);
        }
    }

    render() {
        const { loading } = this.state;
        if (!this.props.small) {
            return (
                <div>
                    <div className = 'center'>
                        <Spinner type='grow' color='primary' className='mr-3' />
                        <Spinner type="grow" color="secondary" className='mr-3' />
                        <Spinner type="grow" color="success" />
                    </div>
                </div>
            )
        }
        else {
            if (loading % 3 === 0) return <div className = 'center'><Spinner type='grow' color='primary' /></div>
            if (loading % 3 === 1) return <div className = 'center'><Spinner type='grow' color='success' /></div>
            if (loading % 3 === 2) return <div className = 'center'><Spinner type='grow' color='danger' /></div>
        }
    }
}

export default Loading;
