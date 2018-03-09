
//-----------//
//  GENERAL  //
//-----------//

//Shared data
var changesSaved = false;
var sectorData = null

//Project data
var projectDetailsData = null;
var projectTypeData = null;
var projectSubTypeData = null;
var projectStatusData = null;
var projectManagerData = null;
var validationStatusData = null;
var maOptionsData = null;

//Adaptation data
var adaptationDetailsData = null;
var adaptationPurposeData = null;

//Mitigation data
var mitigationDetailsData = null;
var carbonCreditData = null;
var carbonCreditMarketData = null;
var cdmStatusData = null;
var cdmMethodologyData = null;
var voluntaryMethodologyData = null;
var voluntaryGoldStandardData = null;

//MitigationEmissions data
var mitigationEmissionsData = null;

//Research data
var researchDetailsData = null;
var researchTypeData = null;
var targetAudienceData = null;


//OnLoad...
$(() => {

    ShowLoading();

    changesSaved = false;
    ToggleBackButton();

    GetProjectTypes(GetProjectDetails);
    GetProjectSubTypes(GetProjectDetails);
    GetProjectStatus(GetProjectDetails);
    GetProjectManagers(GetProjectDetails);
    GetValidationStatus(GetProjectDetails);
    GetMAOptions(GetProjectDetails);

    //Adaptation Details
    GetAdaptationPurpose(GetAdaptationDetails);
    GetSectors(GetAdaptationDetails);

    //Mitigation details
    GetCarbonCredit(GetMitigationDetails);
    GetCarbonCreditMarket(GetMitigationDetails);
    GetCDMStatus(GetMitigationDetails);
    GetCDMMethodology(GetMitigationDetails);
    GetVoluntaryMethodology(GetMitigationDetails);
    GetVoluntaryGoldStandard(GetMitigationDetails);

    //Mitigation emissions data
    GetMitigationEmissions();

    //Research details
    GetResearchType(GetResearchDetails);
    GetTargetAudience(GetResearchDetails);
});

function ToggleBackButton() {

    if (typeof showDetailsBackButton !== 'undefined' && showDetailsBackButton === true) {
        $("#btnBackToList").removeAttr("hidden");
    }
}

$("#btnBackToList").click(function () {

    if (changesSaved === true) {
        LoadProjectList(true);
    }

    $("#project_details_content").attr("hidden", true);
    $("#project_details_content").html("");
    $("#project_list_content").removeAttr("hidden");

    if (changesSaved === false) {
        ScrollToSelectedProject();
    }
});

//Textarea auto height//
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

//Resize textareas onload
$('#largeModal').on('shown.bs.modal', function (e) {
    $('textarea').autoHeight();
})

//ToggleEditMode//
$("#btnEdit").click(function () {
    SetEditMode(true);
});

$("#btnSave").click(function () {

    $('#saveChangesModal').modal('show');
});

$("#btnConfirmSave").click(function () {

    $('#saveChangesModal').modal('hide');
    SaveClick(true);
});

$("#btnCancelSave").click(function () {

    $('#saveChangesModal').modal('hide');
});

$("#btnDiscard").click(function () {

    $('#discardChangesModal').modal('show');
});

$("#btnConfirmDiscard").click(function () {

    $('#discardChangesModal').modal('hide');
    SaveClick(false);
});

$("#btnCancelDiscard").click(function () {

    $('#discardChangesModal').modal('hide');
});

function SaveClick(state) {

    if (state === true) {

        GetProjectChanges();
        GetAdaptationChanges();
        GetMitigationChanges();
        GetMitigationEmissionsChanges();
        GetResearchChanges();

        if (SaveChanges()) {

            //Save changes to DB
            //...

            //Disable edit mode on success
            SetEditMode(false);
        }
    }
    else {

        //Reload data from DB
        GetProjectDetails();
        GetAdaptationDetails();
        GetMitigationDetails();
        GetMitigationEmissions();
        GetResearchDetails();

        //Disable edit mode
        SetEditMode(false);
    }
};

function SetEditMode(state) {

    if (state === false) {

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

        $(".divHidden").each(function () {
            this.setAttribute("hidden", true);
        })

        document.getElementById("btnEdit").removeAttribute("hidden");
        document.getElementById("btnSave").setAttribute("hidden", true);
        document.getElementById("btnDiscard").setAttribute("hidden", true);
    }
    else {

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

        $(".divHidden").each(function () {
            this.removeAttribute("hidden");
        })

        document.getElementById("btnEdit").setAttribute("hidden", true);
        document.getElementById("btnSave").removeAttribute("hidden");
        document.getElementById("btnDiscard").removeAttribute("hidden");
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

function GetUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    //return new Date().valueOf();
}

function back_to_top() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

function SaveChanges() {

    let state = true;

    state = SaveProjectChanges();

    if (state === true) {
        state = SaveAdaptationChanges();
    }

    if (state === true) {
        state = SaveMitigationChanges();
    }

    if (state === true) {
        state = SaveMitigationEmissionsChanges();
    }

    if (state === true) {
        state = SaveResearchChanges();
    }

    return state;
}

function ShowLoading() {

    $("#loadingModal").modal('show');
}

function HideLoading() {

    if (projectDetailsData && adaptationDetailsData && mitigationDetailsData && mitigationEmissionsData && researchDetailsData){

        $("#loadingModal").modal('hide');
    }
}


//-------------------//
//  PROJECT DETAILS  //
//-------------------//

function GetProjectTypes(callback) {

    let url = apiBaseURL + 'api/ProjectType/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        projectTypeData = JSON.parse('[{"ProjectTypeId":0,"Description":"","Value":"Not Selected"}]').concat(data);

        if (callback) callback();
    });
};

function GetProjectSubTypes(callback) {

    let url = apiBaseURL + 'api/ProjectSubType/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        projectSubTypeData = JSON.parse('[{"ProjectSubTypeId":0,"Description":"","Value":"Not Selected"}]').concat(data);

        if (callback) callback();
    });
}

function GetProjectStatus(callback) {

    let url = apiBaseURL + 'api/ProjectStatus/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        projectStatusData = JSON.parse('[{"ProjectStatusId":0,"Description":"","Value":"Not Selected"}]').concat(data);

        if (callback) callback();
    });
}

function GetProjectManagers(callback) {

    let url = apiBaseURL + 'api/AppUsr/GetAllBasic';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["DisplayName"].localeCompare(b["DisplayName"]) });
        projectManagerData = JSON.parse('[{"UserId": 0,"DisplayName": "Not Selected"}]').concat(data);

        if (callback) callback();
    });
}

function GetValidationStatus(callback) {

    let url = apiBaseURL + 'api/ValidationStatus/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        validationStatusData = JSON.parse('[{"ValidationStatusId":0,"Description":"","Value":"Not Selected"}]').concat(data);

        if (callback) callback();
    });
}

