if (typeof bootstrap_loaded === 'undefined' || bootstrap_loaded !== true) {
    var bootstrap_loaded = true
    $.getScript("js/popper.min.js");
    $.getScript("js/bootstrap.min.js");
    $.getScript("js/jquery-3.2.1.min.js");
}