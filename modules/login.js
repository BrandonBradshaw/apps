
// Declaring the login modules
const doLogin = (login , password, baseUrl) => {
        return fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({login, password})
        }).then(r => {
            if (!r.ok) {
                r.json().then(data => {
                    console.error(data.message || ' Response error');
                });
                return Promise.reject(r);
            }
            else {
                return r.json().then(data => {
                    accessToken = data.access_token;
                    return data;
                });
            }
        })
    }

module.exports = doLogin;