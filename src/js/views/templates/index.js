export const scheduledSessionLi = `
    <li 
        class="list-group-item p-0" 
        data-id="{{id}}"
        data-user-id="{{userId}}"
        data-profile-id="{{profileId}}"
        data-session-id="{{sessionId}}"
        data-event-id="{{eventId}}"
        data-max-users="{{maxUsers}}"
        data-rules="{{rules}}"
        data-is-real-weather="{{isRealWeather}}"
        data-warmup-seconds="{{warmupSeconds}}"
        data-main-part-min-seconds="{{mainPartMinSeconds}}"
        data-session-name="{{sessionName}}"
        data-featured-users-id="{{featuredUserIds}}"
    >
        <div class="{{sessionFirst}} p-3 d-flex align-items-center justify-content-between collapse-trigger" data-bs-toggle="collapse" href="#target-{{id}}">
            {{sessionName}}
            <span class="icon-expand-more text-dark"></span>
        </div>
        <div class="collapse collapse-body {{sessionShow}}" id="target-{{id}}">
            <table class="table table-hover m-0">
                <thead>
                    <tr class="table-light">
                        <th class="sessionBegins" scope="col">Comienza</th>
                        <th class="sessionTimes" scope="col">Hora</th>
                        <th class="sessionActions text-end" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {{sessionTableRow}}
                </tbody>
            </table>
        </div>
    </li>
`;
export const scheduledSessionTableRowTemplate = `
    <tr 
        data-id="{{id}}" 
        data-date="{{sessionUTCDate}}"
        data-featured-user-ids="{{featuredUserIds}}"
    >
        <td class="sessionBegins">{{sessionDate}}</td>
        <td class="sessionTimes" scope="col"><span class="badge bg-white border border-light text-dark">{{sessionTime}}</span></td>
        <td class="sessionActions text-end">
            <button type="button" data-bs-toggle="modal" data-bs-target="#editAddSessionModal" class="btnEditSession btn btn-sm btn-light me-1">Editar</button>
            <button type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" class="btnDeleteSession btn-delete btn bg-transparent text-danger btn-icon btn-sm"><span class="icon-delete"></span></button>
        </td>
    </tr>
`;
export const alertTemplate = `
    <div class="alert alert-{{alertType}} mx-0 mb-3 border-0" role="alert">{{alertMassage}}</div>
`;
export const roundTemplate = `
    <div class="singleRound add" data-round="{{roundNumber}}">
        <!-- Date start -->
        <div class="form-group floating-label mb-2">
            <input type="datetime-local" class="form-control" id="addSessionDateStart-{{roundNumber}}" placeholder="Dede" tabindex="2" name="addSessionDateStart-{{roundNumber}}" valiue="" >
            <label for="addSessionDateStart-{{roundNumber}}">Desde</label>
        </div>
        <!-- /Date start -->

        <!-- Session user -->
        <div class="addEditProUsers form-group">
            <div class="users">
                <button data-user-id="133479" type="button" data-bs-toggle="button" class="btn btn-outline-success btn-proUser btn-sm mb-1 btn-text-icon">Juan de la Pin García <span class="icon-add"></span></button>
                <button data-user-id="2" type="button" data-bs-toggle="button" class="btn btn-outline-success btn-proUser btn-sm mb-1 btn-text-icon">Mariana Grajales <span class="icon-add"></span></button>
                <button data-user-id="3" type="button" data-bs-toggle="button" class="btn btn-outline-success btn-proUser btn-sm mb-1 btn-text-icon">Sabino Pupo <span class="icon-add"></span></button>
                <button data-user-id="4" type="button" data-bs-toggle="button" class="btn btn-outline-success btn-proUser btn-sm mb-1 btn-text-icon">Vilma Espín <span class="icon-add"></span></button>
                <button data-user-id="5" type="button" data-bs-toggle="button" class="btn btn-outline-success btn-proUser btn-sm mb-1 btn-text-icon">Ernesto Nieblas <span class="icon-add"></span></button>
                <button data-user-id="6" type="button" data-bs-toggle="button" class="btn btn-outline-success btn-proUser btn-sm mb-1 btn-text-icon">Efreen Dubois <span class="icon-add"></span></button>
                <button data-user-id="7" type="button" data-bs-toggle="button" class="btn btn-outline-success btn-proUser btn-sm mb-1 btn-text-icon">Elpidio Valdés <span class="icon-add"></span></button>
                <button data-user-id="8" type="button" data-bs-toggle="button" class="btn btn-outline-success btn-proUser btn-sm mb-1 btn-text-icon">María Silvia <span class="icon-add"></span></button>
                <button data-user-id="9" type="button" data-bs-toggle="button" class="btn btn-outline-success btn-proUser btn-sm mb-1 btn-text-icon">Solomón Montoya <span class="icon-add"></span></button>
                <button data-user-id="10" type="button" data-bs-toggle="button" class="btn btn-outline-success btn-proUser btn-sm mb-1 btn-text-icon">Esteban Lazo <span class="icon-add"></span></button>
            </div>
        </div>
        <!-- /Session user -->
    </div>
`;