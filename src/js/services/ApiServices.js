   
const HOST = 'http://localhost:3001';
const SCHEDULED_SESSIONS_SERVER = `https://sessions-staging.bkool.com/sessions/scheduledSessions/availableRounds`;
// const SESSIONS_SERVER = `${HOST}/sessions`;
const SESSIONS_SERVER = `https://api-staging.bkool.com/api/v1.0/profiles`;
const USERS_SERVER = `https://users-staging.bkool.com/users`;
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
    
    const options = { method, redirect: 'follow' };

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZaFljdmZoN05MVlpvVTNZdlZsOGJ4V0tDQkFJU1dzMDEwSEJPWjZZVG1rIn0.eyJleHAiOjE2MzQ4ODU1MjAsImlhdCI6MTYzNDc5OTEyMCwianRpIjoiNmMwNjNhZTUtNGU2Yi00ZTQyLTgzNTgtNjA2OGE3NDEyNThhIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLXN0YWdpbmcuYmtvb2wuY29tL2F1dGgvcmVhbG1zL2Jrb29sIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6ImU4MjQyM2M0LTVhM2YtNDc3OC04YjJiLTNlZGIyNDAwMTcwNCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJrb29sLXdlYiIsInNlc3Npb25fc3RhdGUiOiI4MzViMjAxOS0xNzEwLTQ1NWMtYTZiNy0zMmUxNGNhZGM4MDciLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiIiwic2lkIjoiODM1YjIwMTktMTcxMC00NTVjLWE2YjctMzJlMTRjYWRjODA3IiwibmFtZSI6IlVzdWFyaW8gQWRtaW5XZWJVc2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYmtvb2x3ZWIiLCJnaXZlbl9uYW1lIjoiVXN1YXJpbyIsImxvY2FsZSI6ImVzIiwiZmFtaWx5X25hbWUiOiJBZG1pbldlYlVzZXIiLCJlbWFpbCI6ImJrb29sd2ViQGJrb29sLmNvbSJ9.jJCR-93zb4t3JReoiwv9uv2q-LwYz4sqwj8ACxzBNFwg7SOCPMwF7k7ZwH-zhfVzpc9Fl_bkByo3U7n4mJo_FX-EBah9D7YAGaSSKjrJ31Crxjxx34mQb8WlWRWOm8iJJ5OOcvmmm9xVg34oahQbahkHO-nsUAGhJX14OfSLETR6qNMDvzjc3NSsTae-5_cL6sQTvWlrPtkYgQ93yWuOoPbDSC5DFNydYms_ORdTN6nBh3eeD4aUto4gQzdwqdx4UipZz51Ckjw8yQSZb4VIAsetbB4etQ8oodRny3TLWIjnuwH32IepxYw7JHLFqKOpz7Fri3Mb5UVSFwSyHYS5hQ");
    myHeaders.append("Cookie", "JSESSIONID=9kXZFLASkjNzDXINzV2rg4DH3I7-0AD2HBpX64rk");

    if (data) {
        if (method === METHODS.GET) {
            const params = new URLSearchParams(data);
            endpoint += `?${params.toString()}`;
        } else {
            myHeaders.append('Content-Type', 'application/json');
            options.body = JSON.stringify(data);
        }
    }

    options.headers = myHeaders;

    return new Promise((resolve, reject) => {
        fetch(endpoint, options)
            .then(response => {
                if (response.ok) {
                    if (method === METHODS.GET) {
                        response
                            .json()
                            .then(json => resolve(json))
                            .catch(error => reject(error));
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
    // Load featured users
    loadFeaturedUsers() {
        return fetchDb(
            USERS_SERVER,
            METHODS.GET
        );
    }

    // Load scheduled sessions
    loadScheduledSessions(filterObject) {
        return fetchDb(
            SCHEDULED_SESSIONS_SERVER,
            // END_POINT,
            METHODS.GET,
            filterObject
        );
    }

    // Load sessions
    loadSessions() {
        return fetchDb(
            SESSIONS_SERVER,
            METHODS.GET
        );
    }

    // Load sigle session
    loadSingleSession(id) {
        return fetchDb(
            `${SESSIONS_SERVER}/${id}`,
            METHODS.GET
        );
    }

    // Delete session
    deleteScheduledSession(id) {
        return fetchDb(
            `${SCHEDULED_SESSIONS_SERVER}/${id}`,
            METHODS.GET
        );
    }

    // Update scheduled sessions rounds definition
    updateScheduledSession(id, data) {
        return fetchDb(
            `${SCHEDULED_SESSIONS_SERVER}/${id}`,
            METHODS.PUT,
            { ...data }
        );
    }

    // Add new scheduled session
    addScheduledSession(data) {
        return fetchDb(
            `${SCHEDULED_SESSIONS_SERVER}`,
            METHODS.POST,
            { ...data }
        );
    }

    // Load filtered scheduled sessions
    filterScheduledSessions(startDate, endDate, userId, eventId) {
        const END_POINT = `${SCHEDULED_SESSIONS_SERVER}${userId !== null ? '/' + userId : ''}${eventId !== null ? '/' + eventId : ''}${startDate !== null ? '/' + startDate : ''}${endDate !== null ? '/' + endDate : ''}`;
        console.log(END_POINT);
        // return fetchDb(
        //     SCHEDULED_SESSIONS_SERVER,
        //     METHODS.GET
        // );
    }
}

// https://sessions-lab.bkool.com/sessions/scheduledSessions?limit=5&userId=b949a83a-6de6-4787-808e-12c8951afb41&profileId=1be4fd71-ef3d-4556-bd87-ea3fc2c9e273&eventId=GIV2021&startDate=2016-05-18T16%3A00%3A00.000Z&endDate=2016-05-18T16%3A00%3A00.000Z&featuredUserId=b949a83a-6de6-4787-808e-12c8951afb41

const apiServices = new ApiServices();

export { apiServices };