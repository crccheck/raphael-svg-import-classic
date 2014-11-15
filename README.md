# Raphaël SVG Import plugin

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

```javascript
jQuery(document).ready(function(){
  jQuery.ajax({
    type: "GET",
    url: "assets/demo.svg",
    dataType: "xml",
    success: function(svgXML) {
      var paper = Raphael(10, 10, 800, 600);
      var newSet = paper.importSVG(svgXML);
    }
  });
});
```
If you want the Raphael paper dimensions to automatically match the SVG:
```javascript
jQuery(document).ready(function(){
  jQuery.ajax({
    type: "GET",
    url: "assets/demo.svg",
    dataType: "xml",
    success: function(svgXML) {
      var root = svgXML.getElementsByTagName('svg')[0].getAttribute('viewBox').split(' ');
      var width = root[2],
          height = root[3];
      var paper = Raphael(width, height);
      var newSet = paper.importSVG(svgXML);
    }
  });
});
```
If you want to import the SVG from an element within the page you can access to the element:
```xml
<svg id="mysvg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="500px" height="500px" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve">
	<circle opacity="0.3" fill="#FF0000" enable-background="new" cx="251.5" cy="255.5" r="179"/>
</svg>
```
And you can access to the svg element by its id:
```javascript
var paper = Raphael(10, 10, 500, 500);
var newSet = paper.importSVG(document.getElementById('mysvg'));
```
In the assets folder a demo.svg file is provided.<br/>
Nothing fancy but it gives you a starting point.

## Dependencies
- [Raphael JS](http://raphaeljs.com/)


## Contributing to Raphael SVG Import Classic

* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
* You can contribute a broken test case without a fix

### Testing

Visual test: Open `tests/visual_tests.html` in your targeted browsers.
A hosted version can be found [here][visual tests].

Qunit test: Open `tests/qunit.html` in your targeted browers. A command line
version can be run based on webkit with `grunt qunit`. A hosted version can be
found [here][qunit tests].

Running CLI test:

```bash
$ grunt test
Running "qunit:all" (qunit) task
Testing tests/qunit.html ......OK
>> 10 assertions passed (49ms)

Done, without errors.
```

[visual tests]: http://crccheck.github.io/raphael-svg-import-classic/tests/visual_tests.html
[qunit tests]: http://crccheck.github.io/raphael-svg-import-classic/tests/qunit.html


## Copyright

Copyright (c) 2014 Chris Chang
Original Raphael SVG Import Copyright (c) 2009 Wout Fierens
See LICENSE.txt for further details.

Final Notes
-----------
I've tried keeping all the files as close to the original as possible.
So there are lots of files not relevant to this fork in the tree.

There is a bug in the minified version of of Raphael.js that most people use.
It's best to just grab the uncompressed source and minify it yourself.
