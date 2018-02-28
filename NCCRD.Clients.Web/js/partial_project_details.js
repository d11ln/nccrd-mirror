
//-----------//
//  GENERAL  //
//-----------//

//Shared data
var sectorData = null

//Project data
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
    GetProjectTypes(LoadProjectDetails);
    GetProjectSubTypes(LoadProjectDetails);
    GetProjectStatus(LoadProjectDetails);
    GetProjectManagers(LoadProjectDetails);
    GetValidationStatus(LoadProjectDetails);
    GetMAOptions(LoadProjectDetails);

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
$("#editToggle").click(function () {

    if ($('#' + this.id).text() === 'EDIT MODE: ON') {
        SetEditMode(false);
    }
    else {
        SetEditMode(true);
    }
});

function SetEditMode(state) {

    let toggle = $('#editToggle');

    if (state === false) {
        toggle.text("EDIT MODE: OFF");
        toggle.removeClass('btn-warning');
        toggle.addClass('btn-secondary');

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
    }
    else {
        toggle.text("EDIT MODE: ON");
        toggle.removeClass('btn-secondary');
        toggle.addClass('btn-warning');

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

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
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

function LoadProjectTypes(data, parent) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selProjectType">';

    data.forEach(function (item) {
        html += '<option id="ptid' + item.ProjectTypeId + '">' + item.Value + '</option>';
    });

    html += '</select>';
    parent.append(html);
};

function LoadProjectSubTypes(data, parent) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selProjectSubType">';

    data.forEach(function (item) {
        html += '<option id="pstid' + item.ProjectSubTypeId + '">' + item.Value + '</option>';
    });

    html += '</select>';
    parent.append(html);
};

function LoadProjectStatus(data, parent) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selProjectStatus">';

    data.forEach(function (item) {
        html += '<option id="psid' + item.ProjectStatusId + '">' + item.Value + '</option>';
    });

    html += '</select>';
    parent.append(html);
};

function LoadProjectManagers(data, parent) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selProjectManager">';

    data.forEach(function (item) {
        html += '<option id="pmid' + item.UserId + '">' + item.DisplayName + '</option>';
    });

    html += '</select>';
    parent.append(html);
};

function LoadValidationStatus(data, parent) {

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selValidationStatus">';

    data.forEach(function (item) {
        html += '<option id="vsid' + item.ValidationStatusId + '">' + item.Value + '</option>';
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
            html += '<option id="maoid' + item.MAOptionId + '">' + item.Name + '</option>';
        });

        html += '</select>';
        parent.append(html);
    });
};

function LoadProjectDetails() {

    if (projectTypeData && projectSubTypeData && projectStatusData && projectManagerData && validationStatusData && maOptionsData) {

        let url = apiBaseURL + 'api/projects/GetById/' + GetSelectedProjectId();

        $.getJSON(url, function (data) {

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
            $("#txtBudgetUpper").val(data.BudgetUpper);

            $('textarea').autoHeight();
            SetProjectSelects(data);
        });
    }
};

