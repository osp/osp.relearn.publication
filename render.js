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

var relearnPads = ['relearn::start', 'relearn::about', 'relearn::welcome', 'relearn::contact', 'relearn::repositories', ];
var Pads2013 = ['2013::debrief', '2013::general-publication', '2013::introducing-by-couple', '2013::introduction-script', '2013::schedule' ];
var worksessionsPads = ['worksessions_can-it-scale-to-the-universe::introduction','worksessions_can-it-scale-to-the-univers::notes', 'worksessions_gesturing-paths::introduction', 'worksessions_gesturing-paths::notes', 'worksessions_gesturing-paths::tex', 'worksessions_off-grid::introduction', 'worksessions_off-grid::notes' ];
var notesPads = ['notes::copyright-licenses', 'notes::merging', 'notes::xtreme-pattern-methods'];
var cheatSheets = ['cheat-sheet::git', 'cheat-sheet::how-to-install-free-software', 'cheat-sheet::using-the-plotter', 'cheat-sheet::tracing'];
var pedagogy = ['pedagogy::learning situation', 'pedagogy::references'];

casper.start()

casper.page.paperSize = { format: 'A5', orientation: 'portrait', 
		margin: {
                left : "25mm",
                top : "6mm",
                right : "9mm", 
                bottom : "6mm"
            	}
 };

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


casper.eachThen(makeUris(relearnPads), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/01-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.then(function() {
    counter = 2;
})

casper.eachThen(makeUris(Pads2013), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/02-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.then(function() {
    counter = 2;
})


casper.eachThen(makeUris(worksessionsPads), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/02-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.then(function() {
    counter = 2;
})


casper.eachThen(makeUris(notesPads), function(response) {
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
