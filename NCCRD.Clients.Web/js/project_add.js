
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

function AddProject() {
    let data = {
        ProjectTitle: $("#projectTitle").val(),
        ProjectDescription: $("#projectDescr").val(),
        StartYear: $("#startYear").val(),
        EndYear: $("#endYear").val(),
        LeadAgent: $("#leadAgent").val(),
        HostPartner: $("#hostPartner").val(),
        HostOrganisation: $("#hostOrg").val(),
        AlternativeContact: $("#contactAlt").val(),
        AlternativeContactEmail: $("#contactAltEmail").val(),
        Link: $("#link").val(),
        ValidationComments: $("#validationComments").val(),
        BudgetLower: $("#budgetLower").val(),
        BudgetUpper: $("#budgetUpper").val(),
        ProjectTypeId: $("#projectType").val(),
        ProjectSubTypeId: $("#projectSubType").val(),
        ProjectStatusId: $("#projectStatus").val(),
        ProjectManagerId: $("#projectManager").val(),
        ValidationStatusId: $("#validationStatus").val(),
        MAOptionId: $("#maOption").val()
    };

    if (ValidateData(data)) {

        fetch(apiBaseURL + "api/Projects/Add", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response === true) {
                    //Close modal
                    alert("Project added successfully");
                    $('#projectAddModal').modal('hide');
                }
                else {
                    console.log('Success:', response);
                }
            });
    }
}

function ValidateData(data) {
    if (data.ProjectTitle === "") {
        alert("Project title required");
        ScrollToView("projectTitle");
    }
    else if (data.LeadAgent === "") {
        alert("Lead agent required");
        ScrollToView("leadAgent");
    }
    else if (data.HostOrganisation === "") {
        alert("Host organisation required");
        ScrollToView("hostOrg");
    }
    else if (data.ProjectTypeId === "0") {
        alert("Project type selection required");
        ScrollToView("projectType");
    }
    else if (data.ProjectStatusId === "0") {
        alert("Project status selection required");
        ScrollToView("projectStatus");
    }
    else if (data.ProjectManagerId === "0") {
        alert("Project manager selection required");
        ScrollToView("projectManager");
    }
    else if (isNaN(data.StartYear)) {
        alert("Invalid value for Start year");
        ScrollToView("startYear");
    }
    else if (isNaN(data.EndYear)) {
        alert("Invalid value for End year");
        ScrollToView("endYear");
    }
    else if (isNaN(data.BudgetLower)) {
        alert("Invalid value for Budget lower");
        ScrollToView("budgetLower");
    }
    else if (isNaN(data.BudgetUpper)) {
        alert("Invalid value for Budget upper");
        ScrollToView("budgetLower");
    }
    else {
        return true;
    }

    return false;
}

function ScrollToView(id) {
    $("#" + id)[0].scrollIntoView({
        behavior: "smooth", // or "auto" or "instant"
        block: "start" // or "end"
    });
}

ko.applyBindings(new ProjectTypeViewModel(), document.getElementById("projectType"));
ko.applyBindings(new ProjectSubTypeViewModel(), document.getElementById("projectSubType"));
ko.applyBindings(new ProjectStatusViewModel(), document.getElementById("projectStatus"));
ko.applyBindings(new ProjectManagerViewModel(), document.getElementById("projectManager"));
ko.applyBindings(new ValidationStatusViewModel(), document.getElementById("validationStatus"));
ko.applyBindings(new MAOptionViewModel(), document.getElementById("maOption"));
