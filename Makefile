all:
	rm -f render/*.pdf
	casperjs render.js
	# Ghostscript is eating glyphs. But this line might be handy if you want to convert to black and white:
	# gs -dNOPAUSE -sDEVICE=pdfwrite -sColorConversionStrategy=Gray -dProcessColorModel=/DeviceGray -dNOPAUSE -dBATCH  -sOUTPUTFILE=relearn.publication.`date +%Y%m%d`.pdf render/*.pdf
	pdftk render/*.pdf cat output relearn.publication.`date +%Y%m%d`.pdf
