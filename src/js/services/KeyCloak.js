import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: `${process.env.KEYCLOAK_URL}`,
    realm: `${process.env.KEYCLOAK_REALM}`,
    clientId: `${process.env.KEYCLOAK_CLIENT}`
});

export const getToken = () => new Promise((resolve, reject) => {

    if (keycloak.token) {

        keycloak.updateToken()
            .then(() => {
                resolve(keycloak.token);
            })
            .catch(() => reject());

    } else {
        keycloak.init({
            onLoad: 'login-required',
            checkLoginIframe: false
        })
            .then((authenticated) => {
                if(!authenticated) {
                    keycloak.login();
                } else {
                    resolve(keycloak.token);
                }
            })
            .catch(() => reject());

    }

});