function GetMAOptions(callback) {

    let url = apiBaseURL + 'api/MAOptions/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Name"].localeCompare(b["Name"]) });
        maOptionsData = JSON.parse('[{"MAOptionId": 0,"Name": "Not Selected"}]').concat(data);

        if (callback) callback();
    });
}

function GetProjectDetails() {

    if (projectTypeData && projectSubTypeData && projectStatusData && projectManagerData && validationStatusData && maOptionsData) {

        ShowLoading();

        let projectId = GetSelectedProjectId();
        if (projectId === 0) {

            //Add new project
            let newProject = {
                "ProjectId": GetUID(),
                "ProjectTitle": "",
                "ProjectDescription": "",
                "LeadAgent": "",
                "HostPartner": "",
                "HostOrganisation": "",
                "StartYear": 0,
                "EndYear": 0,
                "AlternativeContact": "",
                "AlternativeContactEmail": "",
                "Link": "",
                "ValidationComments": "",
                "BudgetLower": 0,
                "BudgetUpper": 0,
                "ProjectTypeId": 0,
                "ProjectSubTypeId": 0,
                "ProjectStatusId": 0,
                "ProjectManagerId": 0,
                "ValidationStatusId": 0,
                "MAOptionId": 0
            }

            projectDetailsData = newProject;
            LoadProjectDetails(projectDetailsData);
        }
        else {

            //Get existing project
            let url = apiBaseURL + 'api/projects/GetById/' + projectId;

            $.getJSON(url, function (data) {

                data.State = "Unchanged"; //Set initial data state
                projectDetailsData = data;
                LoadProjectDetails(projectDetailsData);
            });
        }
    }
}

function LoadProjectTypes(data, parent) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selProjectType">';

    data.forEach(function (item) {
        html += '<option id="' + item.ProjectTypeId + '">' + item.Value + '</option>';
    });

    html += '</select>';
    parent.append(html);
};

function LoadProjectSubTypes(data, parent) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selProjectSubType">';

    data.forEach(function (item) {
        html += '<option id="' + item.ProjectSubTypeId + '">' + item.Value + '</option>';
    });

    html += '</select>';
    parent.append(html);
};

function LoadProjectStatus(data, parent) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selProjectStatus">';

    data.forEach(function (item) {
        html += '<option id="' + item.ProjectStatusId + '">' + item.Value + '</option>';
    });

    html += '</select>';
    parent.append(html);
};

function LoadProjectManagers(data, parent) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selProjectManager">';

    data.forEach(function (item) {
        html += '<option id="' + item.UserId + '">' + item.DisplayName + '</option>';
    });

    html += '</select>';
    parent.append(html);
};

function LoadValidationStatus(data, parent) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selValidationStatus">';

    data.forEach(function (item) {
        html += '<option id="' + item.ValidationStatusId + '">' + item.Value + '</option>';
    });

    html += '</select>';
    parent.append(html);
};

function LoadMAOptions(data, parent) {

    let url = apiBaseURL + 'api/MAOptions/GetAll';

    $.getJSON(url, function (data) {

        data = JSON.parse('[{"MAOptionId": 0,"Name": "Not Selected"}]').concat(data);
        let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selMAOption">';

        data.forEach(function (item) {
            html += '<option id="' + item.MAOptionId + '">' + item.Name + '</option>';
        });

        html += '</select>';
        parent.append(html);
    });
};

function LoadProjectDetails(data) {

    let template = null;

    //Get template data
    $.get("templates/projectDetailsTemplate.html", function (tdata) {
        template = tdata;
    }, 'text').

        then(() => {

            $("#divProjectDetails").html("");
            $("#divProjectDetails").append(template)

            //Load/Render selects
            LoadProjectTypes(projectTypeData, $("#divProjectType"));
            LoadProjectSubTypes(projectSubTypeData, $("#divProjectSubType"));
            LoadProjectStatus(projectStatusData, $("#divProjectStatus"));
            LoadProjectManagers(projectManagerData, $("#divProjectManager"));
            LoadValidationStatus(validationStatusData, $("#divValidationStatus"));
            LoadMAOptions(maOptionsData, $("#divMAOptions"));

            //Render project details
            $("#txtProjectTitle").val(data.ProjectTitle);
            $("#txtEndYear").val(data.EndYear);
            $("#txtStartYear").val(data.StartYear);
            $("#txtProjectDescription").val(data.ProjectDescription);
            $("#txtLeadAgent").val(data.LeadAgent);
            $("#txtHostPartner").val(data.HostPartner);
            $("#txtHostOrganisation").val(data.HostOrganisation);
            $("#txtAlternativeContact").val(data.AlternativeContact);
            $("#txtAlternativeContactEmail").val(data.AlternativeContactEmail);
            $("#txtLink").val(data.Link);
            $("#txtValidationComments").val(data.ValidationComments);
            $("#txtBudgetLower").val(data.BudgetLower);
            $("#txtBudgetUpper").val(data.BudgetUpper);

            $('textarea').autoHeight();
            SetProjectSelects(data);

            HideLoading();
        });
};

function SetProjectSelects(data) {

    $("#selProjectType option").each(function () { this.selected = (this.text == data.ProjectTypeName); });
    $("#selProjectSubType option").each(function () { this.selected = (this.text == data.ProjectSubTypeName); });
    $("#selProjectStatus option").each(function () { this.selected = (this.text == data.ProjectStatusName); });
    $("#selProjectManager option").each(function () { this.selected = (this.text == data.ProjectManagerName); });
    $("#selValidationStatus option").each(function () { this.selected = (this.text == data.ValidationStatusName); });
    $("#selMAOption option").each(function () { this.selected = (this.text == data.MAOptionName); });
};

