if (typeof bootstrap_loaded === 'undefined' || bootstrap_loaded !== true) {
    var bootstrap_loaded = true
    document.write("<script type='text/javascript' src='js/popper.min.js'></script>");
    document.write("<script type='text/javascript' src='js/bootstrap.js'></script>");
    document.write("<script type='text/javascript' src='js/mdb.js'></script>");
}