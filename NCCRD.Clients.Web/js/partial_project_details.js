jQuery.fn.extend({
    autoHeight: function () {
        function autoHeight_(element) {
            return jQuery(element)
                .height(element.scrollHeight);
        }
        return this.each(function () {
            autoHeight_(this).on('input', function () {
                autoHeight_(this);
            });
        });
    }
});

$('#largeModal').on('shown.bs.modal', function (e) {
    $('textarea').autoHeight();
})

function ToggleEditClick() {
    let editToggle = $("#editToggle");

    if (editToggle.text() === 'EDIT MODE: ON') {
        editToggle.text("EDIT MODE: OFF");
        editToggle.removeClass('btn-warning');
        editToggle.addClass('btn-secondary');
        ToggleEditMode(false);
    }
    else {
        editToggle.text("EDIT MODE: ON");
        editToggle.removeClass('btn-secondary');
        editToggle.addClass('btn-warning');
        ToggleEditMode(true);
    }

}

function ToggleEditMode(state) {

    if (state === true) {
        $("input").each(function () {
            this.removeAttribute("readonly");
            this.style.color = "steelblue";
        })

        $("textarea").each(function () {
            this.removeAttribute("readonly");
            this.style.color = "steelblue";
        })

        $("select").each(function () {
            this.removeAttribute("disabled");
            this.style.color = "steelblue";
        })
    }
    else {
        $("input").each(function () {
            this.setAttribute("readonly", true);
            this.style.color = "black";
        })

        $("textarea").each(function () {
            this.setAttribute("readonly", true);
            this.style.color = "black";
        })

        $("select").each(function () {
            this.setAttribute("disabled", true);
            this.style.color = "black";
        })
    }

}

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
        $('textarea').autoHeight();

        //Set selects
        $("#projectType option").each(function () { this.selected = (this.text == data.ProjectTypeName); });
        $("#projectSubType option").each(function () { this.selected = (this.text == data.ProjectSubTypeName); });
        $("#projectStatus option").each(function () { this.selected = (this.text == data.ProjectStatusName); });
        $("#projectManager option").each(function () { this.selected = (this.text == data.ProjectManagerName); });
        $("#validationStatus option").each(function () { this.selected = (this.text == data.ValidationStatusName); });
        $("#maOption option").each(function () { this.selected = (this.text == data.MAOptionName); });
    });
}

function MitigationDetailsViewModel() {
    var self = this;
    self.mitigationDetails = ko.observable();

    let url = apiBaseURL + 'api/MitigationDetails/GetByProjectID/' + GetSelectedProjectId();
    $.getJSON(url, function (data) {
        self.mitigationDetails(data);
        $('textarea').autoHeight();
    });
}

function MitigationEmissionsViewModel() {
    var self = this;
    self.mitigationEmissions = ko.observable();

    let url = apiBaseURL + 'api/MitigationEmissionsData/GetByProjectID/' + GetSelectedProjectId();
    $.getJSON(url, function (data) {
        self.mitigationEmissions(data);
        $('textarea').autoHeight();
    });
}

function AdaptationDetailsViewModel() {
    var self = this;
    self.adaptationDetails = ko.observable();

    let url = apiBaseURL + 'api/AdaptationDetails/GetByProjectId/' + GetSelectedProjectId();
    $.getJSON(url, function (data) {
        self.adaptationDetails(data);
        $('textarea').autoHeight();
    });
}

function ResearchDetailsViewModel() {
    var self = this;
    self.researchDetails = ko.observable();

    let url = apiBaseURL + 'api/ResearchDetails/GetByProjectId/' + GetSelectedProjectId();
    $.getJSON(url, function (data) {
        self.researchDetails(data);
        $('textarea').autoHeight();
    });
}

function ProjectTypeViewModel() {
    var self = this;
    self.projectTypes = ko.observableArray();

    let url = apiBaseURL + "api/ProjectType/GetAll";
    $.getJSON(url, function (data) {
        var jsonNotSelected = JSON.parse('[{"ProjectTypeId":0,"Description":"","Value":""}]');
        jsonNotSelected = jsonNotSelected.concat(data);
        self.projectTypes(jsonNotSelected);
    });
}

function ProjectSubTypeViewModel() {
    var self = this;
    self.projectSubTypes = ko.observableArray();

    let url = apiBaseURL + 'api/ProjectSubType/GetAll';
    $.getJSON(url, function (data) {
        var jsonNotSelected = JSON.parse('[{"ProjectSubTypeId":0,"Description":"","Value":""}]');
        jsonNotSelected = jsonNotSelected.concat(data);
        self.projectSubTypes(jsonNotSelected);
    });
}

function ProjectStatusViewModel() {
    var self = this;
    self.projectStatus = ko.observableArray();

    let url = apiBaseURL + 'api/ProjectStatus/GetAll';
    $.getJSON(url, function (data) {
        var jsonNotSelected = JSON.parse('[{"ProjectStatusId":0,"Description":"","Value":""}]');
        jsonNotSelected = jsonNotSelected.concat(data);
        self.projectStatus(jsonNotSelected);
    });
}

function ProjectManagerViewModel() {
    var self = this;
    self.projectManager = ko.observableArray();

    let url = apiBaseURL + 'api/AppUsr/GetAllBasic';
    $.getJSON(url, function (data) {
        var jsonNotSelected = JSON.parse('[{"UserId": 0,"DisplayName": ""}]');
        jsonNotSelected = jsonNotSelected.concat(data);
        self.projectManager(jsonNotSelected);
    });
}

function ValidationStatusViewModel() {
    var self = this;
    self.validationStatus = ko.observableArray();

    let url = apiBaseURL + 'api/ValidationStatus/GetAll';
    $.getJSON(url, function (data) {
        var jsonNotSelected = JSON.parse('[{"ValidationStatusId":0,"Description":"","Value":""}]');
        jsonNotSelected = jsonNotSelected.concat(data);
        self.validationStatus(jsonNotSelected);
    });
}

function MAOptionViewModel() {
    var self = this;
    self.maOption = ko.observableArray();

    let url = apiBaseURL + 'api/MAOptions/GetAll';
    $.getJSON(url, function (data) {
        var jsonNotSelected = JSON.parse('[{"MAOptionId": 0,"Name": ""}]');
        jsonNotSelected = jsonNotSelected.concat(data);
        self.maOption(jsonNotSelected);
    });
}

//Lookups
ko.applyBindings(new ProjectTypeViewModel(), document.getElementById("projectType"));
ko.applyBindings(new ProjectSubTypeViewModel(), document.getElementById("projectSubType"));
ko.applyBindings(new ProjectStatusViewModel(), document.getElementById("projectStatus"));
ko.applyBindings(new ProjectManagerViewModel(), document.getElementById("projectManager"));
ko.applyBindings(new ValidationStatusViewModel(), document.getElementById("validationStatus"));
ko.applyBindings(new MAOptionViewModel(), document.getElementById("maOption"));

//Details
ko.applyBindings(new ProjectsDetailsViewModel(), document.getElementById("projectDetailsBindObject"));
ko.applyBindings(new MitigationDetailsViewModel(), document.getElementById("mitigationDetailsBindObject"));
ko.applyBindings(new MitigationEmissionsViewModel(), document.getElementById("mitigationEmissionsBindObject"));
ko.applyBindings(new AdaptationDetailsViewModel(), document.getElementById("adaptationDetailsBindObject"));
ko.applyBindings(new ResearchDetailsViewModel(), document.getElementById("researchDetailsBindObject"));
