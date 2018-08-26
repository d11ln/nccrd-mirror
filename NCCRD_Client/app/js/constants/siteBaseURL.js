let url

if(CONSTANTS.PRODUCTION) {
    url = 'http://app01.saeon.ac.za/nccrdsite/'
} else {
    url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`
}

export const siteBaseURL = url
