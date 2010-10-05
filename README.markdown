# Raphaël SVG import plugin - 0.0.1

### What is it?
An extension to the Raphael Vector Library.<br/>
It enables Raphael to import SVG files.

### Usage

    var paper = Raphael(10, 10, 800, 500);
    paper.importSVG('<sgv><rect x="53.603" y="93.813" fill="#FF00FF" width="106.211" height="106.211"/></svg>')

You must change SVG file extensions to ".XML" in order to work with IE.

In the assets folder a demo.svg file is provided.<br/>
Nothing fancy but it gives you a starting point.

### Dependencies
- [Raphael JS](http://raphaeljs.com/)

### Important
- This plugin is still under development


### To-do
- SVG group to Raphael set conversion
- line recognition
- text recognition
- image recognition
- writing tests (yes I've been lazy :-)