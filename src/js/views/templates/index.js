export const scheduledSessionTemplate = `
    <tr data-id="{{sessionID}}">
        <td class="sessionName">{{sessionName}}</td>
        <td class="sessionBegins">{{sessionDate}}</td>
        <td class="sessionTimes" scope="col">
            
        </td>
        <td class="sessionActions text-end">
            <button id="btnEditSession" type="button" class="btn btn-sm btn-light">Editar</button>
            <button id="btnDeleteSession" type="button" class="btn btn-sm btn-danger">Eliminar</button>
        </td>
    </tr>
`;

export const alertTemplate = `
    <tr id="alertMessages">
        <td colspan="5">
            <div class="alert alert-{{alertType}} m-0 rounded-0 border-0" role="alert">{{alertMassage}}</div>
        </td>
    </tr>
`;