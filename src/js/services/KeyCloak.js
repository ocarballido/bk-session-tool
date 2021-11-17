import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'https://auth-staging.bkool.com/auth',
    realm: 'bkool',
    clientId: 'bkool-web'
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