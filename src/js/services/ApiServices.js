   
const HOST = 'http://localhost:3001';
const SCHEDULED_SESSIONS_SERVER = `${HOST}/scheduledSessions`;
const SESSIONS_SERVER = `${HOST}/sessions`;
const USERS_SERVER = `${HOST}/users`;
// const SERVER_SHEDULED_SESSIONS = `${SCHEDULED_SESSIONS_SERVER}`;
// const SERVER_SESSIONS = `${SERVER}/sessions`;
// const SERVER_USERS = `${SERVER}/users`;

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

const fetchDb = (endpoint, method, data) => {
    
    const options = { method };

    if (data) {
        if (method === METHODS.GET) {
            const params = new URLSearchParams(data);
            endpoint += `?${params.toString()}`;
        } else {
            options.headers = {
                'Content-Type': 'application/json'
            };
            options.body = JSON.stringify(data);
        }        
    }

    return new Promise((resolve, reject) => {
        fetch(endpoint, options)
            .then(response => {
                if (response.ok) {
                    if (method === METHODS.GET) {
                        response
                            .json()
                            .then(json => resolve(json));
                    } else {
                        response
                            .text()
                            .then(text => resolve(text));
                    }
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
        return fetchDb(
            SCHEDULED_SESSIONS_SERVER,
            METHODS.GET
        );
    }
    // Load sessions
    loadSessions() {
        return fetchDb(
            SESSIONS_SERVER,
            METHODS.GET
        );
    }
    // Delete session
    deleteScheduledSession(sessionID) {
        return fetchDb(
            `${SCHEDULED_SESSIONS_SERVER}/${sessionID}`,
            METHODS.GET
        );
    }
    // Update scheduled sessions rounds definition
    updateScheduledSession(sessionID, data) {
        return fetchDb(
            `${SCHEDULED_SESSIONS_SERVER}/${sessionID}`,
            METHODS.PUT,
            { ...data }
        );
    }
}

const apiServices = new ApiServices();

export { apiServices };