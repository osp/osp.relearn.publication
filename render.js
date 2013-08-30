var casper = require('casper').create({
    viewportSize : {width: 1190, height: 873},
    verbose: true,
    logLevel: "debug"
});

var counter = 2;

var makeUris = function(names) {
    var uris = [];
    for (var i=0; i<names.length; i++) {
        uris.push('http://relearn.be/r/' + names[i]);
    }
    return uris;
}

var deUri = function(uri) {
    return uri.replace('http://relearn.be/r/', '');
}

var introductionPads = ['relearn::about', 'relearn::introducing-by-couple', 'relearn::introduction-script'];
var otherFormalPads = ['gesturing-paths', 'can-it-scale-to-the-universe', 'off-grid', 'pedagogy::references', 'learning-situations', ];
var notePads = ['notes::can-it-scale-to-the-univers', 'notes-off-grid'];
var cheatSheets = ['how-to-install-free-software', 'using-the-plotter', 'relearn-cheatsheet'];

casper.start()

casper.page.paperSize = { format: 'A4', orientation: 'portrait', margin: '1cm' };

casper.thenOpen('http://relearn.be/', function() {
    this.echo("Start RELEARN PDF generation");
    this.evaluate(function() {
        $("#content").html("<h1>1. Introduction</h1>");
    });
    this.capture('render/01-01-Introduction.pdf');
    this.evaluate(function() {
        $("#content").html("<h1>2. Texts</h1>");
    });
    this.capture('render/02-01-Texts.pdf');
    this.evaluate(function() {
        $("#content").html("<h1>3. Notes</h1>");
    });
    this.capture('render/03-01-Notes.pdf');
    this.evaluate(function() {
        $("#content").html("<h1>4. Cheatsheets</h1>");
    });
    this.capture('render/04-01-Cheatsheets.pdf');
    this.evaluate(function() {
        $("#content").remove();
        $("body").prepend('<div class="print-only" id="cover"><h1>This is the cover that covers the cover</h1><h2>Relearn - A general publication (soon)</h2></div>')
    });
    this.capture('render/00-Cover.pdf');
});


casper.eachThen(makeUris(introductionPads), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/01-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.then(function() {
    counter = 2;
})

casper.eachThen(makeUris(otherFormalPads), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/02-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.then(function() {
    counter = 2;
})

casper.eachThen(makeUris(notePads), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/03-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.then(function() {
    counter = 2;
})

casper.eachThen(makeUris(cheatSheets), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/04-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.thenOpen('http://relearn.be/commits/', function() {
    this.capture('render/05-02-commits.pdf');
});

casper.run();
