let url

if(CONSTANTS.PRODUCTION) {
    url = 'http://app01.saeon.ac.za/nccrdapi/'
} else {
    url = 'http://app01.saeon.ac.za/nccrdapi/' //'http://localhost:58683/'
}

export const apiBaseURL = url
