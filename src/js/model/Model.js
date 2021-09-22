
import { apiServices } from '../services/ApiServices';

class Model {
    constructor() {
        this._scheduledSessions = [];
        this._sessions = [];
        this._users = [];
        this._filterObject = {};
    }

    // _insertScheduledSession(session) {
    //     this._scheduledSessions.push(session);
    //     return session;
    // }

    // loadData() {
    //     return Promise.all([
    //         this.loadScheduledSessions()
    //     ]);
    // }

    // // Get all schedule sessions in the database
    // loadScheduledSessions() {
    //     return new Promise((resolve, reject) => {
    //         apiServices
    //             .loadScheduledSessions()
    //             .then(sessions => {
    //                 sessions.forEach(session => this._insertScheduledSession(session));
    //                 resolve();
    //             })
    //             // .then(sessions => {
    //             //     // console.log(sessions);
    //             //     resolve(sessions);
    //             // })
    //             .catch(error => {
    //                 reject(error);
    //                 console.log(error);
    //             });
    //     });
    // }

    // getScheduledSessions() {
    //     console.log(this._scheduledSessions);
    //     return this._scheduledSessions;
    // }
};

export { Model };