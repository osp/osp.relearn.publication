var casper = require('casper').create({
    viewportSize : {width: 1190, height: 873},
    verbose: true,
    logLevel: "debug"
});

var counter = 2;

var makeUris = function(names) {
    var uris = [];
    for (var i=0; i<names.length; i++) {
        uris.push('http://127.0.0.1:8000/r/' + names[i]);
    }
    return uris;
}

var deUri = function(uri) {
    return uri.replace('http://127.0.0.1:8000/r/', '');
}

var test = ['hello-world', 'notes',];

casper.start()

casper.page.paperSize = { format: 'A5', orientation: 'portrait', 
		margin: {
                left : "25mm",
                top : "5mm",
                right : "-7mm", // = 10mm (I dunno why...)
                bottom : "10mm"
            	}
 };



/*
casper.thenOpen('http://127.0.0.1:8000/', function() {
    this.echo("Start RELEARN PDF generation");
    this.evaluate(function() {
        $("#content").html("<h1>1. General test</h1>");
    });S
    this.capture('render/01-01-Test test.pdf');
    this.evaluate(function() {

        $("body").prepend('<div class="title" id="cover"><h1>This is the cover that covers the cover</h1><h2>Relearn - A general publication (soon)</h2></div>')
    });
    this.capture('render/00-Cover.pdf');
});
*/

casper.eachThen(makeUris(test), function(response) {
    this.echo(deUri(response.data));
    this.thenOpen(response.data, function(response) {
        this.capture('render/01-0' + counter + '-' + deUri(response.url) + '.pdf');
    });
    counter += 1;
});


casper.run();
