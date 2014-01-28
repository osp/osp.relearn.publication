all:
	curl 'http://relearn.be/ether/p/g.4onWP6cHj0xYjKMg$$script/export/txt' > render.js
	rm -f render/*.pdf
	casperjs render.js
	pdftk render/*.pdf cat output relearn.publication.`date +%Y%m%d`.pdf
