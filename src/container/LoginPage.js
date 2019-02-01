import React , {Component} from 'react'
import { Button } from 'antd'
import {auth, provider} from '../firebase'

class LoginPage extends Component {

    state = {
        user: {},
        isLoading: false
    }

    componentDidMount() {
        const jsonStr = localStorage.getItem('user-data')
        console.log(jsonStr)
        const isLoggedIn = jsonStr && JSON.parse(jsonStr).isLoggedIn
        if (isLoggedIn) {
            this.props.history.replace('/home')
        }
    }

    onClickLoginWithFacebook = () => {
        this.setState({ isLoading: true })
        auth.signInWithPopup(provider).then( ({ user }) => {
            localStorage.setItem('user-data', JSON.stringify({
                isLoggedIn: true
            }))
            this.setState({ user: user, isLoading: false })
            this.props.history.replace('/home')
        })
    }

    render() {
        return (
            <div>
                <h1>Welcome to Beer Ja</h1>
                <Button 
                    type="primary" 
                    icon="facebook" 
                    loading= {this.state.isLoading} 
                    onClick={this.onClickLoginWithFacebook}>
                Login With Facebook
                </Button>
            </div>
        )
    }
}

export default LoginPage