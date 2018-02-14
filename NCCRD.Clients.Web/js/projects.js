var headers_loaded = true;
var jquery_loaded = true;
var bootstrap_loaded = true;
var knockout_loaded = false;

function load_list() {
    $("#project_list").load("project_list.html");
}

function load_add_project() {
    $("#project_add").load("project_add.html");
}