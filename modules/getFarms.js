const fetch = require("node-fetch")

const getFarms = (baseUrl, accessToken) => {
    return fetch(`${baseUrl}/farms`, {
        method : 'GET',
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

module.exports = getFarms;