function GetProjectChanges() {

    let rootElement = $("#tabProjectDetails");
    let value = "";

    value = rootElement.find("#txtProjectTitle").val();
    if (projectDetailsData.ProjectTitle !== value) {
        projectDetailsData.ProjectTitle = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtProjectTitle").val();
    if (projectDetailsData.ProjectTitle !== value) {
        projectDetailsData.ProjectTitle = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtStartYear").val();
    if (projectDetailsData.StartYear.toString() !== value) {
        projectDetailsData.StartYear = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtEndYear").val();
    if (projectDetailsData.EndYear.toString() !== value) {
        projectDetailsData.EndYear = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtProjectDescription").val();
    if (projectDetailsData.ProjectDescription !== value) {
        projectDetailsData.ProjectDescription = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtLeadAgent").val();
    if (projectDetailsData.LeadAgent !== value) {
        projectDetailsData.LeadAgent = value
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtHostPartner").val();
    if (projectDetailsData.HostPartner !== value) {
        projectDetailsData.HostPartner = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtHostOrganisation").val();
    if (projectDetailsData.HostOrganisation !== value) {
        projectDetailsData.HostOrganisation = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtAlternativeContact").val();
    if (projectDetailsData.AlternativeContact !== value) {
        projectDetailsData.AlternativeContact = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtAlternativeContactEmail").val();
    if (projectDetailsData.AlternativeContactEmail !== value) {
        projectDetailsData.AlternativeContactEmail = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtLink").val();
    if (projectDetailsData.Link !== value) {
        projectDetailsData.Link = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtValidationComments").val();
    if (projectDetailsData.ValidationComments !== value) {
        projectDetailsData.ValidationComments = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtBudgetLower").val();
    if (projectDetailsData.BudgetLower.toString() !== value) {
        projectDetailsData.BudgetLower = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#txtBudgetUpper").val();
    if (projectDetailsData.BudgetUpper.toString() !== value) {
        projectDetailsData.BudgetUpper = value;
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#selProjectType option:selected").val();
    if (projectDetailsData.ProjectTypeName !== value && value !== 'Not Selected') {
        projectDetailsData.ProjectTypeName = value;
        projectDetailsData.ProjectTypeId = rootElement.find("#selProjectType option:selected").attr("id");
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#selProjectSubType option:selected").val();
    if (projectDetailsData.ProjectSubTypeName !== value && value !== 'Not Selected') {
        projectDetailsData.ProjectSubTypeName = value;
        projectDetailsData.ProjectSubTypeId = rootElement.find("#selProjectSubType option:selected").attr("id");
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#selProjectStatus option:selected").val();
    if (projectDetailsData.ProjectStatusName !== value && value !== 'Not Selected') {
        projectDetailsData.ProjectStatusName = value;
        projectDetailsData.ProjectStatusId = rootElement.find("#selProjectStatus option:selected").attr("id");
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#selProjectManager option:selected").val();
    if (projectDetailsData.ProjectManagerName !== value && value !== 'Not Selected') {
        projectDetailsData.ProjectManagerName = value;
        projectDetailsData.ProjectManagerId = rootElement.find("#selProjectManager option:selected").attr("id");
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#selValidationStatus option:selected").val();
    if (projectDetailsData.ValidationStatusName !== value && value !== 'Not Selected') {
        projectDetailsData.ValidationStatusName = value;
        projectDetailsData.ValidationStatusId = rootElement.find("#selValidationStatus option:selected").attr("id");
        projectDetailsData.State = "Modified";
    }

    value = rootElement.find("#selMAOption option:selected").val();
    if (projectDetailsData.MAOptionName !== value && value !== 'Not Selected') {
        projectDetailsData.MAOptionName = value;
        projectDetailsData.MAOptionId = rootElement.find("#selMAOption option:selected").attr("id");
        projectDetailsData.State = "Modified";
    }
}

function ValidateProjectData(data) {

    if (data.ProjectTitle === "") {
        alert("Project title required");
    }
    else if (data.LeadAgent === "") {
        alert("Lead agent required");
    }
    else if (data.HostOrganisation === "") {
        alert("Host organisation required");
    }
    else if (data.ProjectTypeId === "0") {
        alert("Project type selection required");
    }
    else if (data.ProjectStatusId === "0") {
        alert("Project status selection required");
    }
    else if (data.ProjectManagerId === "0") {
        alert("Project manager selection required");
    }
    else if (isNaN(data.StartYear)) {
        alert("Invalid value for Start year");
    }
    else if (isNaN(data.EndYear)) {
        alert("Invalid value for End year");
    }
    else if (isNaN(data.BudgetLower)) {
        alert("Invalid value for Budget lower");
    }
    else if (isNaN(data.BudgetUpper)) {
        alert("Invalid value for Budget upper");
    }
    else {
        return true;
    }

    return false;
}

function SaveProjectChanges() {

    if (projectDetailsData.State === "Modified" && ValidateProjectData(projectDetailsData) === true) {

        ShowLoading();

        let strPostData = JSON.stringify(projectDetailsData);
        let url = apiBaseURL + "api/Projects/AddOrUpdate";

        $.ajax({
            type: "POST",
            url: url,
            data: strPostData,
            contentType: 'application/json'
        })
            .done(function () {
                changesSaved = true;
                GetProjectDetails();
            })
            .fail(function (data) {
                alert("Unable to save project data. See log for errors.");
                console.log('Error:', data);
            });
    }
};

//----------------------//
//  ADAPTATION DETAILS  //
//----------------------//

function GetAdaptationPurpose(callback) {

    let url = apiBaseURL + 'api/AdaptationPurpose/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        adaptationPurposeData = JSON.parse('[{"AdaptationPurposeId": 0,"Description": "", "Value": "Not Selected"}]').concat(data);
        if (callback) callback();
    });

}

function GetSectors(callback) {

    let url = apiBaseURL + 'api/Sector/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        sectorData = JSON.parse('[{"SectorId": 0, "Value": "Not Selected", "SectorTypeId": 0, "ParentSectorID": 0, "TypologyId": 0}]').concat(data);
        if (callback) callback();
    });
}

function GetAdaptationDetails() {

    //Only load details when all dependent data ready
    if (adaptationPurposeData && sectorData) {

        ShowLoading();
        let url = apiBaseURL + 'api/AdaptationDetails/GetByProjectId/' + GetSelectedProjectId();

        $.getJSON(url, function (data) {

            adaptationDetailsData = data;
            LoadAdaptationDetails(adaptationDetailsData);
        });
    }
}

function LoadAdaptationPurpose(data, parent, root) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selAdaptationPurpose">';
    data.forEach(function (item) {

        html += '<option id="' + item.AdaptationPurposeId + '">' + item.Value + '</option>';

    });
    html += '</select>';

    $("#" + root).find("#" + parent).append(html);
};

function LoadAdaptationSector(data, parent, root) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selAdaptationSector">';
    data.forEach(function (item) {

        html += '<option id="' + item.SectorId + '">' + item.Value + '</option>';

    });
    html += '</select>';

    $("#" + root).find("#" + parent).append(html);
};

function LoadAdaptationDetails(data, added) {

    let template = null;

    //Get template data
    $.get("templates/adaptationDetailsTemplate.html", function (tdata) {
        template = tdata;
    }, 'text').

        then(() => {

            $("#divAdaptationDetails").html("");

            data.forEach(function (item) {

                data.State = "Unchanged"; //Set initial data state
                let tmpTemplate = template;

                //Replace parent div ID
                let rootId = "AD" + item.AdaptationDetailId;
                tmpTemplate = tmpTemplate.replace("AD#", rootId);

                if (item.Description === null) item.Description = "";
                tmpTemplate = tmpTemplate.replace("##txtAdaptationDescription##", item.Description)
                $("#divAdaptationDetails").append(tmpTemplate);

                LoadAdaptationPurpose(adaptationPurposeData, "divAdaptationPurpose", rootId);
                LoadAdaptationSector(sectorData, "divAdaptationSector", rootId);

                SetAdaptationSelects(item, rootId);
            });

            $('textarea').autoHeight();

            if (added) {
                SetEditMode(true);
            }

            HideLoading();
        });
};

function SetAdaptationSelects(data, root) {

    $("#" + root).find("#selAdaptationPurpose option").each(function () { this.selected = (this.text == data.AdaptationPurposeName); });
    $("#" + root).find("#selAdaptationSector option").each(function () { this.selected = (this.text == data.SectorName); });
}

$("#addAdaptation").click(function () {

    //Get current changes
    GetAdaptationChanges();

    //Add new item
    var projectId = GetSelectedProjectId();

    var newItem = {
        "AdaptationDetailId": GetUID(),
        "Description": "",
        "AdaptationPurposeId": 0,
        "ProjectId": projectId,
        "SectorId": 0
    }

    adaptationDetailsData = adaptationDetailsData.concat(newItem);
    LoadAdaptationDetails(adaptationDetailsData, true);

});

function GetAdaptationChanges() {

    adaptationDetailsData.forEach(function (item) {

        let rootId = "AD" + item.AdaptationDetailId;
        let rootElement = $("#" + rootId);
        let value = "";

        value = rootElement.find("#txtAdaptationDescription").val();
        if (item.Description !== value) {
            item.Description = value;
            item.State = "Modified";
        }

        value = rootElement.find("#selAdaptationPurpose option:selected").val();
        if (item.AdaptationPurposeName !== value && value !== 'Not Selected') {
            item.AdaptationPurposeName = value;
            item.AdaptationPurposeId = rootElement.find("#selAdaptationPurpose option:selected").attr("id");
            item.State = "Modified";
        }

        value = rootElement.find("#selAdaptationSector option:selected").val();
        if (item.SectorName !== value && value !== 'Not Selected') {
            item.SectorName = value;
            item.SectorId = rootElement.find("#selAdaptationSector option:selected").attr("id");
            item.State = "Modified";
        }
    });
};

function ValidateAdaptationData(data) {

    if (data.AdaptationPurposeId === "0") {
        alert("Adaptation purpose required");
    }
    else {
        return true;
    }

    return false;
};

function SaveAdaptationChanges() {

    adaptationDetailsData.forEach(function (item) {

        if (item.State === 'Modified' && ValidateAdaptationData(item)) {

            ShowLoading();

            //Save adaptation changes
            let strPostData = JSON.stringify(item);
            let url = apiBaseURL + "/api/AdaptationDetails/AddOrUpdate";

            $.ajax({
                type: "POST",
                url: url,
                data: strPostData,
                contentType: 'application/json'
            })
                .done(function () {
                    changesSaved = true;
                    GetAdaptationDetails();
                })
                .fail(function (data) {
                    alert("Unable to save adaptation data. See log for errors.");
                    console.log('Error:', data);
                    return false;
                });
        }
    });

    return true;
};


//----------------------//
//  MITIGATION DETAILS  //
//----------------------//

function GetCarbonCredit(callback) {

    let url = apiBaseURL + 'api/CarbonCredit/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        carbonCreditData = JSON.parse('[{"CarbonCreditId": 0, "Value": "Not Selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetCarbonCreditMarket(callback) {

    let url = apiBaseURL + 'api/CarbonCreditMarket/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        carbonCreditMarketData = JSON.parse('[{"CarbonCreditMarketId": 0, "Value": "Not Selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetCDMStatus(callback) {

    let url = apiBaseURL + 'api/CDMStatus/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        cdmStatusData = JSON.parse('[{"CDMStatusId": 0, "Value": "Not Selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetCDMMethodology(callback) {

    let url = apiBaseURL + 'api/CDMMethodology/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        cdmMethodologyData = JSON.parse('[{"CDMMethodologyId": 0, "Value": "Not Selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetVoluntaryMethodology(callback) {

    let url = apiBaseURL + 'api/VoluntaryMethodology/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        voluntaryMethodologyData = JSON.parse('[{"VoluntaryMethodologyId": 0, "Value": "Not Selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetVoluntaryGoldStandard(callback) {

    let url = apiBaseURL + 'api/VoluntaryGoldStandard/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        voluntaryGoldStandardData = JSON.parse('[{"VoluntaryGoldStandardId": 0, "Value": "Not Selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetMitigationDetails() {

    //Only load details when all dependent data ready
    if (carbonCreditData && carbonCreditMarketData && cdmStatusData && cdmMethodologyData && voluntaryMethodologyData && voluntaryGoldStandardData) {

        ShowLoading();

        let template = null;
        let url = apiBaseURL + 'api/MitigationDetails/GetByProjectID/' + GetSelectedProjectId();

        //Get adaptation details
        $.getJSON(url, function (data) {
            mitigationDetailsData = data;
            LoadMitigationDetails(data);
        });
    }
}

function LoadMitigationDetails(data, added) {

    //Only load details when all dependent data ready
    if (carbonCreditData && carbonCreditMarketData && cdmStatusData && cdmMethodologyData && voluntaryMethodologyData && voluntaryGoldStandardData) {

        let template = null;
        //Get template data
        $.get("templates/mitigationDetailsTemplate.html", function (tdata) {
            template = tdata;
        }, 'text').

            then(() => {

                $("#divMitigationDetails").html("");

                data.forEach(function (item) {

                    data.State = "Unchanged"; //Set initial data state
                    let tmpTemplate = template;

                    //Replace parent div ID
                    let rootId = "MD" + item.MitigationDetailId;
                    tmpTemplate = tmpTemplate.replace("MD#", rootId);

                    //Text inputs
                    if (item.CDMProjectNumber === null) item.CDMProjectNumber = "";
                    tmpTemplate = tmpTemplate.replace("##CDMProjectNumber##", item.CDMProjectNumber)

                    if (item.OtherDescription === null) item.OtherDescription = "";
                    tmpTemplate = tmpTemplate.replace("##OtherDescription##", item.OtherDescription)

                    //Appent html
                    $("#divMitigationDetails").append(tmpTemplate);

                    //Load selects
                    LoadCarbonCredit(carbonCreditData, "divCarbonCredit", rootId);
                    LoadCarbonCreditMarket(carbonCreditMarketData, "divCarbonCreditMarket", rootId);
                    LoadCDMStatus(cdmStatusData, "divCDMStatus", rootId);
                    LoadCDMMethodology(cdmMethodologyData, "divCDMMethodology", rootId);
                    LoadVoluntaryMethodology(voluntaryMethodologyData, "divVoluntaryMethodology", rootId);
                    LoadVoluntaryGoldStandard(voluntaryGoldStandardData, "divVoluntaryGoldStandard", rootId);
                    LoadMitigationSector(sectorData, "divMitigationSector", rootId);

                    SetMitigationSelects(item, rootId);
                });

                $('textarea').autoHeight();

                if (added) {
                    SetEditMode(true);
                }

                HideLoading();
            });
    }
}

function LoadCarbonCredit(data, parent, root) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selCarbonCredit">';
    data.forEach(function (item) {

        html += '<option id="' + item.CarbonCreditId + '">' + item.Value + '</option>';

    });
    html += '</select>';

    $("#" + root).find("#" + parent).append(html);
};

function LoadCarbonCreditMarket(data, parent, root) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selCarbonCreditMarket">';
    data.forEach(function (item) {

        html += '<option id="' + item.CarbonCreditMarketId + '">' + item.Value + '</option>';

    });
    html += '</select>';

    $("#" + root).find("#" + parent).append(html);
};

function LoadCDMStatus(data, parent, root) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selCDMStatus">';
    data.forEach(function (item) {

        html += '<option id="' + item.CDMStatusId + '">' + item.Value + '</option>';

    });
    html += '</select>';

    $("#" + root).find("#" + parent).append(html);
};

function LoadCDMMethodology(data, parent, root) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selCDMMethodology">';
    data.forEach(function (item) {

        html += '<option id="' + item.CDMMethodologyId + '">' + item.Value + '</option>';

    });
    html += '</select>';

    $("#" + root).find("#" + parent).append(html);
};

function LoadVoluntaryMethodology(data, parent, root) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selVoluntaryMethodology">';
    data.forEach(function (item) {

        html += '<option id="' + item.VoluntaryMethodologyId + '">' + item.Value + '</option>';

    });
    html += '</select>';

    $("#" + root).find("#" + parent).append(html);
};

function LoadVoluntaryGoldStandard(data, parent, root) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selVoluntaryGoldStandard">';
    data.forEach(function (item) {

        html += '<option id="' + item.VoluntaryGoldStandardId + '">' + item.Value + '</option>';

    });
    html += '</select>';

    $("#" + root).find("#" + parent).append(html);
};

function LoadMitigationSector(data, parent, root) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selMitigationSector">';
    data.forEach(function (item) {

        html += '<option id="' + item.SectorId + '">' + item.Value + '</option>';

    });
    html += '</select>';

    $("#" + root).find("#" + parent).append(html);
};

function SetMitigationSelects(data, root) {

    $("#" + root).find("#selCarbonCredit option").each(function () { this.selected = (this.text == data.CarbonCreditName); });
    $("#" + root).find("#selCarbonCreditMarket option").each(function () { this.selected = (this.text == data.CarbonCreditMarketName); });
    $("#" + root).find("#selCDMStatus option").each(function () { this.selected = (this.text == data.CDMStatusName); });
    $("#" + root).find("#selCDMMethodology option").each(function () { this.selected = (this.text == data.CDMMethodologyName); });
    $("#" + root).find("#selVoluntaryMethodology option").each(function () { this.selected = (this.text == data.VoluntaryMethodologyName); });
    $("#" + root).find("#selVoluntaryGoldStandard option").each(function () { this.selected = (this.text == data.VoluntaryGoldStandardName); });
}

$("#addMitigation").click(function () {

    //Get mitigation changes
    GetMitigationChanges();

    //Add new item
    var projectId = GetSelectedProjectId();

    var newItem = {
        "MitigationDetailId": GetUID(),
        "VCS": 0,
        "Other": 0,
        "OtherDescription": "",
        "CDMProjectNumber": "",
        "CarbonCreditId": 0,
        "CarbonCreditMarketId": 0,
        "CDMStatusId": 0,
        "CDMMethodologyId": 0,
        "VoluntaryMethodologyId": 0,
        "VoluntaryGoldStandardId": 0,
        "ProjectId": projectId,
        "SectorId": 0
    }

    mitigationDetailsData = mitigationDetailsData.concat(newItem);
    LoadMitigationDetails(mitigationDetailsData, true);
});

function GetMitigationChanges() {

    mitigationDetailsData.forEach(function (item) {

        let rootId = "MD" + item.MitigationDetailId;
        let rootElement = $("#" + rootId);
        let value = "";

        value = rootElement.find("#selCarbonCredit option:selected").val();
        if (item.CarbonCreditName !== value && value !== 'Not Selected') {
            item.CarbonCreditName = value;
            item.CarbonCreditId = rootElement.find("#selCarbonCredit option:selected").attr("id");
            item.State = "Modified";
        }

        value = rootElement.find("#selCarbonCreditMarket option:selected").val();
        if (item.CarbonCreditMarketName !== value && value !== 'Not Selected') {
            item.CarbonCreditMarketName = value;
            item.CarbonCreditMarketId = rootElement.find("#selCarbonCreditMarket option:selected").attr("id");
            item.State = "Modified";
        }

        value = rootElement.find("#selCDMStatus option:selected").val();
        if (item.CDMStatusName !== value && value !== 'Not Selected') {
            item.CDMStatusName = value;
            item.CDMStatusId = rootElement.find("#selCDMStatus option:selected").attr("id");
            item.State = "Modified";
        }

        value = rootElement.find("#selCDMMethodology option:selected").val();
        if (item.CDMMethodologyName !== value && value !== 'Not Selected') {
            item.CDMMethodologyName = value;
            item.CDMMethodologyId = rootElement.find("#selCDMMethodology option:selected").attr("id");
            item.State = "Modified";
        }

        value = rootElement.find("#selVoluntaryMethodology option:selected").val();
        if (item.VoluntaryMethodologyName !== value && value !== 'Not Selected') {
            item.VoluntaryMethodologyName = value;
            item.VoluntaryMethodologyId = rootElement.find("#selVoluntaryMethodology option:selected").attr("id");
            item.State = "Modified";
        }

        value = rootElement.find("#selVoluntaryGoldStandard option:selected").val();
        if (item.VoluntaryGoldStandardName !== value && value !== 'Not Selected') {
            item.VoluntaryGoldStandardName = value;
            item.VoluntaryGoldStandardId = rootElement.find("#selVoluntaryGoldStandard option:selected").attr("id");
            item.State = "Modified";
        }

        value = rootElement.find("#selMitigationSector option:selected").val();
        if (item.SectorName !== value && value !== 'Not Selected') {
            item.SectorName = value;
            item.SectorId = rootElement.find("#selMitigationSector option:selected").attr("id");
            item.State = "Modified";
        }

        value = rootElement.find("#txtCDMProjectNumber").val();
        if (item.CDMProjectNumber !== value) {
            item.CDMProjectNumber = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtOtherDescription").val();
        if (item.OtherDescription !== value) {
            item.OtherDescription = value;
            item.State = "Modified";
        }
    });
}

function ValidateMitigationData(data) {

    if (data.CarbonCreditId === "0") {
        alert("Carbon credit selection required");
    }
    else {
        return true;
    }

    return false;
}

function SaveMitigationChanges() {

    mitigationDetailsData.forEach(function (item) {

        if (item.State === 'Modified' && ValidateMitigationData(item)) {

            ShowLoading();

            //Save adaptation changes
            let strPostData = JSON.stringify(item);
            let url = apiBaseURL + "/api/MitigationDetails/AddOrUpdate";

            $.ajax({
                type: "POST",
                url: url,
                data: strPostData,
                contentType: 'application/json'
            })
                .done(function () {
                    changesSaved = true;
                    GetMitigationDetails();
                })
                .fail(function (data) {
                    alert("Unable to save mitigation data. See log for errors.");
                    console.log('Error:', data);
                    return false;
                });
        }
    });

    return true;
};


//--------------------------------//
//  MITIGATION EMISSIONS DETAILS  //
//--------------------------------//

function GetMitigationEmissions() {

    ShowLoading();

    let url = apiBaseURL + 'api/MitigationEmissionsData/GetByProjectId/' + GetSelectedProjectId();

    //Get adaptation details
    $.getJSON(url, function (data) {

        mitigationEmissionsData = data;
        LoadMitigationEmissions(mitigationEmissionsData);
    });
}

function LoadMitigationEmissions(data, added) {

    let template = null;

    //Get template data
    $.get("templates/mitigationEmissionsTemplate.html", function (tdata) {
        template = tdata;
    }, 'text').

        then(() => {

            $("#divMitigationEmissions").html("");

            data.forEach(function (item) {

                data.State = "Unchanged"; //Set initial data state
                let tmpTemplate = template;

                //Replace parent div ID
                let rootId = "ME" + item.MitigationEmissionsDataId;
                tmpTemplate = tmpTemplate.replace("ME#", rootId);

                if (item.Year === null) item.Year = "";
                tmpTemplate = tmpTemplate.replace("##Year##", item.Year)

                if (item.CO2 === null) item.CO2 = "";
                tmpTemplate = tmpTemplate.replace("##CO2##", item.CO2)

                if (item.CH4 === null) item.CH4 = "";
                tmpTemplate = tmpTemplate.replace("##CH4##", item.CH4)

                if (item.CH4_CO2e === null) item.CH4_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##CH4_CO2e##", item.CH4_CO2e)

                if (item.N2O === null) item.N2O = "";
                tmpTemplate = tmpTemplate.replace("##N2O##", item.N2O)

                if (item.N2O_CO2e === null) item.N2O_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##N2O_CO2e##", item.N2O_CO2e)

                if (item.HFC === null) item.HFC = "";
                tmpTemplate = tmpTemplate.replace("##HFC##", item.HFC)

                if (item.HFC_CO2e === null) item.HFC_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##HFC_CO2e##", item.HFC_CO2e)

                if (item.PFC === null) item.PFC = "";
                tmpTemplate = tmpTemplate.replace("##PFC##", item.PFC)

                if (item.PFC_CO2e === null) item.PFC_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##PFC_CO2e##", item.PFC_CO2e)

                if (item.SF6 === null) item.SF6 = "";
                tmpTemplate = tmpTemplate.replace("##SF6##", item.SF6)

                if (item.SF6_CO2e === null) item.SF6_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##SF6_CO2e##", item.SF6_CO2e)

                if (item.Hydro === null) item.Hydro = "";
                tmpTemplate = tmpTemplate.replace("##Hydro##", item.Hydro)

                if (item.Hydro_CO2e === null) item.Hydro_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##Hydro_CO2e##", item.Hydro_CO2e)

                if (item.Tidal === null) item.Tidal = "";
                tmpTemplate = tmpTemplate.replace("##Tidal##", item.Tidal)

                if (item.Tidal_CO2e === null) item.Tidal_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##Tidal_CO2e##", item.Tidal_CO2e)

                if (item.Wind === null) item.Wind = "";
                tmpTemplate = tmpTemplate.replace("##Wind##", item.Wind)

                if (item.Wind_CO2e === null) item.Wind_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##Wind_CO2e##", item.Wind_CO2e)

                if (item.Solar === null) item.Solar = "";
                tmpTemplate = tmpTemplate.replace("##Solar##", item.Solar)

                if (item.Solar_CO2e === null) item.Solar_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##Solar_CO2e##", item.Solar_CO2e)

                if (item.FossilFuelElecRed === null) item.FossilFuelElecRed = "";
                tmpTemplate = tmpTemplate.replace("##FossilFuelElecRed##", item.FossilFuelElecRed)

                if (item.FossilFuelElecRed_CO2e === null) item.FossilFuelElecRed_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##FossilFuelElecRed_CO2e##", item.FossilFuelElecRed_CO2e)

                if (item.BioWaste === null) item.BioWaste = "";
                tmpTemplate = tmpTemplate.replace("##BioWaste##", item.BioWaste)

                if (item.BioWaste_CO2e === null) item.BioWaste_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##BioWaste_CO2e##", item.BioWaste_CO2e)

                if (item.Geothermal === null) item.Geothermal = "";
                tmpTemplate = tmpTemplate.replace("##Geothermal##", item.Geothermal)

                if (item.Geothermal_CO2e === null) item.Geothermal_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##Geothermal_CO2e##", item.Geothermal_CO2e)

                $("#divMitigationEmissions").append(tmpTemplate);
            });

            $('textarea').autoHeight();

            if (added) {
                SetEditMode(true);
            }

            HideLoading();
        });
};

$("#addEmissions").click(function () {

    //Get current emissions changes
    GetMitigationEmissionsChanges()

    //Add new item
    var projectId = GetSelectedProjectId();

    var newItem = {
        "MitigationEmissionsDataId": GetUID(),
        "Year": 0,
        "CO2": 0,
        "CH4": 0,
        "CH4_CO2e": 0,
        "N2O": 0,
        "N2O_CO2e": 0,
        "HFC": 0,
        "HFC_CO2e": 0,
        "PFC": 0,
        "PFC_CO2e": 0,
        "SF6": 0,
        "SF6_CO2e": 0,
        "Hydro": 0,
        "Hydro_CO2e": 0,
        "Tidal": 0,
        "Tidal_CO2e": 0,
        "Wind": 0,
        "Wind_CO2e": 0,
        "Solar": 0,
        "Solar_CO2e": 0,
        "FossilFuelElecRed": 0,
        "FossilFuelElecRed_CO2e": 0,
        "BioWaste": 0,
        "BioWaste_CO2e": 0,
        "Geothermal": 0,
        "Geothermal_CO2e": 0,
        "ProjectId": projectId
    };

    mitigationEmissionsData = mitigationEmissionsData.concat(newItem);
    LoadMitigationEmissions(mitigationEmissionsData, true);
});

function GetMitigationEmissionsChanges() {

    mitigationEmissionsData.forEach(function (item) {

        let rootId = "ME" + item.MitigationEmissionsDataId;
        let rootElement = $("#" + rootId);
        let value = "";

        value = rootElement.find("#txtYear").val();
        if (item.Year.toString() !== value) {
            item.Year = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtCO2").val();
        if (item.CO2.toString() !== value) {
            item.CO2 = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtCH4").val();
        if (item.CH4.toString() !== value) {
            item.CH4 = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtCH4_CO2e").val();
        if (item.CH4_CO2e.toString() !== value) {
            item.CH4_CO2e = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtN2O").val();
        if (item.N2O.toString() !== value) {
            item.N2O = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtN2O_CO2e").val();
        if (item.N2O_CO2e.toString() !== value) {
            item.N2O_CO2e = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtHFC").val();
        if (item.HFC.toString() !== value) {
            item.HFC = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtHFC_CO2e").val();
        if (item.HFC_CO2e.toString() !== value) {
            item.HFC_CO2e = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtPFC").val();
        if (item.PFC.toString() !== value) {
            item.PFC = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtPFC_CO2e").val();
        if (item.PFC_CO2e.toString() !== value) {
            item.PFC_CO2e = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtSF6").val();
        if (item.SF6.toString() !== value) {
            item.SF6 = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtSF6_CO2e").val();
        if (item.SF6_CO2e.toString() !== value) {
            item.SF6_CO2e = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtHydro").val();
        if (item.Hydro.toString() !== value) {
            item.Hydro = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtHydro_CO2e").val();
        if (item.Hydro_CO2e.toString() !== value) {
            item.Hydro_CO2e = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtTidal").val();
        if (item.Tidal.toString() !== value) {
            item.Tidal = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtTidal_CO2e").val();
        if (item.Tidal_CO2e.toString() !== value) {
            item.Tidal_CO2e = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtWind").val();
        if (item.Wind.toString() !== value) {
            item.Wind = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtWind_CO2e").val();
        if (item.Wind_CO2e.toString() !== value) {
            item.Wind_CO2e = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtSolar").val();
        if (item.Solar.toString() !== value) {
            item.Solar = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtSolar_CO2e").val();
        if (item.Solar_CO2e.toString() !== value) {
            item.Solar_CO2e = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtFossilFuelElecRed").val();
        if (item.FossilFuelElecRed.toString() !== value) {
            item.FossilFuelElecRed = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtFossilFuelElecRed_CO2e").val();
        if (item.FossilFuelElecRed_CO2e.toString() !== value) {
            item.FossilFuelElecRed_CO2e = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtBioWaste").val();
        if (item.BioWaste.toString() !== value) {
            item.BioWaste = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtBioWaste_CO2e").val();
        if (item.BioWaste_CO2e.toString() !== value) {
            item.BioWaste_CO2e = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtGeothermal").val();
        if (item.Geothermal.toString() !== value) {
            item.Geothermal = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtGeothermal_CO2e").val();
        if (item.Geothermal_CO2e.toString() !== value) {
            item.Geothermal_CO2e = value;
            item.State = "Modified";
        }
    });
}

function ValidateMitigationEmissionsData(data) {

    if (data.Year === "") {
        alert("Year value required");
    }
    else if (data.Year !== "" && isNaN(data.Year)) {
        alert("Invalid value for Year");
    }
    else if (data.CO2 !== "" && isNaN(data.CO2)) {
        alert("Invalid value for CO2");
    }
    else if (data.CH4 !== "" && isNaN(data.CH4)) {
        alert("Invalid value for CH4");
    }
    else if (data.CH4_CO2e !== "" && isNaN(data.CH4_CO2e)) {
        alert("Invalid value for CH4_CO2e");
    }
    else if (data.N2O !== "" && isNaN(data.N2O)) {
        alert("Invalid value for N2O");
    }
    else if (data.N2O_CO2e !== "" && isNaN(data.N2O_CO2e)) {
        alert("Invalid value for N2O_CO2e");
    }
    else if (data.HFC !== "" && isNaN(data.HFC)) {
        alert("Invalid value for HFC");
    }
    else if (data.HFC_CO2e !== "" && isNaN(data.HFC_CO2e)) {
        alert("Invalid value for HFC_CO2e");
    }
    else if (data.PFC !== "" && isNaN(data.PFC)) {
        alert("Invalid value for PFC");
    }
    else if (data.PFC_CO2e !== "" && isNaN(data.PFC_CO2e)) {
        alert("Invalid value for PFC_CO2e");
    }
    else if (data.SF6 !== "" && isNaN(data.SF6)) {
        alert("Invalid value for SF6");
    }
    else if (data.SF6_CO2e !== "" && isNaN(data.SF6_CO2e)) {
        alert("Invalid value for SF6_CO2e");
    }
    else if (data.Hydro !== "" && isNaN(data.Hydro)) {
        alert("Invalid value for Hydro");
    }
    else if (data.Hydro_CO2e !== "" && isNaN(data.Hydro_CO2e)) {
        alert("Invalid value for Hydro_CO2e");
    }
    else if (data.Tidal !== "" && isNaN(data.Tidal)) {
        alert("Invalid value for Tidal");
    }
    else if (data.Tidal_CO2e !== "" && isNaN(data.Tidal_CO2e)) {
        alert("Invalid value for Tidal_CO2e");
    }
    else if (data.Wind !== "" && isNaN(data.Wind)) {
        alert("Invalid value for Wind");
    }
    else if (data.Wind_CO2e !== "" && isNaN(data.Wind_CO2e)) {
        alert("Invalid value for Wind_CO2e");
    }
    else if (data.Solar !== "" && isNaN(data.Solar)) {
        alert("Invalid value for Solar");
    }
    else if (data.Solar_CO2e !== "" && isNaN(data.Solar_CO2e)) {
        alert("Invalid value for Solar_CO2e");
    }
    else if (data.FossilFuelElecRed !== "" && isNaN(data.FossilFuelElecRed)) {
        alert("Invalid value for FossilFuelElecRed");
    }
    else if (data.FossilFuelElecRed_CO2e !== "" && isNaN(data.FossilFuelElecRed_CO2e)) {
        alert("Invalid value for FossilFuelElecRed_CO2e");
    }
    else if (data.BioWaste !== "" && isNaN(data.BioWaste)) {
        alert("Invalid value for BioWaste");
    }
    else if (data.BioWaste_CO2e !== "" && isNaN(data.BioWaste_CO2e)) {
        alert("Invalid value for BioWaste_CO2e");
    }
    else if (data.Geothermal !== "" && isNaN(data.Geothermal)) {
        alert("Invalid value for Geothermal");
    }
    else if (data.Geothermal_CO2e !== "" && isNaN(data.Geothermal_CO2e)) {
        alert("Invalid value for Geothermal_CO2e");
    }
    else {
        return true;
    }

    return false;
};

function SaveMitigationEmissionsChanges() {

    mitigationEmissionsData.forEach(function (item) {

        if (item.State === 'Modified' && ValidateMitigationEmissionsData(item)) {

            ShowLoading();

            //Save adaptation changes
            let strPostData = JSON.stringify(item);
            let url = apiBaseURL + "/api/MitigationEmissionsData/AddOrUpdate";

            $.ajax({
                type: "POST",
                url: url,
                data: strPostData,
                contentType: 'application/json'
            })
                .done(function () {
                    changesSaved = true;
                    GetMitigationEmissions();
                })
                .fail(function (data) {
                    alert("Unable to save mitigation emissions data. See log for errors.");
                    console.log('Error:', data);
                    return false;
                });
        }
    });

    return true;
};


//--------------------//
//  RESEARCH DETAILS  //
//--------------------//

function GetResearchType(callback) {

    let url = apiBaseURL + 'api/ResearchType/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        researchTypeData = JSON.parse('[{"ResearchTypeId": 0, "Value": "Not Selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetTargetAudience(callback) {

    let url = apiBaseURL + 'api/TargetAudience/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        targetAudienceData = JSON.parse('[{"TargetAudienceId": 0, "Value": "Not Selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetResearchDetails() {

    //Only load details when all dependent data ready
    if (researchTypeData && targetAudienceData && sectorData) {

        ShowLoading();

        let url = apiBaseURL + 'api/ResearchDetails/GetByProjectId/' + GetSelectedProjectId();

        //Get adaptation details
        $.getJSON(url, function (data) {

            researchDetailsData = data;
            LoadResearchDetails(researchDetailsData);
        });
    }
}

function LoadResearchDetails(data, added) {

    let template = null;

    //Get template data
    $.get("templates/researchDetailsTemplate.html", function (tdata) {
        template = tdata;
    }, 'text').

        then(() => {

            $("#divResearchDetails").html("");

            data.forEach(function (item) {

                data.State = "Unchanged"; //Set initial data state
                let tmpTemplate = template;

                //Replace parent div ID
                let rootId = "RD" + item.ResearchDetailId;
                tmpTemplate = tmpTemplate.replace("RD#", rootId);

                if (item.Author === null) item.Author = "";
                tmpTemplate = tmpTemplate.replace("##Author##", item.Author)

                if (item.PaperLink === null) item.PaperLink = "";
                tmpTemplate = tmpTemplate.replace("##PaperLink##", item.PaperLink)

                $("#divResearchDetails").append(tmpTemplate);

                LoadResearchType(researchTypeData, "divResearchType", rootId);
                LoadTargetAudience(targetAudienceData, "divTargetAudience", rootId);
                LoadResearchSector(sectorData, "divResearchSector", rootId);

                SetResearchSelects(item, rootId);
            });

            $('textarea').autoHeight();

            if (added) {
                SetEditMode(true);
            }

            HideLoading();
        });
}

function LoadResearchType(data, parent, root) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selResearchType">';
    data.forEach(function (item) {

        html += '<option id="' + item.ResearchTypeId + '">' + item.Value + '</option>';

    });
    html += '</select>';

    $("#" + root).find("#" + parent).append(html);
}

function LoadTargetAudience(data, parent, root) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selTargetAudience">';
    data.forEach(function (item) {

        html += '<option id="' + item.TargetAudienceId + '">' + item.Value + '</option>';

    });
    html += '</select>';

    $("#" + root).find("#" + parent).append(html);
}

function LoadResearchSector(data, parent, root) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selResearchSector">';
    data.forEach(function (item) {

        html += '<option id="' + item.SectorId + '">' + item.Value + '</option>';

    });
    html += '</select>';

    $("#" + root).find("#" + parent).append(html);
}

function SetResearchSelects(data, root) {

    $("#" + root).find("#selResearchType option").each(function () { this.selected = (this.text == data.ResearchTypeName); });
    $("#" + root).find("#selTargetAudience option").each(function () { this.selected = (this.text == data.TargetAudienceName); });
    $("#" + root).find("#selResearchSector option").each(function () { this.selected = (this.text == data.SectorName); });
}

$("#addResearch").click(function () {

    //Get current changes
    GetResearchChanges();

    //Add new item
    var projectId = GetSelectedProjectId();

    var newItem = {
        "ResearchDetailId": GetUID(),
        "Author": "",
        "PaperLink": "",
        "ResearchTypeId": 0,
        "TargetAudienceId": 0,
        "ProjectId": projectId,
        "SectorId": 0
    };

    researchDetailsData = researchDetailsData.concat(newItem);
    LoadResearchDetails(researchDetailsData, true);
});

function GetResearchChanges() {

    researchDetailsData.forEach(function (item) {

        let rootId = "RD" + item.ResearchDetailId;
        let rootElement = $("#" + rootId);
        let value = "";

        value = rootElement.find("#txtAuthor").val();
        if (item.Author !== value) {
            item.Author = value;
            item.State = "Modified";
        }

        value = rootElement.find("#txtPaperLink").val();
        if (item.PaperLink !== value) {
            item.PaperLink = value;
            item.State = "Modified";
        }

        value = rootElement.find("#selResearchType option:selected").val();
        if (item.ResearchTypeName !== value && value !== 'Not Selected') {
            item.ResearchTypeName = value;
            item.ResearchTypeId = rootElement.find("#selResearchType option:selected").attr("id");
            item.State = "Modified";
        }

        value = rootElement.find("#selTargetAudience option:selected").val();
        if (item.TargetAudienceName !== value && value !== 'Not Selected') {
            item.TargetAudienceName = value;
            item.TargetAudienceId = rootElement.find("#selTargetAudience option:selected").attr("id");
            item.State = "Modified";
        }

        value = rootElement.find("#selResearchSector option:selected").val();
        if (item.SectorName !== value && value !== 'Not Selected') {
            item.SectorName = value;
            item.SectorId = rootElement.find("#selResearchSector option:selected").attr("id");
            item.State = "Modified";
        }
    });
}

function ValidateResearchData(data) {

    if (data.Author === "") {
        alert("Author value required");
    }
    else if (data.ResearchTypeId === "0") {
        alert("Research type selection required");
    }
    else if (data.TargetAudienceId === "0") {
        alert("Target audience selection required");
    }
    else {
        return true;
    }

    return false;
};

function SaveResearchChanges() {

    researchDetailsData.forEach(function (item) {

        if (item.State === 'Modified' && ValidateResearchData(item)) {

            ShowLoading();

            //Save adaptation changes
            let strPostData = JSON.stringify(item);
            let url = apiBaseURL + "/api/ResearchDetails/AddOrUpdate";

            $.ajax({
                type: "POST",
                url: url,
                data: strPostData,
                contentType: 'application/json'
            })
                .done(function () {
                    changesSaved = true;
                    GetResearchDetails();
                })
                .fail(function (data) {
                    alert("Unable to save research data. See log for errors.");
                    console.log('Error:', data);
                    return false;
                });
        }
    });

    return true;
};