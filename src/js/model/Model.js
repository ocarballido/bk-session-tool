import { offset } from '@popperjs/core';
import { apiServices } from '../services/ApiServices';
import { paginationLimmit } from '../helpers/offsetLimit';

class Model {
    constructor() {
        this._scheduledSessions = [];
        this._sessionFilter = {
            startDate: new Date().toISOString(),
            offset: 0,
            limit: paginationLimmit
        };
    }

    // Get users
    loadFeaturedUsers() {
        return apiServices
            .loadFeaturedUsers()
            .then((featuredUsers) => {
                return featuredUsers;
            });
    }

    // Get events
    loadEvents() {
        return apiServices
            .loadEvents()
            .then((events) => {
                return events;
            });
    }

    // Get users and events
    loadFeaturedUsersAndEvents() {
        return new Promise((resolve, reject) => {
            Promise.all([
                apiServices.loadFeaturedUsers(),
                apiServices.loadEvents()
            ])
                .then(([featuredUsers, events]) => {
                    resolve([featuredUsers, events]);
                }).catch((error) => {
                    reject(error);
                    console.log(error);
                });
        });
    }

    // Return promise with data
    getScheduledSessions(filterObject) {
        return new Promise((resolve, reject) => {
            apiServices.loadScheduledSessions(filterObject ? filterObject : this._sessionFilter)
                .then((scheduledSessions) => {
                    try {
                        const idProfilePromises = scheduledSessions.map(singleProfileId => {
                            return apiServices.loadSingleSession(singleProfileId.profileId)
                                .then((session) => session.profileName);
                        });
                        Promise.all(idProfilePromises)
                            .then((results) => {
                                this._scheduledSessions = scheduledSessions.map((singleScheduledSession, index) => {
                                    // Creating single session object
                                    const singleSession = {
                                        ...singleScheduledSession,
                                        sessionName: results[index]
                                    };
                                    return singleSession;
                                });
                                this._sessionFilter = {
                                    ...filterObject
                                }
                                console.log(this._scheduledSessions);
                                resolve(this._scheduledSessions);
                            });
                    } catch (error) {
                        console.log(error)
                        if (error) {
                            // Filling our data model object
                            this._scheduledSessions = scheduledSessions.map(singleScheduledSession => {
                                
                                // Creating single session object
                                const singleSession = {
                                    ...singleScheduledSession
                                };
                                return singleSession;
                            });
                            this._sessionFilter = {
                                ...filterObject
                            }
                            resolve(this._scheduledSessions);
                        }
                    }
                    
                })
                .catch((error) => {
                    reject(error);
                    console.log(error);
                });

        });
    }

    deleteScheduledSession(id, sessionDate, isSingleRound) {
        // Get session item
        const sessionItem = {...this._scheduledSessions.find( session => session.id === id )};

        // Remove sessionName property. We dont need it to update db
        delete sessionItem.sessionName;

        // If have just 1 session round we'll 'DELETE'
        if (isSingleRound) {
            return apiServices
                .deleteScheduledSession(id)
                .then(() => {
                    // Update local data
                    this._scheduledSessions = [];
                });
        } else { // If have more than 1 session round we'll 'PUT'
            // Filtering roundsDefinition to remove deleted round
            sessionItem.roundsDefinition = sessionItem.roundsDefinition.filter( round => round.startDate !== sessionDate );
            return apiServices
                .updateScheduledSession(id, sessionItem)
                .then(() => {
                    // Get index of session editted
                    const sessionRoundDeletedIndex = this._scheduledSessions.findIndex( session => session.id === id );

                    // Update local data
                    this._scheduledSessions[sessionRoundDeletedIndex].roundsDefinition = this._scheduledSessions[sessionRoundDeletedIndex].roundsDefinition.filter( round => round.startDate !== sessionDate );
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

        return apiServices
            .updateScheduledSession(id, sessionItemUpdated)
            .then((scheduledSessions) => {
                const updatedLocalData = {...sessionItemUpdated, sessionName: sessionName}
                const edittedSessionIndex = this._scheduledSessions.findIndex( session => session.id === id );
                this._scheduledSessions.splice(edittedSessionIndex, 1, updatedLocalData);
            });
    }

    // Check profile ID
    checkProfileId(sessionId) {
        return apiServices.loadSingleSession(sessionId)
            .then((session) => {
                return session;
            });
    }

    // Add scheduled session
    addScheduledSession(data) {
        return apiServices.addScheduledSession(data);
    }
};

export { Model };