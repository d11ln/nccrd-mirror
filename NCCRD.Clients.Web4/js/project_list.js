
var selectedProjectId = 0;
var titlePart = "";
var statusId = 0;
var regionId = 0;
var sectorId = 0;
var typologyId = 0;


function BuildProjectsUrl() {
    var urlParams = getUrlVars();

    if (titlePart === "" && urlParams["titlePart"] !== undefined) {
        titlePart = urlParams["titlePart"];
        $('#titleFilter').val(decodeURIComponent(titlePart));
    }
    if (statusId === 0 && urlParams["statusId"] !== undefined) {
        statusId = urlParams["statusId"];
    }
    if (regionId === 0 && urlParams["regionId"] !== undefined) {
        regionId = urlParams["regionId"];
    }
    if (sectorId === 0 && urlParams["sectorId"] !== undefined) {
        sectorId = urlParams["sectorId"];
    }
    if (typologyId === 0 && urlParams["typologyId"] !== undefined) {
        typologyId = urlParams["typologyId"];
    }

    return (apiBaseURL + 'api/projects/GetAllFiltered?titlePart=' + titlePart + '&statusId=' + statusId + '&regionId=' + regionId + '&sectorId=' + sectorId + '&typologyId=' + typologyId);
}

//function GetHeaderToken() {
//     var token = sessionStorage.getItem(tokenKey);
//     var headers = {};
//     if (token) {
//         headers.Authorization = 'Bearer ' + token;
//     }

//     return headers;
//}

function ProjectsViewModel() {
    var self = this;
    self.projects = ko.observableArray();

    var url = BuildProjectsUrl();

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        // headers: headers,
        success: function (data) {
            self.projects(data);
        }
    });
}

function ProjectStatusViewModel() {
    var self = this;
    self.projectStatus = ko.observableArray();

    var url = 'http://localhost:58683/api/projectStatus/GetAll';

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        // headers: headers,
        success: function (data) {
            self.projectStatus(data);
        }
    });
}

function TypologyViewModel() {
    var self = this;
    self.typology = ko.observableArray();

    var url = 'http://localhost:58683/api/typology/GetAll';

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        // headers: headers,
        success: function (data) {
            self.typology(data);
        }
    });
}


function getUrlVars() {
    var vars = {};
    var parts = window.parent.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;
        });
    return vars;
}

function load_details(id) {
    selectedProjectId = id;
    $("#project_details").load("project_details.html");
}

function TitleFilterChanged(val) {
    titlePart = val;
}

function StatusFilterSelected(item) {
    statusId = item.id;
    SetDropdownText(item);
}

function TypologyFilterSelected(item) {
    typologyId = item.id;
    SetDropdownText(item);
}

function SetDropdownText(item) {
    var selText = $(item).text();
    $(item).parents('.dropdown').find('.dropdown-toggle').html(selText);
}

function FilterProjects() {

    let url = BuildProjectsUrl();

    console.log(url);

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        // headers: headers,
        success: function (data) {
            projectsVM.projects(data);
        }
    });
}

function ToggleToggleText(item) {
    item = $("#" + item.id);
    let itemText = item.text();

    if (itemText.indexOf("Show") >= 0) {
        itemText = itemText.replace("Show", "Hide");
    }
    else {
        itemText = itemText.replace("Hide", "Show");
    }

    item.text(itemText);
}

var projectsVM = new ProjectsViewModel();
var projectStatusVM = new ProjectStatusViewModel();
var typologyVM = new TypologyViewModel();
ko.applyBindings(projectsVM, document.getElementById("projectListBindObject"));
ko.applyBindings(projectStatusVM, document.getElementById("projectStatusBindObject"));
ko.applyBindings(typologyVM, document.getElementById("typologyBindObject"));