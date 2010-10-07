# Raphaël SVG import plugin - 0.0.1

### What is it?
An extension to the Raphael Vector Library.<br/>
It enables Raphael to import SVG files.

### Usage

    var paper = Raphael(10, 10, 800, 500);
    paper.importSVG(svgXML);

You must change SVG file extensions to ".XML" in order to work with IE.

In the assets folder a demo.svg file is provided.<br/>
Nothing fancy but it gives you a starting point.

### Dependencies
- [Raphael JS](http://raphaeljs.com/)
- [jQuery](http://jquery.com/) (for the demo only, the library does not require it

### Important
- This plugin is still under development


### To-do
- fix hardcoded radial and linear gradient offsets
- fix gradient fills within a style