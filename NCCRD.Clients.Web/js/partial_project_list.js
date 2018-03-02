
//## ON LOAD ##//
$(() => {
    LoadProjectList();
    LoadStatusFilters();
    LoadTypologyFilters();
    LoadRegionFilters();
    LoadSectorFilters();
});

//# GENERAL #//
function back_to_top() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

function SetDropdownText(item) {
    let selText = $(item).text();
    $(item).parents('.dropdown').find('.dropdown-toggle').html(selText);
}

function ReadUrlParams() {
    //Get params from URL//
    var qs = new Querystring();

    //Apply URL params where applicable//
    if (titlePart === "" && qs.get('titlePart', '') !== '') {
        titlePart = qs.get('titlePart', '');
        $('#titleFilter').val(decodeURIComponent(titlePart));
    }
    if (statusId === 0 && qs.get('statusId', '') !== '') {
        statusId = qs.get('statusId', '');
    }
    if (regionId === 0 && qs.get('regionId', '') !== '') {
        regionId = qs.get('regionId', '');
    }
    if (sectorId === 0 && qs.get('sectorId', '') !== '') {
        sectorId = qs.get('sectorId', '');
    }
    if (typologyId === 0 && qs.get('typologyId', '') !== '') {
        typologyId = qs.get('typologyId', '');
    }
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

$("#toggleGeneral").click(function () {
    ToggleToggleButton($(this));
});

$("#toggleRegion").click(function () {
    ToggleToggleButton($(this));
});

$("#toggleSector").click(function () {
    ToggleToggleButton($(this));
});

//## PROJECT LIST ##/
function RenderProjectList(data) {

    $("#projectList").html("");

    data.forEach(function (item) {

        var html = '<div id="' + item.ProjectId + '" class="card">'
        html += '<div class="card-body">';
        html += '<p class="card-title" style="font-size:large">' + item.ProjectTitle + '</p>';
        html += '<p class="card-text">' + item.ProjectDescription + '</p>';
        html += '<button id="' + item.ProjectId + '" class="btn btn-primary btn-sm" onclick="LoadProjectDetailsSection(this)">View</button>';
        html += '</div>';
        html += '</div>';
        html += '<br />';

        $("#projectList").append(html);
    });
}

function ScrollToSelectedProject() {
    $("#" + selectedProjectId)[0].scrollIntoView({
        behavior: "smooth", // or "auto" or "instant"
        block: "start", // or "end"
        alignToTop: false
    });
}

function LoadProjectList(scrollToSelectedProject) {

    ReadUrlParams();
    let url = (apiBaseURL + 'api/projects/GetAllFiltered?titlePart=' + titlePart + '&statusId=' + statusId + '&regionId=' + regionId + '&sectorId=' + sectorId + '&typologyId=' + typologyId);

    $.getJSON(url, function (data) {
        RenderProjectList(data);

        //Scrol selected project into view
        if (typeof scrollToSelectedProject !== 'undefined') {
            if (typeof selectedProjectId !== 'undefined' && selectedProjectId > 0) {

                ScrollToSelectedProject();
            }
        };
    });
}

function ClearFilters() {
    //Clear title filter
    $("#titleFilter").val("");

    //Clear status filter
    $('#selProjectStatusFilter').dropdown().val("All");

    //Clear typology filter
    $('#selProjectTypologyFilter').dropdown().val("All");

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
    LoadProjectList();
}

//## PROJECT DETAILS ##//
var showDetailsBackButton;
function LoadProjectDetailsSection(item) {

    selectedProjectId = 0
    if (typeof item !== 'undefined') selectedProjectId = item.getAttribute('id');

    showDetailsBackButton = true;

    $("#project_details_content").load("partial_project_details.html");

    $("#project_list_content").attr("hidden", true);
    $("#project_details_content").removeAttr("hidden");
}

//## FILTERS >> TITLE ##//
function TitleFilterChanged(val) {
    titlePart = val;
}

//## FILTERS >> STATUS ##//
function LoadStatusFilters() {

    let url = apiBaseURL + 'api/projectStatus/GetAll?allOption=true';
    $.getJSON(url, function (data) {

        let html = '<select id="selProjectStatusFilter" class="form-control" style="font-size:smaller;height:35px">';

        data.forEach(function (item) {
            html += '<option id="' + item.ProjectStatusId + '" onclick="StatusFilterSelected(this)">' + item.Value + '</option>';
        });

        html += '</select>';
        $("#filterStatus").append(html);
    });
}

function StatusFilterSelected(item) {
    statusId = item.id.replace("psid", "");
    SetDropdownText(item);
};

//## FILTERS >> TYPOLOGY ##//
function TypologyFilterSelected(item) {
    typologyId = item.id;
    SetDropdownText(item);
};

function LoadTypologyFilters() {

    let url = apiBaseURL + 'api/typology/GetAll';
    $.getJSON(url, function (data) {

        let html = '<select id="selProjectTypologyFilter" class="form-control" style="font-size:smaller;height:35px">';

        data.forEach(function (item) {
            html += '<option id="' + item.TypologyID + '" onclick="TypologyFilterSelected(this)">' + item.Value + '</option>';
        });

        html += '</select>';
        $("#filterTypology").append(html);

    });
};

//## FILTERS >> REGION ##//
function LoadRegionFilters() {
    fetch(apiBaseURL + 'api/region/GetAllTree')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            $('#regionTree').tree(data);
            var tree = $('#regionTree').tree();

            tree.on('select', function (e, node, id) {
                let nodeData = tree.getDataById(id);
                regionId = nodeData.id;
                $("#regionFilterText").text(nodeData.text);
            });

            tree.on('unselect', function (e, node, id) {
                regionId = 0;
                $("#regionFilterText").text("All");
            });

            $("#btnRegionTreeExpandAll").click(function () {
                tree.expandAll();
            });

            $("#btnRegionTreeCollapseAll").click(function () {
                tree.collapseAll();
            });
        });
}

//## FILTERS >> SECTOR ##//
function LoadSectorFilters() {

    //Fetch sector tree data and setup event handlers
    fetch(apiBaseURL + 'api/sector/GetAllTree')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            $('#sectorTree').tree(data);
            var tree = $('#sectorTree').tree();

            tree.on('select', function (e, node, id) {
                let nodeData = tree.getDataById(id);
                sectorId = nodeData.id;
                $("#sectorFilterText").text(nodeData.text);
            });

            tree.on('unselect', function (e, node, id) {
                sectorId = 0;
                $("#sectorFilterText").text("All");
            });

            $("#btnSectorTreeExpandAll").click(function () {
                tree.expandAll();
            });

            $("#btnSectorTreeCollapseAll").click(function () {
                tree.collapseAll();
            });
        });
}