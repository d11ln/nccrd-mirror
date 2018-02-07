
function Project(data) {
    this.projectId = ko.observable(data.ProjectId);
    this.projectTitle = ko.observable(data.ProjectTitle);
    this.projectDescription = ko.observable(data.ProjectDescription);
}

function ProjectsViewModel() {

    var self = this;
    self.projects = ko.observableArray();

    // Load initial state from server, convert it to Task instances, then populate this.projects
    $.getJSON("http://localhost:58683/api/projects/getall", function (data) {
        var mappedData = $.map(data, function (item) { return new Project(item) });
        self.projects(mappedData);
    });
}

ko.applyBindings(new ProjectsViewModel());