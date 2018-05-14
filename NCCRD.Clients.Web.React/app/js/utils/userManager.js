import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
    client_id: 'NCCRD_React_Client',
    client_secret: '5FB072EFC225',
    //redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/callback`,
    redirect_uri: 'http://localhost:8080/#/callback#',
    post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/logout`,
    response_type: 'id_token token',
    //response_mode: 'form_post',
    scope: 'openid profile email',
    authority: 'http://localhost:44320',
    //silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
    automaticSilentRenew: false,
    filterProtocolClaims: true,
    loadUserInfo: true
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
