import Keycloak from 'keycloak-js';

const dNone = 'd-none';
const isInvalid = 'is-invalid';
const isValid = 'is-valid';
const keycloak = new Keycloak({
    url: 'https://auth-staging.bkool.com/auth',
    realm: 'bkool',
    clientId: 'bkool-web'
});

export { dNone, isInvalid, isValid, keycloak };