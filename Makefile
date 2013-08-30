all:
	casperjs render.js
	pdftk render/*.pdf cat output relearn.publication.`date +%Y%m%d`.pdf