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

var Introduction = ['2013::introduction-script', '2013::introducing-by-couple'];
var Worksessions = ['worksessions::can-it-scale-to-the-universe::introduction', 'worksessions::can-it-scale-to-the-universe::notes', 'worksessions::gesturing-paths::introduction', 'worksessions::gesturing-paths::notes', 'worksessions::off-grid::introduction', 'worksessions::off-grid::notes', 'worksessions::off-grid::xtreme-pattern-methods'];
var Images = ['images'];
var Pedagogy = ['pedagogy::references','pedagogy::learning-situations', 'notes::copyright-licenses', 'notes::merging',];
var CheatSheets = ['cheat-sheet::how-to-install-free-software', 'cheat-sheet::git-and-the-command-line', 'cheat-sheet::using-the-plotter', 'cheat-sheet::tex',];
var DebriefColophon = ['2013::debrief'];

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
        $("#content").html('<p style="font-family: Autopia, serif; font-size: 50px; line-height: 1em;">1. Introduction</p>');
    });
    this.capture('render/01-01-Introduction.pdf');
    this.evaluate(function() {
        $("#content").html('<p style="font-family: Autopia, serif; font-size: 50px; line-height: 1em;">2. Worksessions</p>');
    });
    this.capture('render/02-01-Worksessions.pdf');
    this.evaluate(function() {
        $("#content").html('<p style="font-family: Autopia, serif; font-size: 50px; line-height: 1em;">3. Pedagogy</p>');
    });
    this.capture('render/04-01-Pedagogy.pdf');
    this.evaluate(function() {
        $("#content").html('<p style="font-family: Autopia, serif; font-size: 50px; line-height: 1em;">4. Cheat Sheets</p>');
    });
    this.capture('render/05-01-Cheatsheets.pdf');
    this.evaluate(function() {
        $("#content").remove();
        $("body").prepend('<div class="print-only" id="cover"><h1>This is the cover that covers the cover</h1><h2>Relearn - A general publication (soon)</h2></div>')
    });
    this.capture('render/00-Cover.pdf');
});


casper.eachThen(makeUris(Introduction), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/01-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.then(function() {
    counter = 2;
})

casper.eachThen(makeUris(Worksessions), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/02-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.then(function() {
    counter = 2;
})



casper.eachThen(makeUris(Images), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/03-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.then(function() {
    counter = 2;
})


casper.eachThen(makeUris(Pedagogy), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/04-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.then(function() {
    counter = 2;
})


casper.eachThen(makeUris(CheatSheets), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/05-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.then(function() {
    counter = 2;
})

casper.eachThen(makeUris(DebriefColophon), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/06-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});

casper.thenOpen('http://relearn.be/commits/', function() {
    this.capture('render/07-02-commits.pdf');
});

casper.run();
