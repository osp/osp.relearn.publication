var casper = require('casper').create({
        viewportSize : {width: 1190, height: 873},
});

var introductionPads = ['about', 'introducing-by-couple'];
var otherFormalPads = ['',]

casper.start();

casper.page.paperSize = { format: 'A4', orientation: 'portrait', margin: '1cm' };

casper.thenOpen('http://relearn.be/', function() {
    this.echo("Start RELEARN PDF generation");
    this.evaluate(function() {
        $("#content").html("<h1>Introduction</h1>")
    });
    this.capture('render/01-01-Introduction.pdf');
});

casper.run();