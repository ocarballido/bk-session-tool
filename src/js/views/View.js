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

        // Modal Edit / Add
        this.modelEditAdd = document.getElementById('editAddSessionModal');
        this.editAddModalTitle = document.getElementById('editAddSessionLabel');
        this.editAddForm = document.getElementById('editAddForm');
        this.sessionName = document.getElementById('sessionName');
        this.addEditUserID = document.getElementById('addEditUserID');
        this.addEditProfileID = document.getElementById('addEditProfileID');
        this.addEditSessionID = document.getElementById('addEditSessionID');
        this.addEditEventID = document.getElementById('addEditEventID');
        this.addEditSessionDateStart = document.getElementById('addEditSessionDateStart');
        this.addEditProUsers = document.getElementById('addEditProUsers');
        this.addEditMaxUsers = document.getElementById('addEditMaxUsers');
        this.addEditrealWeather = document.getElementById('addEditrealWeather');
        this.addEditWarmUpTime = document.getElementById('addEditWarmUpTime');
        this.addEditMainPartMinSecconds = document.getElementById('addEditMainPartMinSecconds');
        this.buttonAddNew = document.getElementById('buttonAddNew');
        this.buttonUpdate = document.getElementById('buttonUpdate');
        this.featuredUserIds = [];
    }

    // First scheduled sessions render
    renderScheduledSessions(scheduledSessions) {
        // console.log(dateTimeFormater());
        scheduledSessions.forEach((session, index) => {
            // Getting session values
            const { sessionName, id, roundsDefinition, userId, profileId, sessionId, eventId, maxUsers, rules, isRealWeather, warmupSeconds, mainPartMinSeconds } = session;

            const sessionRows = roundsDefinition.map((round, index) => {
                // Adding sessions table row
                const singleRow = Templates.scheduledSessionTableRowTemplate;

                // Find-Replace elements in template
                const findReplace = {
                    '{{id}}': id,
                    '{{sessionDate}}': dateTimeFormater(round.startDate).formattedDate,
                    '{{sessionTime}}': dateTimeFormater(round.startDate).formattedTime,
                    '{{sessionUTCDate}}': round.startDate,
                    '{{featuredUserIds}}': round.featuredUserIds.join('-')
                };

                // Return replaced singleRow template
                return singleRow.replace(new RegExp("(" + Object.keys(findReplace).map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|") + ")", "g"), function(s){ return findReplace[s]});
            });

            // Adding sessions li
            // Find-Replace elements in template
            const findReplace = {
                '{{id}}': id,
                '{{sessionName}}': sessionName,
                '{{sessionShow}}': `${index === 0 ? "show" : ""}`,
                '{{sessionFirst}}': `${index > 0 ? "collapsed" : ""}`,
                '{{sessionTableRow}}': `${ sessionRows.join('') }`,
                '{{userId}}': userId,
                '{{profileId}}': profileId,
                '{{sessionId}}': sessionId,
                '{{eventId}}': eventId,
                '{{maxUsers}}': maxUsers,
                '{{rules}}': rules,
                '{{isRealWeather}}': isRealWeather,
                '{{warmupSeconds}}': warmupSeconds,
                '{{mainPartMinSeconds}}': mainPartMinSeconds
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
            
            if (isDeleteSessionButton) {
                // Know if the session have more than one round
                const isSingleRound = element.closest('table').getElementsByClassName("btnDeleteSession").length === 1;
                const id = event.target.closest('tr').dataset.id;
                const sessionDate = event.target.closest('tr').dataset.date;
                confirmationModal(id, sessionDate, isSingleRound);
            }
        });

        // Call confirmation delete modal
        const confirmationModal = (id, sessionDate, isSingleRound) => {
            if (isSingleRound) {
                this.modelDelete.querySelector('.modal-body').innerHTML = 'Vas a ELIMINAR una sesión programada. ¿Estás seguro?';
            } else {
                this.modelDelete.querySelector('.modal-body').innerHTML = 'Vas a ELIMINAR una ronda en una sesión programada ¿Estás seguro?';
            }
            this.btnDeleteSession.addEventListener('click', () => {
                handler(id, sessionDate, isSingleRound);
            });
        }
    }

    // Edit scheduled session
    // editScheduledSessionAction(handler) {
    //     this.scheduledSessionsList.addEventListener('click', (event) => {
    //         const element = event.target;
    //         const elementClasses = element.classList;
    //         const isEditSessionButton = elementClasses.contains('btnEditSession');

    //         if (isEditSessionButton) {
    //             const id = event.target.closest('tr').dataset.id;
    //             const sessionDate = new Date(event.target.closest('tr').dataset.date.split(".")[0]);
    //             const featuredUserIds = event.target.closest('tr').dataset.featuredUserIds.split('-');
    //             const sessionItem = {
    //                 id: event.target.closest('li').dataset.id,
    //                 userId: event.target.closest('li').dataset.userId,
    //                 profileId: event.target.closest('li').dataset.profileId,
    //                 sessionId: event.target.closest('li').dataset.sessionId,
    //                 eventId: event.target.closest('li').dataset.eventId,
    //                 maxUsers: event.target.closest('li').dataset.maxUsers,
    //                 rules: event.target.closest('li').dataset.rules,
    //                 isRealWeather: event.target.closest('li').dataset.isRealWeather,
    //                 warmupSeconds: event.target.closest('li').dataset.warmupSeconds,
    //                 mainPartMinSeconds: event.target.closest('li').dataset.mainPartMinSeconds,
    //                 sessionName: event.target.closest('li').dataset.sessionName,
    //             }

    //             // Hiding some form fields
    //             this.addEditUserID.closest('.form-group').classList.add('d-none');
    //             this.addEditProfileID.closest('.form-group').classList.add('d-none');
    //             this.addEditSessionID.closest('.form-group').classList.add('d-none');
    //             this.addEditEventID.closest('.form-group').classList.add('d-none');
    //             // this.addEditProUsers.closest('.form-group').classList.add('d-none');
    //             this.buttonAddNew.classList.add('d-none');

    //             // Setting form fields value
    //             this.editAddModalTitle.innerHTML = "Editar sesión";
    //             this.sessionName.value = sessionItem.sessionName;
    //             this.sessionName.disabled = true;
    //             //this.addEditSessionDateStart.value = sessionDate.split(".")[0];
    //             this.addEditSessionDateStart.value = sessionDate.toISOString().slice(0, -5);
    //             this.addEditMaxUsers.value = sessionItem.maxUsers;
    //             this.addEditrealWeather.value = sessionItem.isRealWeather ? 'yes' : 'no';
    //             this.addEditWarmUpTime.value = sessionItem.warmupSeconds;
    //             this.addEditMainPartMinSecconds.value = sessionItem.mainPartMinSeconds;
    //             const featuredUsersCollection = this.addEditProUsers.querySelector('#users');
    //             // Styling featured users toggle buttons
    //             featuredUserIds.forEach( (user, index) => {
    //                 featuredUsersCollection.querySelector(`[data-user-id="${user}"]`).classList.add('active');
    //             } );

    //             console.log(sessionItem, sessionDate);
    //             handler(id, sessionDate, sessionItem);
    //         }
    //     });
    // }

    // Edit modal action
    editScheduledSessionModalAction(handler) {
        this.scheduledSessionsList.addEventListener('click', (event) => {
            const element = event.target;
            const elementClasses = element.classList;
            const isEditSessionButton = elementClasses.contains('btnEditSession');

            // If the button pressed if edit, get session ID and startDtae
            if (isEditSessionButton) {
                const id = event.target.closest('tr').dataset.id;
                const sessionDate = event.target.closest('tr').dataset.date;
                handler(id, sessionDate);
            }
        });
    }

    // Render edit form
    renderEditForm(sessionData, sessionDate) {
        // Form fields values
        const { sessionName, maxUsers, isRealWeather, warmupSeconds, mainPartMinSeconds, id } = sessionData;
        this.featuredUserIds = sessionData.roundsDefinition.filter( round => round.startDate === sessionDate )[0].featuredUserIds;

        // Hiding some form fields
        this.addEditUserID.closest('.form-group').classList.add('d-none');
        this.addEditProfileID.closest('.form-group').classList.add('d-none');
        this.addEditSessionID.closest('.form-group').classList.add('d-none');
        this.addEditEventID.closest('.form-group').classList.add('d-none');
        this.buttonAddNew.classList.add('d-none');

        // Setting form fields value
        this.editAddForm.dataset.id = id;
        this.editAddModalTitle.innerHTML = "Editar sesión";
        this.sessionName.value = sessionName;
        this.sessionName.disabled = true;
        const date = sessionDate.split('T')[0];
        const time = dateTimeFormater(sessionDate).date.toLocaleString().slice(11, -3);
        // this.addEditSessionDateStart.value = new Date(sessionDate).toISOString().slice(0, -8);
        this.addEditSessionDateStart.value = `${date}T${time}`;
        this.addEditMaxUsers.value = maxUsers;
        this.addEditrealWeather.value = isRealWeather ? 'yes' : 'no';
        this.addEditWarmUpTime.value = warmupSeconds;
        this.addEditMainPartMinSecconds.value = mainPartMinSeconds;
        const featuredUsersCollection = this.addEditProUsers.querySelector('#users');
        // Styling featured users toggle buttons
        document.querySelectorAll(".btn-proUser").forEach(function(element) {
            element.classList.remove("active");
        });
        this.featuredUserIds.forEach( (user, index) => {
            featuredUsersCollection.querySelector(`[data-user-id="${user}"]`).classList.add('active');
        } );

        // this.editAddForm.addEventListener('submit', (event) => {
        //     event.preventDefault();
        //     const updatedData = {
        //         maxUsers: this.addEditMaxUsers.value,
        //         isRealWeather: this.addEditrealWeather.value,
        //         warmupSeconds: this.addEditWarmUpTime.value,
        //         mainPartMinSeconds: this.addEditMainPartMinSecconds.value,
        //         featuredUserIds: featuredUserIds,
        //         startDate: dateTimeFormater(this.addEditSessionDateStart.value).date.toISOString()
        //     }

        //     // this.editScheduledSessionAction([sessionData.id, updatedData]);
        // });
        
        console.log(date, time);
    }

    // Edit scheduled session Action
    editScheduledSessionAction(handler) {
        this.addEditProUsers.querySelector('#users').addEventListener('click', (event) => {
            const element = event.target;
            const isActive = element.classList.contains('active');
            const userId = element.getAttribute('data-user-id');
            if (isActive) {
                this.featuredUserIds.push(userId);
            } else {
                this.featuredUserIds = this.featuredUserIds.filter( user => user !== userId);
            }
        });
        
        this.editAddForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const id = this.editAddForm.getAttribute('data-id');
            const updatedData = {
                maxUsers: this.addEditMaxUsers.value,
                isRealWeather: this.addEditrealWeather.value,
                warmupSeconds: this.addEditWarmUpTime.value,
                mainPartMinSeconds: this.addEditMainPartMinSecconds.value,
                featuredUserIds: this.featuredUserIds,
                startDate: dateTimeFormater(this.addEditSessionDateStart.value).date.toISOString()
            }
            handler(id, updatedData);
        });
    }

    // Render items after delete session
    renderDeletedSession(id) {
        const sessionToDelete = document.querySelector(`.list-group-item[data-id="${id}"]`);
        sessionToDelete.remove();
    }

    // Render items after delete round
    renderDeletedRound(id, sessionDate) {
        const roundToDelete = document.querySelector(`.list-group-item[data-id="${id}"] .collapse-body table tbody tr[data-date="${sessionDate}"]`);
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