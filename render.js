var casper = require('casper').create({
    viewportSize : {width: 1190, height: 873},
    verbose: true,
    logLevel: "debug"
});

var makeUris = function(names) {
    var uris = [];
    for (var i=0; i<names.length; i++) {
        uris.push('http://relearn.be/r/' + names[i]);
    }
    return uris;
};

var deUri = function(uri) {
    return uri.replace('http://relearn.be/r/', '');
};

var chapters = [
    {
        'title': 'Introduction',
        'pads': ['2013::introduction-script', '2013::introducing-by-couple']
    },
    {
        'title': 'Worksessions',
        'pads': ['worksessions::can-it-scale-to-the-universe::introduction', 'worksessions::can-it-scale-to-the-universe::notes', 'worksessions::gesturing-paths::introduction', 'worksessions::gesturing-paths::notes', 'worksessions::off-grid::introduction', 'worksessions::off-grid::notes', 'worksessions::off-grid::xtreme-pattern-methods']
    },
    {
        'title': 'Images',
        'pads': ['images']
    },
    {
        'title': 'Pedagogy',
        'pads': ['pedagogy::references','pedagogy::learning-situations', 'notes::copyright-licenses', 'notes::merging']
    },
    {
        'title': 'CheatSheets',
        'pads': ['cheat-sheet::how-to-install-free-software', 'cheat-sheet::git-and-the-command-line', 'cheat-sheet::using-the-plotter', 'cheat-sheet::tex',]
    },
    {
        'title': 'DebriefColophon',
        'pads': ['2013::debrief']
    }
];

casper.start();

casper.page.paperSize = { format: 'A5', orientation: 'portrait', 
    margin: {
        left : "25mm",
        top : "6mm",
        right : "9mm", 
        bottom : "6mm"
    }
};

var chapterCounter = 1;

casper.thenOpen ('http://relearn.be', function () {
    
    this.evaluate(function() {
        $("#content").remove();
        $("body").prepend('<div class="print-only" id="cover"><h1>This is the cover that covers the cover</h1><h2>Relearn - A general publication (soon)</h2></div>');
    });
    
    this.capture('render/00-Cover.pdf');
});

casper.eachThen (chapters, function (chapterdata) {
    var chapter = chapterdata.data;
    
    this.then(function() {
        counter = 1;
    });
    
    this.thenOpen ('http://relearn.be/', function() {
        this.evaluate (function (chapter, chapterCounter) {
            $("#content").html('<p>' + chapterCounter + ' ' + chapter['title'] + '</p>');
        }, chapter, chapterCounter);
        
        this.capture ('render/' + chapterCounter + '-' + counter + '-' + chapter['title'] + '.pdf');
    });
    
    this.eachThen(makeUris(chapter['pads']), function(response) {
        this.thenOpen(response.data, function(response) {
            this.capture('render/' + chapterCounter + '-' + counter + '-' + deUri(response.url) + '.pdf');
        });
        
        counter += 1;
    });
    
    this.then (function () {
        chapterCounter += 1;
    });
});

casper.run();
