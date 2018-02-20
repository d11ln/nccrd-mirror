
$(() => {
    LoadProject();
});

//GetSelectedProjectId
function GetSelectedProjectId() {

    //Get params on local url
    var qs = new Querystring();
    if (qs.get('projectId', '') !== '') {
        selectedProjectId = qs.get('projectId', '');
    }

    return selectedProjectId;
}

function ProjectTypeViewModel() {
    var self = this;
    self.projectTypes = ko.observableArray();

    let url = apiBaseURL + "api/ProjectType/GetAll";
    $.getJSON(url, function (data) {
        var jsonNotSelected = JSON.parse('[{"ProjectTypeId":0,"Description":"","Value":"Not Selected"}]');
        jsonNotSelected = jsonNotSelected.concat(data);
        self.projectTypes(jsonNotSelected);
    });
}

function ProjectSubTypeViewModel() {
    var self = this;
    self.projectSubTypes = ko.observableArray();

    let url = apiBaseURL + 'api/ProjectSubType/GetAll';
    $.getJSON(url, function (data) {
        var jsonNotSelected = JSON.parse('[{"ProjectSubTypeId":0,"Description":"","Value":"Not Selected"}]');
        jsonNotSelected = jsonNotSelected.concat(data);
        self.projectSubTypes(jsonNotSelected);
    });
}

function ProjectStatusViewModel() {
    var self = this;
    self.projectStatus = ko.observableArray();

    let url = apiBaseURL + 'api/ProjectStatus/GetAll';
    $.getJSON(url, function (data) {
        var jsonNotSelected = JSON.parse('[{"ProjectStatusId":0,"Description":"","Value":"Not Selected"}]');
        jsonNotSelected = jsonNotSelected.concat(data);
        self.projectStatus(jsonNotSelected);
    });
}

function ProjectManagerViewModel() {
    var self = this;
    self.projectManager = ko.observableArray();

    let url = apiBaseURL + 'api/AppUsr/GetAllBasic';
    $.getJSON(url, function (data) {
        var jsonNotSelected = JSON.parse('[{"UserId": 0,"DisplayName": "Not Selected"}]');
        jsonNotSelected = jsonNotSelected.concat(data);
        self.projectManager(jsonNotSelected);
    });
}

function ValidationStatusViewModel() {
    var self = this;
    self.validationStatus = ko.observableArray();

    let url = apiBaseURL + 'api/ValidationStatus/GetAll';
    $.getJSON(url, function (data) {
        var jsonNotSelected = JSON.parse('[{"ValidationStatusId":0,"Description":"","Value":"Not Selected"}]');
        jsonNotSelected = jsonNotSelected.concat(data);
        self.validationStatus(jsonNotSelected);
    });
}

function MAOptionViewModel() {
    var self = this;
    self.maOption = ko.observableArray();

    let url = apiBaseURL + 'api/MAOptions/GetAll';
    $.getJSON(url, function (data) {
        var jsonNotSelected = JSON.parse('[{"MAOptionId": 0,"Name": "Not Selected"}]');
        jsonNotSelected = jsonNotSelected.concat(data);
        self.maOption(jsonNotSelected);
    });
}

function LoadProject() {

    //Get selectedProjectId
    GetSelectedProjectId();

    //Set page context (Add/Edit)
    if (selectedProjectId > 0) {
        $("#addEditHeader").text("Edit Project");
    }
    else {
        $("#addEditHeader").text("Add Project");
    }

    //Load selected project
    if (selectedProjectId > 0) {
        //Get project data
        let url = apiBaseURL + 'api/projects/GetById/' + selectedProjectId;
        $.getJSON(url, function (data) {

            //Fill project data/values
            $("#projectTitle").val(data.ProjectTitle).trigger("change");
            $("#projectDescr").val(data.ProjectDescription).trigger("change");
            $("#startYear").val(data.StartYear).trigger("change");
            $("#endYear").val(data.EndYear).trigger("change");
            $("#leadAgent").val(data.LeadAgent).trigger("change");
            $("#hostPartner").val(data.HostPartner).trigger("change");
            $("#hostOrg").val(data.HostOrganisation).trigger("change");
            $("#contactAlt").val(data.AlternativeContact).trigger("change");
            $("#contactAltEmail").val(data.AlternativeContactEmail).trigger("change");
            $("#link").val(data.Link).trigger("change");
            $("#validationComments").val(data.ValidationComments).trigger("change");
            $("#budgetLower").val(data.BudgetLower).trigger("change");
            $("#budgetUpper").val(data.BudgetUpper).trigger("change");

            //Set selects
            $("#projectType option").each(function () { this.selected = (this.text == data.ProjectTypeName); });
            $("#projectSubType option").each(function () { this.selected = (this.text == data.ProjectSubTypeName); });
            $("#projectStatus option").each(function () { this.selected = (this.text == data.ProjectStatusName); });
            $("#projectManager option").each(function () { this.selected = (this.text == data.ProjectManagerName); });
            $("#validationStatus option").each(function () { this.selected = (this.text == data.ValidationStatusName); });
            $("#maOption option").each(function () { this.selected = (this.text == data.MAOptionName); });
        });
    }
}

function SaveProject() {
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

        //Might not work on all browsers!!//
        fetch(apiBaseURL + "api/Projects/Add", {
            method: 'POST',
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

//Apply bindings
koBindingsApplied = true;
ko.applyBindings(new ProjectTypeViewModel(), document.getElementById("projectType"));
ko.applyBindings(new ProjectSubTypeViewModel(), document.getElementById("projectSubType"));
ko.applyBindings(new ProjectStatusViewModel(), document.getElementById("projectStatus"));
ko.applyBindings(new ProjectManagerViewModel(), document.getElementById("projectManager"));
ko.applyBindings(new ValidationStatusViewModel(), document.getElementById("validationStatus"));
ko.applyBindings(new MAOptionViewModel(), document.getElementById("maOption"));

