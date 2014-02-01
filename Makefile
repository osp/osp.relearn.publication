all:
	curl 'http://relearn.be/ether/p/g.4onWP6cHj0xYjKMg$$tocjson/export/txt' > toc.json
	curl 'http://relearn.be/ether/p/g.4onWP6cHj0xYjKMg$$script/export/txt' > render.js
	rm -f render/*.pdf
	casperjs render.js
	gs -dNOPAUSE -sDEVICE=pdfwrite -sColorConversionStrategy=Gray -dProcessColorModel=/DeviceGray -dNOPAUSE -dBATCH  -sOUTPUTFILE=relearn.publication.`date +%Y%m%d`.pdf render/*.pdf
	