function SetProjectSelects(data) {

    $("#selProjectType option").each(function () { this.selected = (this.text == data.ProjectTypeName); });
    $("#selProjectSubType option").each(function () { this.selected = (this.text == data.ProjectSubTypeName); });
    $("#selProjectStatus option").each(function () { this.selected = (this.text == data.ProjectStatusName); });
    $("#selProjectManager option").each(function () { this.selected = (this.text == data.ProjectManagerName); });
    $("#selValidationStatus option").each(function () { this.selected = (this.text == data.ValidationStatusName); });
    $("#selMAOption option").each(function () { this.selected = (this.text == data.MAOptionName); });
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
    $.get("templates/adaptationDetailsTemplate.html", function (data) {
        template = data;
    }, 'text').

        then(() => {

            $("#divAdaptationDetails").html("");

            data.forEach(function (item) {

                let tmpTemplate = template;

                //Replace parent div ID
                let rootId = "AD" + item.AdaptationDetailId;
                tmpTemplate = tmpTemplate.replace("AD#", rootId);

                if (!item.Description) item.Description = "";
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
        });
};

function SetAdaptationSelects(data, root) {

    $("#" + root).find("#selAdaptationPurpose option").each(function () { this.selected = (this.text == data.AdaptationPurposeName); });
    $("#" + root).find("#selAdaptationSector option").each(function () { this.selected = (this.text == data.SectorName); });
}

$("#addAdaptation").click(function () {

    var projectId = GetSelectedProjectId();

    var newItem = {
        "AdaptationDetailId": uuidv4(),
        "Description": "",
        "AdaptationPurposeId": 0,
        "ProjectId": projectId,
        "SectorId": 0
    }

    adaptationDetailsData = adaptationDetailsData.concat(newItem);
    LoadAdaptationDetails(adaptationDetailsData, true);
});

//----------------------//
//  MITIGATION DETAILS  //
//----------------------//

function GetCarbonCredit(callback) {

    let url = apiBaseURL + 'api/CarbonCredit/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        carbonCreditData = JSON.parse('[{"CarbonCreditId": 0, "Value": "Not selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetCarbonCreditMarket(callback) {

    let url = apiBaseURL + 'api/CarbonCreditMarket/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        carbonCreditMarketData = JSON.parse('[{"CarbonCreditMarketId": 0, "Value": "Not selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetCDMStatus(callback) {

    let url = apiBaseURL + 'api/CDMStatus/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        cdmStatusData = JSON.parse('[{"CDMStatusId": 0, "Value": "Not selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetCDMMethodology(callback) {

    let url = apiBaseURL + 'api/CDMMethodology/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        cdmMethodologyData = JSON.parse('[{"CDMMethodologyId": 0, "Value": "Not selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetVoluntaryMethodology(callback) {

    let url = apiBaseURL + 'api/VoluntaryMethodology/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        voluntaryMethodologyData = JSON.parse('[{"VoluntaryMethodologyId": 0, "Value": "Not selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetVoluntaryGoldStandard(callback) {

    let url = apiBaseURL + 'api/VoluntaryGoldStandard/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        voluntaryGoldStandardData = JSON.parse('[{"VoluntaryGoldStandardId": 0, "Value": "Not selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetMitigationDetails() {

    //Only load details when all dependent data ready
    if (carbonCreditData && carbonCreditMarketData && cdmStatusData && cdmMethodologyData && voluntaryMethodologyData && voluntaryGoldStandardData) {

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
        $.get("templates/mitigationDetailsTemplate.html", function (data) {
            template = data;
        }, 'text').

            then(() => {

                $("#divMitigationDetails").html("");

                data.forEach(function (item) {

                    let tmpTemplate = template;

                    //Replace parent div ID
                    let rootId = "MD" + item.MitigationDetailId;
                    tmpTemplate = tmpTemplate.replace("MD#", rootId);

                    //Text inputs
                    if (!item.CDMProjectNumber) item.CDMProjectNumber = "";
                    tmpTemplate = tmpTemplate.replace("##CDMProjectNumber##", item.CDMProjectNumber)

                    if (!item.OtherDescription) item.OtherDescription = "";
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
    var projectId = GetSelectedProjectId();

    var newItem = {
        "MitigationDetailId": uuidv4(),
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

//--------------------------------//
//  MITIGATION EMISSIONS DETAILS  //
//--------------------------------//

function GetMitigationEmissions() {

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
    $.get("templates/mitigationEmissionsTemplate.html", function (data) {
        template = data;
    }, 'text').

        then(() => {

            $("#divMitigationEmissions").html("");

            data.forEach(function (item) {

                let tmpTemplate = template;

                //Replace parent div ID
                let rootId = "ME" + item.MitigationEmissionsDataId;
                tmpTemplate = tmpTemplate.replace("ME#", rootId);

                if (!item.Year) item.Year = "";
                tmpTemplate = tmpTemplate.replace("##Year##", item.Year)

                if (!item.CO2) item.CO2 = "";
                tmpTemplate = tmpTemplate.replace("##CO2##", item.CO2)

                if (!item.CH4) item.CH4 = "";
                tmpTemplate = tmpTemplate.replace("##CH4##", item.CH4)

                if (!item.CH4_CO2e) item.CH4_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##CH4_CO2e##", item.CH4_CO2e)

                if (!item.N2O) item.N2O = "";
                tmpTemplate = tmpTemplate.replace("##N2O##", item.N2O)

                if (!item.N2O_CO2e) item.N2O_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##N2O_CO2e##", item.N2O_CO2e)

                if (!item.HFC) item.HFC = "";
                tmpTemplate = tmpTemplate.replace("##HFC##", item.HFC)

                if (!item.HFC_CO2e) item.HFC_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##HFC_CO2e##", item.HFC_CO2e)

                if (!item.PFC) item.PFC = "";
                tmpTemplate = tmpTemplate.replace("##PFC##", item.PFC)

                if (!item.PFC_CO2e) item.PFC_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##PFC_CO2e##", item.PFC_CO2e)

                if (!item.SF6) item.SF6 = "";
                tmpTemplate = tmpTemplate.replace("##SF6##", item.SF6)

                if (!item.SF6_CO2e) item.SF6_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##SF6_CO2e##", item.SF6_CO2e)

                if (!item.Hydro) item.Hydro = "";
                tmpTemplate = tmpTemplate.replace("##Hydro##", item.Hydro)

                if (!item.Hydro_CO2e) item.Hydro_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##Hydro_CO2e##", item.Hydro_CO2e)

                if (!item.Tidal) item.Tidal = "";
                tmpTemplate = tmpTemplate.replace("##Tidal##", item.Tidal)

                if (!item.Tidal_CO2e) item.Tidal_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##Tidal_CO2e##", item.Tidal_CO2e)

                if (!item.Wind) item.Wind = "";
                tmpTemplate = tmpTemplate.replace("##Wind##", item.Wind)

                if (!item.Wind_CO2e) item.Wind_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##Wind_CO2e##", item.Wind_CO2e)

                if (!item.Solar) item.Solar = "";
                tmpTemplate = tmpTemplate.replace("##Solar##", item.Solar)

                if (!item.Solar_CO2e) item.Solar_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##Solar_CO2e##", item.Solar_CO2e)

                if (!item.FossilFuelElecRed) item.FossilFuelElecRed = "";
                tmpTemplate = tmpTemplate.replace("##FossilFuelElecRed##", item.FossilFuelElecRed)

                if (!item.FossilFuelElecRed_CO2e) item.FossilFuelElecRed_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##FossilFuelElecRed_CO2e##", item.FossilFuelElecRed_CO2e)

                if (!item.BioWaste) item.BioWaste = "";
                tmpTemplate = tmpTemplate.replace("##BioWaste##", item.BioWaste)

                if (!item.BioWaste_CO2e) item.BioWaste_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##BioWaste_CO2e##", item.BioWaste_CO2e)

                if (!item.Geothermal) item.Geothermal = "";
                tmpTemplate = tmpTemplate.replace("##Geothermal##", item.Geothermal)

                if (!item.Geothermal_CO2e) item.Geothermal_CO2e = "";
                tmpTemplate = tmpTemplate.replace("##Geothermal_CO2e##", item.Geothermal_CO2e)

                $("#divMitigationEmissions").append(tmpTemplate);
            });

            $('textarea').autoHeight();

            if (added) {
                SetEditMode(true);
            }
        });
};

$("#addEmissions").click(function () {

    var projectId = GetSelectedProjectId();

    var newItem = {
        "MitigationEmissionsDataId": uuidv4(),
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


//--------------------//
//  RESEARCH DETAILS  //
//--------------------//

function GetResearchType(callback) {

    let url = apiBaseURL + 'api/ResearchType/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        researchTypeData = JSON.parse('[{"ResearchTypeId": 0, "Value": "Not selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetTargetAudience(callback) {

    let url = apiBaseURL + 'api/TargetAudience/GetAll';

    $.getJSON(url, function (data) {

        data.sort(function (a, b) { return a["Value"].localeCompare(b["Value"]) });
        targetAudienceData = JSON.parse('[{"TargetAudienceId": 0, "Value": "Not selected", "Description": ""}]').concat(data);
        if (callback) callback();
    });
}

function GetResearchDetails() {

    //Only load details when all dependent data ready
    if (researchTypeData && targetAudienceData && sectorData) {

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
    $.get("templates/researchDetailsTemplate.html", function (data) {
        template = data;
    }, 'text').

        then(() => {

            $("#divResearchDetails").html("");

            data.forEach(function (item) {

                let tmpTemplate = template;

                //Replace parent div ID
                let rootId = "RD" + item.ResearchDetailId;
                tmpTemplate = tmpTemplate.replace("RD#", rootId);

                if (!item.Author) item.Author = "";
                tmpTemplate = tmpTemplate.replace("##Author##", item.Author)

                if (!item.PaperLink) item.PaperLink = "";
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

    let html = '<select disabled style="margin-top:-1px;color:black" class="form-control" id="selMitigationSector">';
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
    var projectId = GetSelectedProjectId();

    var newItem = {
        "ResearchDetailId": uuidv4(),
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
