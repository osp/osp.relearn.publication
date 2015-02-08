Relearn Publication
===================

The relearn 2013 web publication, and a script to generate a PDF print publication
based on these HTML files.

Consult the online version at <http://relearn.be/2013/> 
Download the pdf at <http://relearn.be/media/relearn-2013.pdf>

We were first editing this publication dynamically using Ethertoff
and then switched to static HTML files that you can find in this repository.

To generate the publication we rely on the Table of Contents specified
in `toc.json`. We send a ‘headless browser’ to visit all pages specified
in this file and to print them to pdf. The headless browser we use is
called PhantomJS and we use CasperJS to provide an easy to read script.

If you have PhantomJS and CasperJS installed, you can run this script like this:

    casperjs render.js

This creates a bunch of pdf’s together in the folder `render`.
If you want to collate all the pdf’s, you can use a command line program like pdftk.

    pdftk render/*.pdf cat output relearn.publication.`date +%Y%m%d`.pdf

There is a Makefile included in the project, running

    make

Will trigger both the above commands.

- - -

Install instructions
--------------------

This program requires PhantomJS <http://phantomjs.org/download.html> and
CasperJS <http://casperjs.org/>. We use a recent feature of CasperJS and
we thus need at least version 1.1-beta1.

The easiest way to install these programs is probably to download the binaries,
unzip them in a folder called ‘src’, and create symbolic links to their
executables from a location your terminal can find.

The last step might go something like this:

    mkdir -p ~/bin/
    cd ~/bin/
    ln -s ~/src/phantomjs-1.9.1-linux-i686/bin/phantomjs
    ln -s ~/src/n1k0-casperjs-cd1fab5/bin/casperjs
    source ~/.profile

( The names of the folders depend on the specific version you download )

License
-------

Copyright © 2013  Eric Schrijver, (contributors please add yourself)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

