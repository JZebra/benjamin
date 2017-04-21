import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let key = event.target.name;
        let state = {};
        state[key] = event.target.value;

        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();

        let username = this.state.username;
        let password = this.state.password;

        this.login(username, password, (loggedIn) => {
            if (loggedIn) {
                console.log("logged in");
                this.props.afterLogin();
            }
        });
    }

    login(username, pass, cb) {
        // if (this.props.store.loggedIn) {
        //      if (cb) {
        //         cb(true);
        //     }
        //     return
        //  }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                this.props.store.storeToken(res.token);
                this.props.store.login();
                if (cb) {
                    cb(true);
                }
            } else {
                if (cb) {
                    cb(false);
                }
            }
        })
    }

    logout() {
        this.props.store.logout();
    }

    loggedIn() {
        return this.props.store.loggedIn;
    }

    getToken(username, password, cb) {
        let credentials = {
            "username": username,
            "password": password
        }

        fetch('http://127.0.0.1:8000/api-token-auth/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': 'aqMe271ObF3ZVSa0wYIkRlut0ocuXxwZ0Wq7xKl5GK6R3paEf2zFBy7r5eyZFtdq'
            },
            body: JSON.stringify(credentials)
        }).then((res) => {
            return res.json();
        }).then((json) => {
            cb({
                authenticated: true,
                token: json.token
            })
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="username" />
                <input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="password" />

                <input type="submit" />
            </form>
        );
    }
}

export default LoginForm;
