import * as Templates from './templates';
import { dateTimeFormater, todayDateTime } from '../helpers/date-formatter';

class View {
    constructor() {
        // Global variables
        this.userId = 636823468237648327642837;

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
        this.editSessionDateStart = document.getElementById('editSessionDateStart');
        // this.addEditProUsers = document.getElementById('addEditProUsers');
        this.addEditMaxUsers = document.getElementById('addEditMaxUsers');
        this.addEditrealWeather = document.getElementById('addEditrealWeather');
        this.addEditWarmUpTime = document.getElementById('addEditWarmUpTime');
        this.addEditMainPartMinSecconds = document.getElementById('addEditMainPartMinSecconds');
        this.buttonAddNew = document.getElementById('buttonAddNew');
        this.buttonUpdate = document.getElementById('buttonUpdate');
        this.addRound = document.getElementById('addRound');
        this.buttonAddRound = document.getElementById('buttonAddRound');
        this.rounds = document.getElementById('rounds');
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

    // Add new session
    // addScheduledSessionModalAction(handler) {
    //     this.btnNewSession.addEventListener('click', (event) => {
            
    //     });
    // }

    // Render edit form
    renderForm(sessionData, sessionDate, type) {
        if (type === 'edit') {
            // Form fields values
            const { sessionName, maxUsers, isRealWeather, warmupSeconds, mainPartMinSeconds, id } = sessionData;
            let proUsers = sessionData.roundsDefinition.filter( round => round.startDate === sessionDate )[0].featuredUserIds;

            // Hiding some form fields
            this.addEditUserID.closest('.form-group').classList.add('d-none');
            this.addEditProfileID.closest('.form-group').classList.add('d-none');
            this.addEditSessionID.closest('.form-group').classList.add('d-none');
            this.addEditEventID.closest('.form-group').classList.add('d-none');
            this.buttonAddNew.classList.add('d-none');
            this.addRound.classList.add('d-none');
            document.querySelectorAll('.singleRound.add').forEach( elm => elm.classList.add('d-none'));

            // Showing some form fields
            this.sessionName.closest('.form-group').classList.remove('d-none');
            this.buttonUpdate.classList.remove('d-none');
            document.querySelector('.singleRound.edit').classList.remove('d-none');

            // Setting form fields value
            this.editAddForm.dataset.id = id;
            this.editAddForm.dataset.date = sessionDate;
            this.editAddModalTitle.innerHTML = "Editar sesión";
            this.sessionName.value = sessionName;
            this.sessionName.disabled = true;
            const date = sessionDate.split('T')[0];
            const time = dateTimeFormater(sessionDate).date.toLocaleString().slice(11, -3);
            this.editSessionDateStart.value = `${date}T${time}`;
            this.editSessionDateStart.setAttribute('min', todayDateTime());
            this.addEditMaxUsers.value = maxUsers;
            this.addEditrealWeather.value = isRealWeather ? 'yes' : 'no';
            this.addEditWarmUpTime.value = warmupSeconds;
            this.addEditMainPartMinSecconds.value = mainPartMinSeconds;
            const featuredUsersCollection = document.querySelector('.singleRound.edit .addEditProUsers .users');
            // Styling featured users toggle buttons
            document.querySelectorAll(".singleRound.edit .addEditProUsers .users .btn-proUser").forEach(function(element) {
                element.classList.remove("active");
            });
            proUsers.forEach( (user, index) => {
                featuredUsersCollection.querySelector(`[data-user-id="${user}"]`).classList.add('active');
            } );
        } else if (type === 'add') {
            // Hiding form fields
            this.sessionName.closest('.form-group').classList.add('d-none');
            this.buttonUpdate.classList.add('d-none');
            this.addRound.classList.remove('d-none');
            document.querySelector('.singleRound.edit').classList.add('d-none');

            // Showing some form fields
            this.addEditUserID.closest('.form-group').classList.remove('d-none');
            this.addEditProfileID.closest('.form-group').classList.remove('d-none');
            this.addEditSessionID.closest('.form-group').classList.remove('d-none');
            this.addEditEventID.closest('.form-group').classList.remove('d-none');
            this.buttonAddNew.classList.remove('d-none');
            document.querySelectorAll('.singleRound.add').forEach( elm => elm.classList.remove('d-none'));

            // Setting form fields value
            this.editAddForm.dataset.id = '';
            this.editAddForm.dataset.date = '';
            this.editAddModalTitle.innerHTML = "Añadir nueva sesión programada";
            this.sessionName.value = '';
            this.sessionName.disabled = true;
            document.getElementById('addSessionDateStart-1').value = todayDateTime();
            document.getElementById('addSessionDateStart-1').setAttribute('min', todayDateTime());
            this.addEditMaxUsers.value = 10;
            this.addEditrealWeather.value = 'yes';
            this.addEditWarmUpTime.value = 600;
            this.addEditMainPartMinSecconds.value = 300;
            
            // Styling featured users toggle buttons
            document.querySelectorAll(".btn-proUser").forEach(function(element) {
                element.classList.remove("active");
            });
            console.log(todayDateTime())
        }
    }

    // Edit scheduled session Action
    editScheduledSessionAction(handler) {
        // Getting ids of pro users
        let proUsersArr = [];
        const proUsersNode = document.querySelectorAll('.singleRound.edit[data-round="0"] .users .btn-proUser');

        this.modelEditAdd.addEventListener('shown.bs.modal', (event) => {
            [...proUsersNode].forEach(button => {
                const userId = button.getAttribute('data-user-id');
                if (button.classList.contains('active')) {
                    proUsersArr.push(userId);
                    console.log('tiene');
                } else {
                    proUsersArr = proUsersArr.filter( user => user !== userId);
                    console.log('no tiene');
                }
            });
        });

        this.editAddForm.addEventListener('click', (event) => {
            const element = event.target;
            const isBtnProUser = element.classList.contains('btn-proUser');

            if (isBtnProUser) {
                const isEdit = element.closest('.singleRound').classList.contains('edit');
                const isActive = element.classList.contains('active');
                const userId = element.getAttribute('data-user-id');
                if (isEdit) {
                    if (isActive) {
                        proUsersArr.push(userId);
                    } else {
                        proUsersArr = proUsersArr.filter( user => user !== userId);
                    }
                }
            }
        });
        
        // Submmiting data
        this.buttonUpdate.addEventListener('click', (event) => {
            event.preventDefault();
            const id = this.editAddForm.getAttribute('data-id');
            const sessionDate = this.editAddForm.getAttribute('data-date');
            const updatedGlobalData = {
                maxUsers: parseInt(this.addEditMaxUsers.value),
                isRealWeather: this.addEditrealWeather.value === 'yes' ? true : false,
                warmupSeconds: parseInt(this.addEditWarmUpTime.value),
                mainPartMinSeconds: parseInt(this.addEditMainPartMinSecconds.value)
            }
            const updatedRound = {
                startDate: dateTimeFormater(this.editSessionDateStart.value).date.toISOString(),
                featuredUserIds: proUsersArr,
            };
            handler(id, sessionDate, updatedGlobalData, updatedRound);
        });
    }

    // Add scheduled session Action
    addScheduledSessionAction(handler) {
        let proUsersArr = [];
        let numberOfRounds = 1;
        this.editAddForm.addEventListener('click', (event) => {
            const element = event.target;
            const isBtnProUser = element.classList.contains('btn-proUser');
            const isRemoveRoundButton = element.classList.contains('btn-danger');
            const isButtonAddRound = element.id;

            if (isBtnProUser) {
                const isAdd = element.closest('.singleRound').classList.contains('add');
                const isActive = element.classList.contains('active');
                const userId = element.getAttribute('data-user-id');
                if (isAdd) {
                    if (isActive) {
                        proUsersArr.push(userId);
                    } else {
                        proUsersArr = proUsersArr.filter( user => user !== userId);
                    }
                }
            } else if (isButtonAddRound === 'buttonAddRound') { // Check if element is add round button
                // Add 1 to numerOfRound
                numberOfRounds ++;

                // Get first element round
                const roundElement = document.querySelector(`.singleRound.add[data-round="1"]`);

                // Clone element round
                const clonedRoundElement = roundElement.cloneNode(true);

                // Change data-round value
                clonedRoundElement.dataset.round = numberOfRounds;

                // Change id value
                clonedRoundElement.querySelector('.floating-label input[type=datetime-local]').id = `addSessionDateStart-${numberOfRounds}`;

                // Change name attr
                clonedRoundElement.querySelector('.floating-label input[type=datetime-local]').name = `addSessionDateStart-${numberOfRounds}`;

                // Change input value
                clonedRoundElement.querySelector('.floating-label input[type=datetime-local]').value = todayDateTime();

                // Change input min attr
                clonedRoundElement.querySelector('.floating-label input[type=datetime-local]').setAttribute('min', todayDateTime());

                // Change label for attr
                clonedRoundElement.querySelector('.floating-label label').setAttribute('for', `addSessionDateStart-${numberOfRounds}`);

                // Create remove button
                const roundRemoveButton = document.createElement('button');
                roundRemoveButton.classList.add('btn', 'btn-sm', 'btn-danger', 'mb-1', 'text-white');
                roundRemoveButton.innerHTML = 'Eliminar ronda';
                clonedRoundElement.querySelector('.addEditProUsers .users').appendChild(roundRemoveButton);

                // Add round to DOM
                this.rounds.appendChild(clonedRoundElement);

                // document.querySelector(`.singleRound.add[data-round="${numberOfRounds - 1}"]`).insertAdjacentHTML('afterend', clonedRoundElement.innerHTML);
            } else if (isRemoveRoundButton) {
                event.preventDefault();
                const roundToRemove = element.closest('.singleRound');
                roundToRemove.remove();
            }
            console.log(proUsersArr);
        });
        // this.rounds.addEventListener('click', (event) => {
        //     const element = event.target;
        //     const isProUserButton = element.classList.contains('btn-proUser');
        //     const isRemoveRoundButton = element.classList.contains('btn-danger');
        //     const isButtonAddRound = element.id;
        //     // Check if element is pro user button
        //     if (isProUserButton) {
        //         // Getting ids of pro users
        //         let proUsersArr = [];
        //         let roundsDefinition = [];
        //         document.querySelector('.singleRound.add .users').addEventListener('click', (event) => {
        //             const element = event.target;
        //             const roundElementNumber = element.closest('.singleRound.add').getAttribute('data-round');
        //             console.log(roundElementNumber);
        //             if (element.classList.contains('btn-proUser')) {
        //                 const proUsersNode = document.querySelectorAll(`.singleRound.add[data-round="${roundElementNumber}"] .users .btn-proUser`);
        //                 proUsersArr = [];
        //                 [...proUsersNode].forEach(button => {
        //                     const userId = button.getAttribute('data-user-id');
        //                     if (button.classList.contains('active')) {
        //                         proUsersArr.push(userId);
        //                         console.log(proUsersArr);
        //                     } else {
        //                         proUsersArr = proUsersArr.filter( user => user !== userId);
        //                         console.log(proUsersArr);
        //                     }
        //                 });
        //             }
        //         });
        //     } else if (isButtonAddRound === 'buttonAddRound') { // Check if element is add round button
        //         // Add 1 to numerOfRound
        //         numberOfRounds ++;

        //         // Get first element round
        //         const roundElement = document.querySelector(`.singleRound.add[data-round="1"]`);

        //         // Clone element round
        //         const clonedRoundElement = roundElement.cloneNode(true);

        //         // Change data-round value
        //         clonedRoundElement.dataset.round = numberOfRounds;

        //         // Change id value
        //         clonedRoundElement.querySelector('.floating-label input[type=datetime-local]').id = `addSessionDateStart-${numberOfRounds}`;

        //         // Change name attr
        //         clonedRoundElement.querySelector('.floating-label input[type=datetime-local]').name = `addSessionDateStart-${numberOfRounds}`;

        //         // Change input value
        //         clonedRoundElement.querySelector('.floating-label input[type=datetime-local]').value = todayDateTime();

        //         // Change input min attr
        //         clonedRoundElement.querySelector('.floating-label input[type=datetime-local]').setAttribute('min', todayDateTime());

        //         // Change label for attr
        //         clonedRoundElement.querySelector('.floating-label label').setAttribute('for', `addSessionDateStart-${numberOfRounds}`);

        //         // Create remove button
        //         const roundRemoveButton = document.createElement('button');
        //         roundRemoveButton.classList.add('btn', 'btn-sm', 'btn-danger', 'mb-1', 'text-white');
        //         roundRemoveButton.innerHTML = 'Eliminar ronda';
        //         clonedRoundElement.querySelector('.addEditProUsers .users').appendChild(roundRemoveButton);

        //         // Add round to DOM
        //         this.rounds.prepend(clonedRoundElement);

        //         // document.querySelector(`.singleRound.add[data-round="${numberOfRounds - 1}"]`).insertAdjacentHTML('afterend', clonedRoundElement.innerHTML);
        //     } else if (isRemoveRoundButton) {
        //         event.preventDefault();
        //         const roundToRemove = element.closest('.singleRound');
        //         roundToRemove.remove();
        //     }
        // });
        
        // Submmiting data
        this.buttonAddNew.addEventListener('click', (event) => {
            event.preventDefault();

            // Creating data
            const updatedGlobalData = {
                userId: this.userId,
                profileId: parseInt(this.addEditProfileID.value),
                sessionId: parseInt(this.addEditSessionID.value),
                eventId: this.addEditEventID.value,
                // roundsDefinition: [

                // ],
                maxUsers: parseInt(this.addEditMaxUsers.value),
                rules: 'COMPETITIVE',
                isRealWeather: this.addEditrealWeather.value === 'yes' ? true : false,
                launchOptions: {
                    maxInstances: 3,
                    maxSeconds: 300
                },
                warmupSeconds: parseInt(this.addEditWarmUpTime.value),
                mainPartMinSeconds: parseInt(this.addEditMainPartMinSecconds.value)
            };
            const updatedRound = {
                startDate: dateTimeFormater(this.editSessionDateStart.value).date.toISOString(),
                // featuredUserIds: proUsersArr,
            };
            handler(updatedGlobalData);
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

    // Render items after updated session
    renderUpdatedSession(id, sessionDate, updatedRound) {
        const roundToUpdate = document.querySelector(`.list-group-item[data-id="${id}"] .collapse-body table tbody tr[data-date="${sessionDate}"]`);
        roundToUpdate.dataset.date = updatedRound.startDate;
        const dateTd = roundToUpdate.querySelector('.sessionBegins');
        const timeTd = roundToUpdate.querySelector('.sessionTimes .badge');
        dateTd.innerHTML = dateTimeFormater(updatedRound.startDate).formattedDate;
        timeTd.innerHTML = dateTimeFormater(updatedRound.startDate).formattedTime;
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
                this.renderForm(null, null, 'add')
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
    }
};

export { View };