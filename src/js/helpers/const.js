import Keycloak from 'keycloak-js';

const dNone = 'd-none';
const isInvalid = 'is-invalid';
const isValid = 'is-valid';
const keycloak = new Keycloak({
    url: `${process.env.KEYCLOAK_URL}`,
    realm: `${process.env.KEYCLOAK_REALM}`,
    clientId: `${process.env.KEYCLOAK_CLIENT}`
});

export { dNone, isInvalid, isValid, keycloak };