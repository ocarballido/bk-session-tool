import * as Templates from './templates';

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

        // Table
        this.sessionsTableBody = document.getElementById('sessionsTableBody');
    }

    // First test
    // testView() {
    //     console.log('Oscar', this.btnSidebarSpans[0]);
    // }

    // First scheduled sessions render
    renderScheduledSessions(scheduledSessions) {
        scheduledSessions.forEach(session => {
            // Getting session values
            const { sessionName, sessionID, sessionRounds } = session;

            // Loop sessionRounds
            sessionRounds.forEach((round, index) => {
                // Creating badges
                /*for(let y = 0; y < sessionRounds[i].times.length; y ++) {
                    let timeBadge = `<span class="badge bg-light text-dark">${sessionRounds[i].times[y]}</span>`;
                }*/

                const hours = round.times.map((time) => {
                    return `<span class="badge bg-light text-dark">${time}</span>`;
                });

                // Adding table row
                this.sessionsTableBody.insertAdjacentHTML(
                    'beforeend',
                    `
                        <tr class="${index === 0 ? 'sessionLeader' : ''}" data-id="${sessionID}">
                            <td class="sessionName">${sessionName}</td>
                            <td class="sessionBegins">${round.startDate}</td>
                            <td class="sessionTimes" scope="col">
                                ${ hours.join('&nbsp;') }
                            </td>
                            <td class="sessionActions text-end">
                                <button id="btnEditSession" type="button" class="btn btn-sm btn-light">Editar</button>
                                <button id="btnDeleteSession" type="button" class="btn btn-sm btn-danger text-white">Eliminar</button>
                            </td>
                        </tr>
                    `
                );
            });
        });
    }

    // First UI app render action
    firstUiAppRender() {
        document.addEventListener('DOMContentLoaded', event => {
            const currentDate = new Date();
            const currentDateToLocaleDateString = currentDate.toISOString().substr(0, 10);;
            this.dateStart.value = currentDateToLocaleDateString;
            // console.log(currentDateToLocaleDateString);
            // handler();
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
};

export { View };