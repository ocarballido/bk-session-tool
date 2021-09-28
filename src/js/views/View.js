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
        this.btnDeleteSession = document.querySelector('.btnDeleteSession');
        this.btnEditSession = document.querySelector('.btnEditSession');
    }

    // First test
    // testView() {
    //     console.log('Oscar', this.btnSidebarSpans[0]);
    // }

    // First scheduled sessions render
    renderScheduledSessions(scheduledSessions) {
        // console.log(dateTimeFormater());
        scheduledSessions.forEach((session, index) => {
            // Getting session values
            const { sessionName, sessionID, sessionRounds } = session;

            const sessionRows = sessionRounds.map((round, index) => {
                // Adding sessions table row
                const singleRow = Templates.scheduledSessionTableRowTemplate;
                return singleRow.replace('{{sessionID}}', `${sessionID}`).replace('{{sessionDate}}', `${this.dateTimeFormater(round.startDate).formattedDate}`).replace('{{sessionTime}}', `${this.dateTimeFormater(round.startDate).formattedTime}`).replace('{{sessionUTCDate}}', `${round.startDate}`);
                // return `
                //     <tr data-id="${sessionID}">
                //         <td class="sessionBegins">${this.dateTimeFormater(round.startDate).formattedDate}</td>
                //         <td class="sessionTimes" scope="col"><span class="badge bg-white border border-light text-dark">${this.dateTimeFormater(round.startDate).formattedTime}</span></td>
                //         <td class="sessionActions text-end">
                //             <button id="btnEditSession" type="button" class="btn btn-sm btn-light">Editar</button>
                //             <button id="btnDeleteSession" type="button" class="btn bg-transparent text-danger btn-icon btn-sm"><span class="icon-delete"></span></button>
                //         </td>
                //     </tr>
                // `
            });

            // Adding sessions li
            const singleLi = Templates.scheduledSessionLi.replaceAll('{{sessionID}}', `${sessionID}`).replaceAll('{{sessionName}}',`${sessionName}`).replaceAll('{{sessionShow}}', `${index === 0 ? "show" : ""}`).replaceAll('{{sessionFirst}}', `${index > 0 ? "collapsed" : ""}`).replaceAll('{{sessionTableRow}}', `${ sessionRows.join('') }`);
            this.scheduledSessionsList.insertAdjacentHTML('beforeend', singleLi);
            // this.scheduledSessionsList.insertAdjacentHTML('beforeend', `
            //     <li class="list-group-item p-0" data-id="${sessionID}">
            //         <div class="${index > 0 ? "collapsed" : ""} p-3 d-flex align-items-center justify-content-between collapse-trigger" data-bs-toggle="collapse" href="#target-${sessionID}">
            //             ${sessionName}
            //             <span class="icon-expand-more text-dark"></span>
            //         </div>
            //         <div class="collapse collapse-body ${index === 0 ? "show" : ""}" id="target-${sessionID}">
            //             <table class="table table-hover m-0">
            //                 <thead>
            //                     <tr class="table-light">
            //                         <th class="sessionBegins" scope="col">Comienza</th>
            //                         <th class="sessionTimes" scope="col">Hora</th>
            //                         <th class="sessionActions text-end" scope="col">Acciones</th>
            //                     </tr>
            //                 </thead>
            //                 <tbody>
            //                 ${ sessionRows.join('') }
            //                 </tbody>
            //             </table>
            //         </div>
            //     </li>
            // `);
        });
    }

    // Delete scheduled session
    deleteScheduledSessionAction(handler) {
        // this.btnDeleteSession
        this.scheduledSessionsList.addEventListener('click', (event) => {
            const element = event.target;
            const elementClasses = element.classList;
            const isDeleteSessionButton = elementClasses.contains('btnDeleteSession');
            const isEditSessionButton = elementClasses.contains('btnEditSession');

            if (isDeleteSessionButton) {
                const sessionId = event.target.closest('tr').dataset.id;
                const sessionDate = event.target.closest('tr').dataset.date;
                // console.log(sessionId, sessionDate);
                handler(sessionId, sessionDate);
            }
        });
    }

    // Render items after delete session
    renderDeleteItem(sessionID, sessionDate) {
        const sessionToDelete = document.querySelector(`.list-group-item[data-id="${sessionID}"]`);
        sessionToDelete.remove();
        // console.log(sessionToDelete);
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
        const alertDiv = Templates.alertTemplate.replace('{{alertType}}', `${alertType}`).replace('{{alertMassage}}', `${alertMassage}`);
        this.scheduledSessionsList.insertAdjacentHTML('beforebegin', alertDiv);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 5000);
        console.log(alertMassage, alertType, alertDiv);
    }

    // API date and time formatter
    dateTimeFormater(APIDate) {
        const timeOptions = {
            hour: 'numeric', minute: 'numeric',
            hour12: true
        };
        const date = new Date(APIDate);
        const webLanguage = navigator.language;
        const formattedDate = new Intl.DateTimeFormat(webLanguage).format(date);
        const formattedTime = new Intl.DateTimeFormat(webLanguage, timeOptions).format(date);
        const formattedDateTime = `${formattedTime}`;
        return {
            date,
            formattedDate,
            webLanguage,
            formattedTime,
            formattedDateTime
        };
    }
};

export { View };