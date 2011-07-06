Fork Notes
==========

This is a fork of raphael.svg-import. When the original raphael-svg-import reached 0.0.3, a major backwards-incompatible change was introduced.
Instead of parsing SVG documents, it used regular expressions. This was undesirable for several reasons:

* Using regular expressions to parse XML. Rebuilding something that browsers can do natively.
* Loss of document structure. Groups (<g>) are lost.
* Additional steps needed to load a svg file.

Usage
-----
See demo.html for the full example. Use AJAX to retrieve your SVG file as an XML document.
Then use importSVG() to convert the SVG into a raphael.js set:

    jQuery(document).ready(function(){
      jQuery.ajax({
        type: "GET",
        url: "assets/demo.svg",
        dataType: "xml",
        success: function parseXml(svgXML) {
          var paper = Raphael(10,10,800,600);
          var newSet = paper.importSVG(svgXML);
        }
      });
    });


Testing
-------
The JSSpec library included cannot deal with AJAX, so tests are broken.

Final Notes
-----------
I've tried keeping all the files as close to the original as possible.
So there are lots of files not relevant to this fork in the tree.

There is a bug in the minified version of of Raphael.js that most people use.
It's best to just grab the uncompressed source and minify it yourself.
