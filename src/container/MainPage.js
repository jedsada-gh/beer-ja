import React, {Component} from 'react'
import {Button} from 'antd'

class MainPage extends Component {

    state = {
        isLoading: false
    }

    onClickLogout = () => {
        this.setState({isLoading: true})
        localStorage.setItem('user-data', JSON.stringify({
            isLoggedIn: false
        }))
        setTimeout(() => {
            this.setState({isLoading: false})
            this.props.history.push('/')
        }, 4000)
    }

    render() {
        return(
            <div>
                <h1>Main Page</h1>
                <Button type='primary' loading={this.state.isLoading} onClick={this.onClickLogout}>Logout</Button>
            </div>
        )
    }
}

export default MainPage