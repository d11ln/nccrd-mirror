if (typeof bootstrap_loaded === 'undefined' || bootstrap_loaded !== true) {
    var bootstrap_loaded = true
    $("head").append('<script src="' + 'js/popper.min.js' + '"></script>');
    $("head").append('<script src="' + 'js/bootstrap.min.js' + '"></script>');
    $("head").append('<script src="' + 'js/jquery-3.2.1.min.js' + '"></script>');
}