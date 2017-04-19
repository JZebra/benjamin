module.exports = {
    login: function(username, pass, cb) {
        if (localStorage.getItem('token') !== null) {
             if (cb) {
                cb(true)
            }
            return
         }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.setItem('token', res.token)
                if (cb) {
                    cb(true)
                }
            } else {
                if (cb) {
                    cb(false)
                }
            }
        })
    },

    logout: function() {
        localStorage.removeItem('token')
    },

    loggedIn: function() {
        return !!localStorage.getItem('token')
    },

    getToken: function(username, password, cb) {
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
        }).then((res) => {
            cb({
                authenticated: true,
                token: res.token
            })
        })
    },
}
