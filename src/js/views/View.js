import * as Templates from './templates';
import { dateTimeFormater } from '../helpers/date-formatter';

class View {
    constructor() {
        // Header buttons
        this.headerActions = document.getElementById('headerActions');
        this.btnSidebar = document.getElementById('btnSidebar');
        this.btnSidebarSpans = this.btnSidebar.getElementsByTagName('span');
        this.btnNewSession = document.getElementById('btnNewSession');

        // Spinner
        this.spinner = document.getElementById('spinner');

        // Sidebar
        this.sidebar = document.getElementById('filterSidebar');
        this.dateStart = document.getElementById('filterSessionDateStart');
        this.dateEnd = document.getElementById('filterSessionDateEnd');

        // List
        this.scheduledSessionsList = document.getElementById('scheduledSessionsList');
        this.sessionsTableBody = document.getElementById('sessionsTableBody');
        this.scheduledSessionLi = document.getElementById('scheduledSessionLi').content;
        this.scheduledSessionTableRow = document.getElementById('scheduledSessionTableRow');

        // Action buttons
        this.btnDeleteSession = document.getElementById('btnDeleteSession');
        this.btnEditSession = document.querySelector('.btnEditSession');

        // Modal delete
        this.modelDelete = document.getElementById('deleteModal');
    }

    // First scheduled sessions render
    renderScheduledSessions(scheduledSessions) {
        // console.log(dateTimeFormater());
        scheduledSessions.forEach((session, index) => {
            // Getting session values
            const { sessionName, id, roundsDefinition } = session;

            const sessionRows = roundsDefinition.map((round, index) => {
                // Adding sessions table row
                const singleRow = Templates.scheduledSessionTableRowTemplate;

                // Find-Replace elements in template
                const findReplace = {
                    '{{sessionID}}': id,
                    '{{sessionDate}}': dateTimeFormater(round.startDate).formattedDate,
                    '{{sessionTime}}': dateTimeFormater(round.startDate).formattedTime,
                    '{{sessionUTCDate}}': round.startDate
                };

                // Return replaced singleRow template
                return singleRow.replace(new RegExp("(" + Object.keys(findReplace).map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|") + ")", "g"), function(s){ return findReplace[s]});
            });

            // Adding sessions li
            // Find-Replace elements in template
            const findReplace = {
                '{{sessionID}}': id,
                '{{sessionName}}': sessionName,
                '{{sessionShow}}': `${index === 0 ? "show" : ""}`,
                '{{sessionFirst}}': `${index > 0 ? "collapsed" : ""}`,
                '{{sessionTableRow}}': `${ sessionRows.join('') }`
            };

            // Replaced singleRow template
            const singleLi = Templates.scheduledSessionLi.replace(new RegExp("(" + Object.keys(findReplace).map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|") + ")", "g"), function(s){ return findReplace[s]});

            // Inserted to html
            this.scheduledSessionsList.insertAdjacentHTML('beforeend', singleLi);
        });
    }

    // Delete scheduled session
    deleteScheduledSessionAction(handler) {
        this.scheduledSessionsList.addEventListener('click', (event) => {
            const element = event.target;
            const elementClasses = element.classList;
            const isDeleteSessionButton = elementClasses.contains('btnDeleteSession');
            const isEditSessionButton = elementClasses.contains('btnEditSession');
            
            if (isDeleteSessionButton) {
                // Know if the session have mora than one round
                const isSingleRound = element.closest('table').getElementsByClassName("btnDeleteSession").length === 1;
                const sessionID = event.target.closest('tr').dataset.id;
                const sessionDate = event.target.closest('tr').dataset.date;
                confirmationModal(sessionID, sessionDate, isSingleRound);
                console.log(isSingleRound, sessionID, sessionDate);
            }
        });

        // Call confirmation delete modal
        const confirmationModal = (sessionID, sessionDate, isSingleRound) => {
            if (isSingleRound) {
                this.modelDelete.querySelector('.modal-body').innerHTML = 'Vas a ELIMINAR una sesión programada. ¿Estás seguro?';
            } else {
                this.modelDelete.querySelector('.modal-body').innerHTML = 'Vas a ELIMINAR una ronda en una sesión programada ¿Estás seguro?';
            }
            this.btnDeleteSession.addEventListener('click', () => {
                handler(sessionID, sessionDate, isSingleRound);
            });
        }
    }

    // Render items after delete session
    renderDeletedSession(sessionID) {
        const sessionToDelete = document.querySelector(`.list-group-item[data-id="${sessionID}"]`);
        sessionToDelete.remove();
    }

    // Render items after delete round
    renderDeletedRound(sessionID, sessionDate) {
        const roundToDelete = document.querySelector(`.list-group-item[data-id="${sessionID}"] .collapse-body table tbody tr[data-date="${sessionDate}"]`);
        roundToDelete.remove();
    }

    // First UI app render action
    firstUiAppRender() {
        document.addEventListener('DOMContentLoaded', event => {
            const currentDate = new Date();
            const currentDateToLocaleDateString = currentDate.toISOString().substr(0, 10);;
            this.dateStart.value = currentDateToLocaleDateString;
        });
    }

    // Sidebar toggle actions
    bindSideBarEvents() {
        this.headerActions.addEventListener('click', event => {
            const element = event.target;
            const elementId = element.id;
            const isBtnSidebar = elementId === 'btnSidebar';
            const isBtnNewSession = elementId === 'btnNewSession';
            // If element is the "sidebar toggle" button
            if (isBtnSidebar) {
                this.sidebar.classList.toggle('expand');
                element.classList.toggle('btn-white');
                element.classList.toggle('btn-outline-white');
                for(let i = 0; i < 2; i ++) {
                    this.btnSidebarSpans[i].classList.toggle('d-none');
                }
            }

            // If element is the "Add new session" button
            if (isBtnNewSession) {
                console.log(isBtnNewSession);
            }
        });
    }

    // Spinner toggle action
    toggleSpinner() {
        this.spinner.classList.toggle('d-none');
    }

    // Render alert messages
    renderAlertMessages(alertMassage, alertType) {
        // Find-Replace elements in alert
        const findReplace = {
            '{{alertType}}': alertType,
            '{{alertMassage}}': alertMassage
        };
        
        // Replaced elements
        const alertDiv = Templates.alertTemplate.replace(new RegExp("(" + Object.keys(findReplace).map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|") + ")", "g"), function(s){ return findReplace[s]});

        // Insert to html
        this.scheduledSessionsList.insertAdjacentHTML('beforebegin', alertDiv);

        // Set time out to remove alert message
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 5000);
        console.log(alertMassage, alertType, alertDiv);
    }
};

export { View };