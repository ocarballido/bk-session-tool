   
const SERVER = 'http://localhost:3001';
const SERVER_SHEDULED_SESSIONS = `${SERVER}/scheduledSessions`;
const SERVER_SESSIONS = `${SERVER}/sessions`;
const SERVER_USERS = `${SERVER}/users`;

const fetchDb = (endpoint, method, data) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (data) options.body = JSON.stringify(data);

    return new Promise((resolve, reject) => {
        fetch(endpoint, options)
            .then(response => {
                if (response.ok) {
                    response
                        .json()
                        .then(json => resolve(json));
                } else {
                    reject('Server error');
                }
            })
            .catch(error => reject(error));

    });
};

class ApiServices {
    loadGuests() {
        return fetchDb(SERVER_SHEDULED_SESSIONS, 'GET');
    }
}

const apiServices = new ApiServices();

export { apiServices };