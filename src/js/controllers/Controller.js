import { Model } from '../model/Model';
import { View } from '../views/View';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // First test
        // this.view.testView(this.testViewHandler.bind(this));

        // Binding view first UI render action
        this.view.firstUiAppRender();

        // Binding view toggle saidebar action
        this.view.bindSideBarEvents();

        // Binding delete session action
        this.view.deleteScheduledSessionAction(this.deleteScheduledSessionHandler.bind(this));

        // Binding edit session modal action
        this.view.editScheduledSessionModalAction(this.editScheduledSessionModalHandler.bind(this));

        // Binding edit session action
        this.view.editScheduledSessionAction(this.editScheduledSessionHandler.bind(this));

        // Load data action
        this.model.getScheduledSessions()
            .then((scheduledSessions) => {
                console.log(scheduledSessions);
                this.view.renderScheduledSessions(scheduledSessions);
                this.view.toggleSpinner();
            });
    }

    deleteScheduledSessionHandler(id, sessionDate, isSingleRound) {
        this.view.toggleSpinner();
        this.model.deleteScheduledSession(id, sessionDate)
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

    editScheduledSessionModalHandler(id, sessionDate) {
        const sessionData = this.model.editScheduledSessionFormData(id);
        this.view.renderForm(sessionData, sessionDate, 'edit');
    }

    editScheduledSessionHandler(id, sessionDate, updatedGlobalData, updatedRound) {
        this.view.toggleSpinner();
        this.model.editScheduledSession(id, sessionDate, updatedGlobalData, updatedRound)
            .then(() => {
                this.view.renderUpdatedSession(id, sessionDate, updatedRound);
                this.view.renderAlertMessages('La sesión se ha actualizado con éxito', 'success');
            })
            .catch(() => {
                this.view.renderAlertMessages('Ha ocurrido un error', 'danger');
            })
            .finally(() => this.view.toggleSpinner());;
    }
}

const app = new Controller(new Model(), new View())

export { app };