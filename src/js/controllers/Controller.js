import { Model } from '../model/Model';
import { View } from '../views/View';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // First test
        // this.view.testView(this.testViewHandler.bind(this));

        // Binding view first UI render action
        // this.view.firstUiAppRender();

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

        // Load data action
        this.model.getScheduledSessions()
            .then((scheduledSessions) => {
                console.log(scheduledSessions);
                this.view.renderScheduledSessions(scheduledSessions);
            })
            .catch(() => {
                this.view.renderAlertMessages('Ha ocurrido un error', 'danger');
            })
            .finally(() => this.view.toggleSpinner());

        // Load featured users
        this.model.loadFeaturedUsers()
            .then((loadedUsers) => {
                this.view.firstUiAppRender(loadedUsers);
            })
            .catch(() => {
                this.view.renderAlertMessages('Ha ocurrido un error. No se ha podido conectar con la base de datos de los usuarios pro', 'danger');
            })
    }

    // Delete scheduled session handler
    deleteScheduledSessionHandler(id, sessionDate, isSingleRound) {
        this.view.toggleSpinner();
        this.model.deleteScheduledSession(id, sessionDate, isSingleRound)
            .then(() => {
                if (isSingleRound) {
                    this.view.renderDeletedSession(id);
                    this.view.renderAlertMessages('La sesión se ha eliminado con éxito', 'success');
                } else {
                    this.view.renderDeletedRound(id, sessionDate);
                    this.view.renderAlertMessages('La ronda de la sesión se ha eliminado con éxito', 'success');
                }
            })
            .catch(() => {
                this.view.renderAlertMessages('Ha ocurrido un error', 'danger');
            })
            .finally(() => this.view.toggleSpinner());
    }

    // Send data to modal handler
    editScheduledSessionModalHandler(id, sessionDate) {
        const sessionData = this.model.editScheduledSessionFormData(id);
        this.view.renderForm(sessionData, sessionDate, 'edit');
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
                this.view.renderAlertMessages('Ha ocurrido un error', 'danger');
            })
            .finally(() => this.view.toggleSpinner());
    }

    // Add scheduled session handler
    addScheduledSessionHandler(postData, filterObject) {
        this.view.toggleSpinner();

        this.model.addScheduledSession(postData)
            .then(() => {
                // Añadir filterObject en la llamada de abajo cuando tengamos la API real
                return this.model.getScheduledSessions(filterObject);
            })
            .then((scheduledSessions) => {
                console.log(scheduledSessions);
                this.view.renderScheduledSessions(scheduledSessions);
                this.view.renderAlertMessages('La sesión se ha añadido con éxito', 'success');
            })
            .catch(() => {
                this.view.renderAlertMessages('Ha ocurrido un error. Recarga la página.', 'danger');
            })
            .finally(() => this.view.toggleSpinner());

        console.log(postData);
    }

    filterScheduledSessionsHandler(filterObject) {
        console.log(filterObject);
        this.model.getScheduledSessions(filterObject)
            .then((scheduledSessions) => {
                console.log(scheduledSessions);
                this.view.renderScheduledSessions(scheduledSessions);
                // this.view.renderAlertMessages('La sesión se ha añadido con éxito', 'success');
            })
            .catch((error) => {
                console.log(error);
                this.view.renderAlertMessages('No existen sesiones programadas para el filtro seleccionado. Cambia los filtros y busca de nuevo', 'info');
            });
    }
}

const app = new Controller(new Model(), new View())

export { app };