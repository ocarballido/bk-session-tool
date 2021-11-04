import { Model } from '../model/Model';
import { View } from '../views/View';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Binding view toggle saidebar action
        this.view.bindSideBarEvents();

        // Binding delete session action
        this.view.deleteScheduledSessionAction(this.deleteScheduledSessionHandler.bind(this));

        // Binding edit session modal action
        this.view.editScheduledSessionModalAction(this.editScheduledSessionModalHandler.bind(this));

        // Binding add session action
        this.view.editScheduledSessionAction(this.editScheduledSessionHandler.bind(this));

        // Binding edit session action
        this.view.addScheduledSessionAction(this.addScheduledSessionHandler.bind(this));

        // Binding filter session action
        this.view.filterScheduledSessionsAction(this.filterScheduledSessionsHandler.bind(this));

        // Binding pagination session action
        this.view.paginationAction(this.paginationHandler.bind(this));

        // Binding check profile id action
        this.view.checkProfileIdAction(this.checkProfileIdHandler.bind(this));

        // Get token and load
        this.model.checkForToken()
            .then((token) => {
                console.log(token)
                sessionStorage.setItem('loggedUserId', token[1]);
                return token;
            })
            .then(() => {
                this.model.getScheduledSessions()
                    .then((scheduledSessions) => {
                        console.log(scheduledSessions);
                        this.view.renderScheduledSessions(scheduledSessions);
                        if (!scheduledSessions.length) {
                            this.view.renderAlertMessages('No existen sesiones programadas en adelante. Filtra de nuevo', 'info');
                        }
                    });
                    this.model.loadFeaturedUsersAndEvents()
                        .then(([featuredUsers, events]) => {
                            this.view.firstUiAppRender(featuredUsers, events);
                        })
                        .catch((error) => {
                            this.view.renderAlertMessages('Ha ocurrido un error. No se ha podido conectar con la base de datos de los usuarios pro o los eventos de BKOOL. Vuelve a intentarlo mas tarde', 'danger');
                            console.log(error);
                        });
            })
            .catch(() => {
                this.view.renderAlertMessages('Ha ocurrido un error. No se ha podido conectar con la base de datos de las sesiones programdas. Vuelve a intentarlo mas tarde', 'danger');
            })
            .finally(() => this.view.toggleSpinner());;

        // Load data action
        // this.model.getScheduledSessions()
        //     .then((scheduledSessions) => {
        //         console.log(scheduledSessions);
        //         this.view.renderScheduledSessions(scheduledSessions);
        //         if (!scheduledSessions.length) {
        //             this.view.renderAlertMessages('No existen sesiones programadas en adelante. Filtra de nuevo', 'info');
        //         }
        //     })
        //     .catch(() => {
        //         this.view.renderAlertMessages('Ha ocurrido un error. No se ha podido conectar con la base de datos de las sesiones programdas. Vuelve a intentarlo mas tarde', 'danger');
        //     })
        //     .finally(() => this.view.toggleSpinner());

        // Load featured users and events
        // this.model.loadFeaturedUsersAndEvents()
        //     .then(([featuredUsers, events]) => {
        //         this.view.firstUiAppRender(featuredUsers, events);
        //     })
        //     .catch((error) => {
        //         this.view.renderAlertMessages('Ha ocurrido un error. No se ha podido conectar con la base de datos de los usuarios pro o los eventos de BKOOL. Vuelve a intentarlo mas tarde', 'danger');
        //         console.log(error);
        //     });
    }

    // Delete scheduled session handler
    deleteScheduledSessionHandler(id, sessionDate, isSingleRound, filterObject) {
        this.view.toggleSpinner();
        this.model.deleteScheduledSession(id, sessionDate, isSingleRound)
            .then(() => {
                if (isSingleRound) {
                    // this.view.renderDeletedSession(id);
                    console.log(filterObject)
                    this.model.getScheduledSessions(filterObject)
                        .then((scheduledSessions) => {
                            this.view.renderScheduledSessions(scheduledSessions);
                            this.view.renderAlertMessages('La sesión se ha eliminado con éxito', 'success');
                        });
                } else {
                    this.view.renderDeletedRound(id, sessionDate);
                    this.view.renderAlertMessages('La ronda de la sesión se ha eliminado con éxito', 'success');
                    // return this.model.getScheduledSessions(filterObject);
                }
            })
            .catch((error) => {
                this.view.renderAlertMessages('Ha ocurrido un error. No se ha podido conectar con la base de datos de las sesiones programdassssssdelete.', 'danger');
                console.log(error);
            })
            .finally(() => this.view.toggleSpinner());
    }

    // Send data to modal handler
    editScheduledSessionModalHandler(id, sessionDate) {
        const sessionData = this.model.editScheduledSessionFormData(id);
        this.view.renderForm(sessionData, sessionDate, 'edit');
        console.log(sessionDate)
    }

    // Edit scheduled session handler
    editScheduledSessionHandler(id, sessionDate, updatedGlobalData, updatedRound) {
        this.view.toggleSpinner();
        this.model.editScheduledSession(id, sessionDate, updatedGlobalData, updatedRound)
            .then((data) => {
                this.view.renderUpdatedSession(id, sessionDate, updatedRound);
                this.view.renderAlertMessages('La sesión se ha actualizado con éxito', 'success');
                console.log(data);
            })
            .catch(() => {
                this.view.renderAlertMessages('Ha ocurrido un error. No se ha podido conectar con la base de datos de las sesiones programdas', 'danger');
            })
            .finally(() => this.view.toggleSpinner());
    }

    // Check profile Id handler
    checkProfileIdHandler(sessionId) {
        console.log(sessionId);
        this.view.toggleSpinner();

        this.model.checkProfileId(sessionId)
            .then((session) => {
                this.view.renderCheckProfileIdAction(sessionId);
                console.log(session.profileId);
            }).catch((error) => {
                this.view.renderCheckProfileIdAction(undefined);
                console.log(error);
                console.log(session.profileId);
            })
            .finally(() => this.view.toggleSpinner());
    }

    // Add scheduled session handler
    addScheduledSessionHandler(postData, filterObject) {
        this.view.toggleSpinner();

        this.model.addScheduledSession(postData)
            .then(() => this.model.getScheduledSessions(filterObject))
            .then((scheduledSessions) => {
                console.log(scheduledSessions);
                this.view.renderScheduledSessions(scheduledSessions);
                this.view.renderAlertMessages('La sesión se ha añadido con éxito', 'success');
            })
            .catch((error) => {
                this.view.renderAlertMessages('Ha ocurrido un error. No se ha podido conectar con la base de datos de las sesiones programdasssssssssADD', 'danger');
                console.log(error);
            })
            .finally(() => this.view.toggleSpinner());

        console.log(postData);
    }

    filterScheduledSessionsHandler(filterObject) {
        console.log(filterObject);
        this.view.toggleSpinner();
        this.model.getScheduledSessions(filterObject)
            .then((scheduledSessions) => {
                console.log(scheduledSessions);
                this.view.renderScheduledSessions(scheduledSessions);
                if (!scheduledSessions.length) {
                    this.view.renderAlertMessages('No existen sesiones programadas para el filtro seleccionado. Filtra de nuevo', 'info');
                }
            })
            .catch((error) => {
                console.log(error);
                this.view.renderAlertMessages('Ha ocurrido un error', 'danger');
            })
            .finally(() => this.view.toggleSpinner());;
    }

    paginationHandler(filterObject) {
        console.log(filterObject);
        this.view.toggleSpinner();
        this.model.getScheduledSessions(filterObject)
            .then((scheduledSessions) => {
                console.log(scheduledSessions);
                this.view.renderScheduledSessions(scheduledSessions);
                if (!scheduledSessions.length) {
                    this.view.renderAlertMessages('No existen más sesiones programadas en adelante. Filtra de nuevo', 'info');
                }
            })
            .catch((error) => {
                console.log(error);
                this.view.renderAlertMessages('Ha ocurrido un error.', 'danger');
            })
            .finally(() => this.view.toggleSpinner());;
    }
}

const app = new Controller(new Model(), new View())

export { app };