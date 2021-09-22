import * as Templates from './templates';

class View {
    constructor() {
        // Header buttons
        this.headerActions = document.getElementById('headerActions');
        this.btnSidebar = document.getElementById('btnSidebar');
        this.btnSidebarSpans = this.btnSidebar.getElementsByTagName('span');
        this.btnNewSession = document.getElementById('btnNewSession');

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

    // First UI app render action
    firstUiAppRender() {
        document.addEventListener('DOMContentLoaded', event => {
            const currentDate = new Date();
            const currentDateToLocaleDateString = currentDate.toISOString().substr(0, 10);;
            this.dateStart.value = currentDateToLocaleDateString;
            console.log(currentDateToLocaleDateString);
            // handler();
        });
    }

    // Sidebar actions
    toggleSidebar() {
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
};

export { View };