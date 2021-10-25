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

    // Return promise with data
    getScheduledSessions(filterObject) {
        console.log(filterObject);
        return new Promise((resolve, reject) => {
            apiServices.loadScheduledSessions(filterObject ? filterObject : this._sessionFilter)
                .then((scheduledSessions) => {
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
                    console.log(this._sessionFilter);
                    resolve(this._scheduledSessions);
                })
                .catch((error) => {
                    reject(error);
                    // let offset = filterObject.offset - 1;
                    // this._sessionFilter = {
                    //     ...filterObject,
                    //     offset: offset--
                    // }
                    // console.log(filterObject, this._sessionFilter, offset);
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
                .then((scheduledSessions) => {
                    // Update local data
                    this._scheduledSessions = this._scheduledSessions.filter( session => session.id !== id );
                    return true;
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

    addScheduledSession(data) {
        return new Promise((resolve, reject) => {
           // Get session
            apiServices.loadSingleSession(data.profileId)
                .then((session) => {
                    // If this session exist
                    if (session) {
                        apiServices.addScheduledSession(data)
                            .then(() => {
                                resolve();
                            })
                            .catch(() => reject());
                    } else {
                        reject();
                    }
                }).catch(() => reject());
        });
    }

    // Filtering
    filterScheduledSession(data) {
        return apiServices.addScheduledSession(data)
            .then(() => {
                resolve();
            })
            .catch(() => reject());
    }
};

export { Model };