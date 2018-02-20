
//GetSelectedProjectId
function GetSelectedProjectId() {

    //Get params on local url
    var qs = new Querystring();
    if (qs.get('projectId', '') !== '') {
        selectedProjectId = qs.get('projectId', '');
    }

    return selectedProjectId;
}

function ProjectsDetailsViewModel() {
    var self = this;
    self.projectDetails = ko.observable();

    let url = apiBaseURL + 'api/projects/GetById/' + GetSelectedProjectId();

    $.getJSON(url, function (data) {
        self.projectDetails(data);
    });
}

function MitigationDetailsViewModel() {
    var self = this;
    self.mitigationDetails = ko.observable();

    let url = apiBaseURL + 'api/MitigationDetails/GetByProjectID/' + GetSelectedProjectId();
    $.getJSON(url, function (data) {
        self.mitigationDetails(data);
    });
}

function MitigationEmissionsViewModel() {
    var self = this;
    self.mitigationEmissions = ko.observable();

    let url = apiBaseURL + 'api/MitigationEmissionsData/GetByProjectID/' + GetSelectedProjectId();
    $.getJSON(url, function (data) {
        self.mitigationEmissions(data);
    });
}

function AdaptationDetailsViewModel() {
    var self = this;
    self.adaptationDetails = ko.observable();

    let url = apiBaseURL + 'api/AdaptationDetails/GetByProjectId/' + GetSelectedProjectId();
    $.getJSON(url, function (data) {
        self.adaptationDetails(data);
    });
}

function ResearchDetailsViewModel() {
    var self = this;
    self.researchDetails = ko.observable();

    let url = apiBaseURL + 'api/ResearchDetails/GetByProjectId/' + GetSelectedProjectId();
    $.getJSON(url, function (data) {
        self.researchDetails(data);
    });
}

ko.applyBindings(new ProjectsDetailsViewModel(), document.getElementById("projectDetailsBindObject"));
ko.applyBindings(new MitigationDetailsViewModel(), document.getElementById("mitigationDetailsBindObject"));
ko.applyBindings(new MitigationEmissionsViewModel(), document.getElementById("mitigationEmissionsBindObject"));
ko.applyBindings(new AdaptationDetailsViewModel(), document.getElementById("adaptationDetailsBindObject"));
ko.applyBindings(new ResearchDetailsViewModel(), document.getElementById("researchDetailsBindObject"));
