
if (typeof selectedProjectId === 'undefined') {
    var selectedProjectId = 0;
}

function getUrlVars() {
    var vars = {};
    var parts = window.parent.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;
        });
    return vars;
}

function BuildProjectDetailsUrl() {
    var urlParams = getUrlVars();

    if (selectedProjectId === 0 && urlParams["projectId"] !== undefined) {
        selectedProjectId = urlParams["projectId"];
    }

    return ('http://localhost:58683/api/projects/GetById/' + selectedProjectId);
}

function ProjectsDetailsViewModel() {
    var self = this;
    self.projectDetails = ko.observable();

    // var token = sessionStorage.getItem(tokenKey);
    // var headers = {};
    // if (token) {
    //     headers.Authorization = 'Bearer ' + token;
    // }

    var url = BuildProjectDetailsUrl();

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        // headers: headers,
        success: function (data) {
            self.projectDetails(data);
        }
    });
}

function MitigationDetailsViewModel() {
    var self = this;
    self.mitigationDetails = ko.observable();

    // var token = sessionStorage.getItem(tokenKey);
    // var headers = {};
    // if (token) {
    //     headers.Authorization = 'Bearer ' + token;
    // }

    var url = 'http://localhost:58683/api/MitigationDetails/GetByProjectID/' + selectedProjectId;

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        // headers: headers,
        success: function (data) {
            self.mitigationDetails(data);
        }
    });
}

function MitigationEmissionsViewModel() {
    var self = this;
    self.mitigationEmissions = ko.observable();

    // var token = sessionStorage.getItem(tokenKey);
    // var headers = {};
    // if (token) {
    //     headers.Authorization = 'Bearer ' + token;
    // }

    var url = 'http://localhost:58683/api/MitigationEmissionsData/GetByProjectID/' + selectedProjectId;

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        // headers: headers,
        success: function (data) {
            self.mitigationEmissions(data);
        }
    });
}

function AdaptationDetailsViewModel() {
    var self = this;
    self.adaptationDetails = ko.observable();

    // var token = sessionStorage.getItem(tokenKey);
    // var headers = {};
    // if (token) {
    //     headers.Authorization = 'Bearer ' + token;
    // }

    var url = 'http://localhost:58683/api/AdaptationDetails/GetByProjectId/' + selectedProjectId;

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        // headers: headers,
        success: function (data) {
            self.adaptationDetails(data);
        }
    });
}

function ResearchDetailsViewModel() {
    var self = this;
    self.researchDetails = ko.observable();

    // var token = sessionStorage.getItem(tokenKey);
    // var headers = {};
    // if (token) {
    //     headers.Authorization = 'Bearer ' + token;
    // }

    var url = 'http://localhost:58683/api/ResearchDetails/GetByProjectId/' + selectedProjectId;

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        // headers: headers,
        success: function (data) {
            self.researchDetails(data);
        }
    });
}

ko.applyBindings(new ProjectsDetailsViewModel(), document.getElementById("projectDetailsBindObject"));
ko.applyBindings(new MitigationDetailsViewModel(), document.getElementById("mitigationDetailsBindObject"));
ko.applyBindings(new MitigationEmissionsViewModel(), document.getElementById("mitigationEmissionsBindObject"));
ko.applyBindings(new AdaptationDetailsViewModel(), document.getElementById("adaptationDetailsBindObject"));
ko.applyBindings(new ResearchDetailsViewModel(), document.getElementById("researchDetailsBindObject"));
