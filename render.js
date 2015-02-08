// To generate the publication we rely on the Table of Contents specified
// in `toc.json`. We send a ‘headless browser’ to visit all pages specified
// in this file and to print them to pdfs.
//
// Run this script with the following command line: `casperjs render.js`
//
// Output files will be stored in the folder `render`
//

var fs = require('fs');

var casper = require('casper').create({
    viewportSize : {width: 1190, height: 873},
    verbose: true,
    logLevel: "debug"
});

var chapters = JSON.parse(fs.read('toc.json'));

var makeUris = function(names) {
    var uris = [];
    for (var i=0; i<names.length; i++) {
        uris.push('http://localhost:8000/r/' + names[i] + '.html');
    }
    return uris;
};

var deUri = function(uri) {
    return uri.replace('http://localhost:8000/r/', '');
};

casper.start();

casper.page.paperSize = { format: 'A4', orientation: 'portrait', 
    margin: {
        left : "50mm",
        top : "15mm",
        right : "15mm", 
        bottom : "21mm"
    }
};

var chapterCounter = 1;

casper.thenOpen ('http://localhost:8000/cover.html', function () {
    this.capture('render/00-Cover.pdf');
});

casper.eachThen (chapters, function (chapterdata) {
    var chapter = chapterdata.data;
    
    this.then(function() {
        counter = 1;
    });
    
    this.thenOpen ('http://localhost:8000/', function() {
        this.evaluate (function (chapter, chapterCounter) {
            $("#content").html('<p>' + chapterCounter + ' ' + chapter['title'] + '</p>');
        }, chapter, chapterCounter);
        
        this.capture ('render/' + chapterCounter + '-' + counter + '-' + chapter['title'] + '.pdf');
    });
    
    this.eachThen(makeUris(chapter['pads']), function(response) {
        this.thenOpen(response.data, function(response) {
        casper.waitFor(function check() {
            return this.evaluate(function () {
                return $("img:not([src$=svg])").length === 0;
                    });
            }, function then() {
                this.capture('render/' + chapterCounter + '-' + counter + '-' + deUri(response.url) + '.pdf');
            }, function timeout() {
                this.capture('render/' + chapterCounter + '-' + counter + '-' + deUri(response.url) + '.pdf');
                }, 100000);
    });
        
        counter += 1;
    });
    
    this.then (function () {
        chapterCounter += 1;
    });
});

casper.run();

