
function ProjectTypeViewModel() {
    var self = this;
    self.projectTypes = ko.observableArray();

    fetch(apiBaseURL + 'api/ProjectType/GetAll')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            var jsonNotSelected = JSON.parse('[{"ProjectTypeId":0,"Description":"","Value":"Not Selected"}]');
            jsonNotSelected = jsonNotSelected.concat(data);
            self.projectTypes(jsonNotSelected);
        });
}

function ProjectSubTypeViewModel() {
    var self = this;
    self.projectSubTypes = ko.observableArray();

    fetch(apiBaseURL + 'api/ProjectSubType/GetAll')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            var jsonNotSelected = JSON.parse('[{"ProjectSubTypeId":0,"Description":"","Value":"Not Selected"}]');
            jsonNotSelected = jsonNotSelected.concat(data);
            self.projectSubTypes(jsonNotSelected);
        });
}

function ProjectStatusViewModel() {
    var self = this;
    self.projectStatus = ko.observableArray();

    fetch(apiBaseURL + 'api/ProjectStatus/GetAll')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            var jsonNotSelected = JSON.parse('[{"ProjectStatusId":0,"Description":"","Value":"Not Selected"}]');
            jsonNotSelected = jsonNotSelected.concat(data);
            self.projectStatus(jsonNotSelected);
        });
}

function ProjectManagerViewModel() {
    var self = this;
    self.projectManager = ko.observableArray();

    fetch(apiBaseURL + 'api/AppUsr/GetAllBasic')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            var jsonNotSelected = JSON.parse('[{"UserId": 0,"DisplayName": "Not Selected"}]');
            jsonNotSelected = jsonNotSelected.concat(data);
            self.projectManager(jsonNotSelected);
        });
}

function ValidationStatusViewModel() {
    var self = this;
    self.validationStatus = ko.observableArray();

    fetch(apiBaseURL + 'api/ValidationStatus/GetAll')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            var jsonNotSelected = JSON.parse('[{"ValidationStatusId":0,"Description":"","Value":"Not Selected"}]');
            jsonNotSelected = jsonNotSelected.concat(data);
            self.validationStatus(jsonNotSelected);
        });
}

function MAOptionViewModel() {
    var self = this;
    self.maOption = ko.observableArray();

    fetch(apiBaseURL + 'api/MAOptions/GetAll')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            var jsonNotSelected = JSON.parse('[{"MAOptionId": 0,"Name": "Not Selected"}]');
            jsonNotSelected = jsonNotSelected.concat(data);
            self.maOption(jsonNotSelected);
        });
}

ko.applyBindings(new ProjectTypeViewModel(), document.getElementById("projectType"));
ko.applyBindings(new ProjectSubTypeViewModel(), document.getElementById("projectSubType"));
ko.applyBindings(new ProjectStatusViewModel(), document.getElementById("projectStatus"));
ko.applyBindings(new ProjectManagerViewModel(), document.getElementById("projectManager"));
ko.applyBindings(new ValidationStatusViewModel(), document.getElementById("validationStatus"));
ko.applyBindings(new MAOptionViewModel(), document.getElementById("maOption"));
