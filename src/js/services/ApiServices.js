   
const SCHEDULED_SESSIONS_SERVER = 'http://localhost:3001/scheduledSessions';
const SESSIONS_SERVER = 'http://localhost:3001/sessions';
const USERS_SERVER = 'http://localhost:3001/users';
// const SERVER_SHEDULED_SESSIONS = `${SCHEDULED_SESSIONS_SERVER}`;
// const SERVER_SESSIONS = `${SERVER}/sessions`;
// const SERVER_USERS = `${SERVER}/users`;

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
    // Load scheduled sessions
    loadScheduledSessions() {
        return fetchDb(SCHEDULED_SESSIONS_SERVER, 'GET');
    }
    // Load sessions
    loadSessions() {
        return fetchDb(SESSIONS_SERVER, 'GET');
    }
    // Delete session
    deleteScheduledSession(sessionID) {
        // console.log(`${SCHEDULED_SESSIONS_SERVER}/${sessionID}`);
        return fetchDb(`${SCHEDULED_SESSIONS_SERVER}/${sessionID}`, 'DELETE');
    }
    // Update scheduled sessions rounds definition
    updateRoundsDefinition(sessionID) {
        return fetchDb(`${SCHEDULED_SESSIONS_SERVER}/${sessionID}`, 'PUT', {roundsDefinition});
    }
}

const apiServices = new ApiServices();

export { apiServices };