import { apiServices } from '../services/ApiServices';

class Model {
    constructor() {
        this._scheduledSessions = [];
    }

    // Get users
    loadFeaturedUsers() {
        return apiServices
            .loadFeaturedUsers()
            .then((featuredUsers) => {
                console.log(featuredUsers);
                return featuredUsers;
            });
    }

    // Return promise with data
    getScheduledSessions() {
        return new Promise((resolve, reject) => {
            if ( this._scheduledSessions.length ) {
                resolve(this._scheduledSessions);
            } else {
                Promise.all([
                    apiServices.loadSessions(),
                    apiServices.loadScheduledSessions()
                ])
                    .then(([sessions, scheduledSessions]) => {
                        // Filling our data model object
                        this._scheduledSessions = scheduledSessions.map(singleScheduledSession => {
                            // Creating single session object
                            const singleSession = {
                                ...singleScheduledSession,
                                sessionName
                            };
                            
                            // Traversing session API array to extract session name based on id
                            const sessionName = sessions.map(session => {
                                if (session.id === singleScheduledSession.profileId) {
                                    singleSession.sessionName = session.name;
                                }
                            });
    
                            return singleSession;
                        });
                        resolve(this._scheduledSessions);                   
                    })
                    .catch((error) => {
                        reject(error);
                        console.log(error);
                    });
            }

        });
    }

    deleteScheduledSession(id, sessionDate) {
        // Get session item
        const sessionItem = {...this._scheduledSessions.find( session => session.id === id )};

        // Remove sessionName property. We dont need it to update db
        delete sessionItem.sessionName;

        // Get if this sessions have 1 or more rounds
        const isSingleRound = sessionItem.roundsDefinition.length === 1;

        // If have just 1 session round we'll 'DELETE'
        if (isSingleRound) {
            return apiServices
                .deleteScheduledSession(id)
                .then((scheduledSessions) => {
                    // Update local data
                    this._scheduledSessions = this._scheduledSessions.filter( session => session.id !== id );
                    console.log(scheduledSessions);
                    return true;
                });
        } else { // If have more than 1 session round we'll 'PUT'
            // Filtering roundsDefinition to remove deleted round
            sessionItem.roundsDefinition = sessionItem.roundsDefinition.filter( round => round.startDate !== sessionDate )
            return apiServices
                .updateScheduledSession(id, sessionItem)
                .then((scheduledSessions) => {
                    console.log(scheduledSessions);
                    // Update local data
                    this._scheduledSessions = this._scheduledSessions.filter( session => session.id !== id );
                });
        }
    }

    // Get editable session data to fill the form
    editScheduledSessionFormData(id) {
        // Get session item
        return this._scheduledSessions.find( session => session.id === id );
    }

    // Edit session
    editScheduledSession(id, sessionDate, updatedGlobalData, updatedRound) {
        // Get session item
        const sessionItem = {...this._scheduledSessions.find( session => session.id === id )};

        // Get session name and removed. We dont need it to update db but needed to update local data
        const sessionName = sessionItem.sessionName;
        delete sessionItem.sessionName;

        // Get index of edited round
        const edittedRoundIndex = sessionItem.roundsDefinition.findIndex( round => round.startDate === sessionDate );
        sessionItem.roundsDefinition.splice(edittedRoundIndex, 1, updatedRound);

        // Update session item
        const sessionItemUpdated = {
            ...sessionItem,
            ...updatedGlobalData,
            roundsDefinition: sessionItem.roundsDefinition
        }

        console.log(sessionItem, sessionItemUpdated, sessionDate, updatedGlobalData, updatedRound, edittedRoundIndex, this._scheduledSessions);

        return apiServices
            .updateScheduledSession(id, sessionItemUpdated)
            .then((scheduledSessions) => {
                console.log(scheduledSessions);
                const updatedLocalData = {...sessionItemUpdated, sessionName: sessionName}
                const edittedSessionIndex = this._scheduledSessions.findIndex( session => session.id === id );
                this._scheduledSessions.splice(edittedSessionIndex, 1, updatedLocalData);
                console.log(this._scheduledSessions);
            });
    }

    async addScheduledSession(data) {
        // Get session
        const session = await apiServices.loadSingleSession(data.profileId);

        // If this session exist
        if (session) {
            return apiServices.addScheduledSession(data)
                .then(() => {
                    this._scheduledSessions = [];
                });
        }
    }
};

export { Model };