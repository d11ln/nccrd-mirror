import { createUserManager } from 'redux-oidc';
import { ssoBaseURL } from '../../constants/ssoBaseURL'
import { siteBaseURL } from '../../constants/siteBaseURL'

const userManagerConfig = {
    client_id: 'NCCRD_React_Client',
    //client_secret: '5FB072EFC225',
    redirect_uri: siteBaseURL + '#/callback#',
    post_logout_redirect_uri: siteBaseURL + '#/logout',
    //silent_redirect_uri: siteBaseURL + '/silent_renew.html',
    //response_mode: 'form_post',
    response_type: 'id_token token',
    scope: 'openid profile email SAEON.NCCRD.Web.API',
    authority: ssoBaseURL,
    automaticSilentRenew: false,
    filterProtocolClaims: true,
    loadUserInfo: true
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
