# Raphaël SVG Import plugin - 0.1.0

## What is it?
An extension to the Raphael Vector Library.<br/>
It enables Raphael to import raw SVG data.

Fork Notes
==========

This is a fork of [raphael.svg-import](https://github.com/wout/raphael-svg-import).
When the original raphael-svg-import reached 0.0.3, a major backwards-incompatible change was introduced.
Instead of parsing SVG documents, it used regular expressions. This was undesirable for several reasons:

* Used regular expressions to parse XML. Rebuilding something that browsers can do natively.
* Loss of document structure. Groups (`<g>`) are lost.
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
          var paper = Raphael(10, 10, 800, 600);
          var newSet = paper.importSVG(svgXML);
        }
      });
    });

In the assets folder a demo.svg file is provided.<br/>
Nothing fancy but it gives you a starting point.

## Dependencies
- [Raphael JS](http://raphaeljs.com/)

## To-do
- SVG group to Raphael set conversion
- line recognition
- text recognition
- image recognition

## Contributing to Raphael SVG Import
 
* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
* Please try not to mess with the Rakefile, version, or history. If you want to have your own version, or is otherwise necessary, that is fine, but please isolate to its own commit so I can cherry-pick around it.

## Copyright

Copyright (c) 2011 Wout Fierens. See LICENSE.txt for further details.

Testing
-------
The original had very limited JSSpec tests that could deal with AJAX,
so there are currently no tests.

Final Notes
-----------
I've tried keeping all the files as close to the original as possible.
So there are lots of files not relevant to this fork in the tree.

There is a bug in the minified version of of Raphael.js that most people use.
It's best to just grab the uncompressed source and minify it yourself.
