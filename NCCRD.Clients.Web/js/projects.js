
function load_list() {
    $("#project_list").load("partial_project_list.html");
}

function load_add_project() {

    if (typeof selectedProjectId !== 'undefined') {
        selectedProjectId = 0;
    }

    $("#project_add").load("partial_project_add.html");
}

$('#projectAddModal').on('hidden.bs.modal', function (e) {
    $("#project_add").html("");
})