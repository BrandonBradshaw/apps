

// HiveOS boiler-plate code
const baseUrl = 'https://api2.hiveos.farm/api/v2';
let accessToken = null;

doLogin('your_login', 'your_password')
    .then(getFarms)
    .then(farms => console.log('farms=', farms));

function doLogin(login, password) {
    return fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({login, password})
    }).then(r => {
        if (!r.ok) {
            r.json().then(data => {
                console.error(data.message || 'Response error');
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

function getFarms() {
    return fetch(`${baseUrl}/farms`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    }).then(r => {
        if (!r.ok) {
            r.json().then(data => {
                console.error(data.message || 'Response error');
            });
            return Promise.reject(r);
        }
        else {
            return r.json();
        }
    });
}