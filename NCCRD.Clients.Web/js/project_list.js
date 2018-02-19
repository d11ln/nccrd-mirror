
//var selectedProjectId = 0;

$(() => {
    var self = this;

    //Get params from URL//
    var urlParams = getUrlVars();

    //Apply URL params where applicable//
    if (self.titlePart === "" && urlParams["titlePart"] !== undefined) {
        self.titlePart = urlParams["titlePart"];
        $('#titleFilter').val(decodeURIComponent(titlePart));
    }
    if (self.statusId === 0 && urlParams["statusId"] !== undefined) {
        self.statusId = urlParams["statusId"];
    }
    if (self.regionId === 0 && urlParams["regionId"] !== undefined) {
        self.regionId = urlParams["regionId"];
    }
    if (self.sectorId === 0 && urlParams["sectorId"] !== undefined) {
        self.sectorId = urlParams["sectorId"];
    }
    if (self.typologyId === 0 && urlParams["typologyId"] !== undefined) {
        self.typologyId = urlParams["typologyId"];
    }
})

function ProjectsViewModel() {
    var self = this;
    self.projects = ko.observableArray();

    let url = (apiBaseURL + 'api/projects/GetAllFiltered?titlePart=' + titlePart + '&statusId=' + statusId + '&regionId=' + regionId + '&sectorId=' + sectorId + '&typologyId=' + typologyId);
    $.getJSON(url, function (data) {
        self.projects(data);
    });
}

function ProjectStatusViewModel() {
    var self = this;
    self.projectStatus = ko.observableArray();

    let url = apiBaseURL + 'api/projectStatus/GetAll?allOption=true';
    $.getJSON(url, function (data) {
        self.projectStatus(data);
    });
}

function TypologyViewModel() {
    var self = this;
    self.typology = ko.observableArray();

    let url = apiBaseURL + 'api/typology/GetAll';
    $.getJSON(url, function (data) {
        self.typology(data);
    });
}

function load_details(item) {
    selectedProjectId = item.getAttribute('id');
    $("#project_details").load("partial_project_details.html");
}

function load_edit_project(item) {
    selectedProjectId = item.getAttribute('id');
    $("#project_edit").load("partial_project_add.html");
    SetupProjectAddEdit();
}

$('#projectDetailsModal').on('hidden.bs.modal', function (e) {
    $("#project_details").html("");
})

$('#projectEditModal').on('hidden.bs.modal', function (e) {
    $("#project_edit").html("");
})


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
    let selText = $(item).text();
    $(item).parents('.dropdown').find('.dropdown-toggle').html(selText);
}

function FilterProjects() {
    let url = (apiBaseURL + 'api/projects/GetAllFiltered?titlePart=' + titlePart + '&statusId=' + statusId + '&regionId=' + regionId + '&sectorId=' + sectorId + '&typologyId=' + typologyId);
    $.getJSON(url, function (data) {
        projectsVM.projects(data);
    });
}

function ClearFilters() {
    //Clear title filter
    $("#titleFilter").val("");

    //Clear status filter
    $('#projectStatusBindObject').dropdown().val("All");

    //Clear typology filter
    $('#typologyBindObject').dropdown().val("All");

    //Clear region filter
    let tree = $('#regionTree').tree();
    tree.unselectAll();

    //Clear region filter
    tree = $('#sectorTree').tree();
    tree.unselectAll();

    //REset all filters
    titlePart = "";
    statusId = 0;
    regionId = 0;
    sectorId = 0;
    typologyId = 0;

    //(Un)filter all
    FilterProjects()
}


function ToggleToggleButton(item) {
    let itemText = item.text();

    //Change colour and text
    if (itemText.indexOf("Show") >= 0) {
        itemText = itemText.replace("Show", "Hide");
        item.removeClass('btn-primary');
        item.addClass('btn-warning');
    }
    else {
        itemText = itemText.replace("Hide", "Show");
        item.removeClass('btn-warning');
        item.addClass('btn-primary');
    }

    item.text(itemText);
}


$("#toggleGeneral").click(function() {
    ToggleToggleButton($(this));
});

$("#toggleRegion").click(function () {
    ToggleToggleButton($(this));
});

$("#toggleSector").click(function () {
    ToggleToggleButton($(this));
});

var projectsVM = new ProjectsViewModel();
var projectStatusVM = new ProjectStatusViewModel();
var typologyVM = new TypologyViewModel();
ko.applyBindings(projectsVM, document.getElementById("projectListBindObject"));
ko.applyBindings(projectStatusVM, document.getElementById("projectStatusBindObject"));
ko.applyBindings(typologyVM, document.getElementById("typologyBindObject"));