/*
* Raphael SVG Import 0.0.1 - Extension to Raphael JS
*
* Copyright (c) 2009 Wout Fierens
* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
* 
* 
* 2010-10-05 modifications by Jonas Olmstead
* - added support for radial and linear gradients
* - added support for paths
* - removed prototype.js dependencies (I can't read that stuff)
* - changed input parameter to svg xml file
* - added support for text elements
* - added support for reading groups into flat structure
* - svg elements returned as a set
*
*/
Raphael.fn.importSVG = function (svgXML) {
  try {
    
    // create a set to return 
    var myNewSet = this.set();
    
    var strSupportedShapes = "|rect|circle|ellipse|path|image|text|polygon|";
    var node;
    var match;
    
    var m;
    
    // collect all gradient colors
    var linGrads = svgXML.getElementsByTagName("linearGradient");
    var radGrads = svgXML.getElementsByTagName("radialGradient");
    
    
    this.doFill = function(strNode,attr,mNodeName,mNodeValue) {
      // check if linear gradient
      if (m.nodeValue.indexOf("url") == 0) {
          var opacity;
          var gradID = mNodeValue.substring("url(#".length,mNodeValue.length - 1);
              for (var l=0;l<radGrads.length;l++)
              if (radGrads.item(l).getAttribute("id") == gradID) {
                    // get stops
                    var stop1, stop2;
                    for (var st=0;st<radGrads.item(l).childNodes.length;st++)
                        if (radGrads.item(l).childNodes.item(st).nodeName == "stop") {
                            if (stop1)
                                stop2 = radGrads.item(l).childNodes.item(st);
                            else
                                stop1 = radGrads.item(l).childNodes.item(st);
                        }

                    // TODO: implement radial offset
                    // radial gradients not supported for paths, so do linear
                    if (strNode == "path")
                        attr[mNodeName] = 90 + "-" + stop1.getAttribute("stop-color") 
                        + "-" + stop2.getAttribute("stop-color") 
                        + ":50-" + stop1.getAttribute("stop-color");
                    else
                        attr[mNodeName] = "r(" + radGrads.item(l).getAttribute("fx") + "," 
                        + radGrads.item(l).getAttribute("fx") + ")" + stop1.getAttribute("stop-color") 
                        + "-" + stop2.getAttribute("stop-color");

                    if (stop1.getAttribute("stop-opacity"))
                        opacity = stop1.getAttribute("stop-opacity")
              }
                  
          for (var l=0;l<linGrads.length;l++)
              if (linGrads.item(l).getAttribute("id") == gradID) {
                        // get angle
                        var b = parseFloat(linGrads.item(l).getAttribute("y2")) - parseFloat(linGrads.item(l).getAttribute("y1"));
                        var c = parseFloat(linGrads.item(l).getAttribute("x2")) - parseFloat(linGrads.item(l).getAttribute("x1"));
                    var angle = Math.atan(b/c);
                    if (c < 0)
                        angle = angle - Math.PI;
                        
                    angle = parseInt(Raphael.deg(angle) + 360) % 360;
                  
                    // get stops
                    var stop1, stop2;
                    for (var st=0;st<linGrads.item(l).childNodes.length;st++)
                        if (linGrads.item(l).childNodes.item(st).nodeName == "stop") {
                            if (stop1)
                                stop2 = linGrads.item(l).childNodes.item(st);
                            else
                                stop1 = linGrads.item(l).childNodes.item(st);
                        }
                    // TODO: hardcoded offset value of 50
                    attr[mNodeName] = angle + "-" + stop1.getAttribute("stop-color") 
                        + "-" + stop2.getAttribute("stop-color") 
                        + ":50-" + stop1.getAttribute("stop-color");
                    if (stop1.getAttribute("stop-opacity"))
                        opacity = stop1.getAttribute("stop-opacity")
              }
          if (opacity)
              attr["opacity"] = opacity;
      } else {
          attr[mNodeName] = mNodeValue;
      }
        
    };
    
    this.parseElement = function(elShape) {
        node = elShape.nodeName;
        if (node && strSupportedShapes.indexOf("|" + node + "|") >= 0) {
                    
            var attr = { "stroke-width": 0, "fill":"#fff" };
            var shape;
            var style;
            // find the id
            var nodeID = elShape.getAttribute("id");
            
            m_font = "";
            for (var k=0;k<elShape.attributes.length;k++) {
                  m = elShape.attributes[k];
                    
                switch(m.nodeName) {
                  case "stroke-dasharray":
                    attr[m.nodeName] = "- ";
                  break;
                  case "style":
                    // TODO: handle gradient fills within a style
                    style = m.nodeValue.split(";");
                    for (var l in style)
                        if (style[l].split(":")[0] == "fill")
                            this.doFill(node,attr,style[l].split(":")[0],style[l].split(":")[1]);
                        else
                            attr[style[l].split(":")[0]] = style[l].split(":")[1];
                  break;
                  case "fill":
                      this.doFill(node,attr,m.nodeName,m.nodeValue);
                  break;
                  case "font-size":
                      m_font = m.nodeValue + "px " + m_font;
                      attr[m.nodeName] = m.nodeValue;
                  break;
                  case "font-family":
                      m_font = m_font + "\"" + m.nodeValue + "\"";
                  break;
                  case "x":
                  case "y":
                  case "cx":
                  case "cy":
                  case "rx":
                  case "ry":
                      // use numbers for location coords
                      attr[m.nodeName] = parseFloat(m.nodeValue);
                  break;
                  case "text-anchor":
                      // skip these due to bug in text scaling
                  break;
                  default:
                    attr[m.nodeName] = m.nodeValue;
                  break;
                }

              }
            
            switch(node) {
              case "rect":
                  if (attr["rx"])
                      shape = this.rect(attr["x"],attr["y"],elShape.getAttribute("width")
                                ,elShape.getAttribute("height"),attr["rx"]);
                  else
                      shape = this.rect();
              break;
              case "circle":
                // changed to ellipse, we are not doing circles today
                shape = this.ellipse();
                attr["rx"] = attr["r"];
                attr["ry"] = attr["r"];
              break;
              case "ellipse":
                shape = this.ellipse();
              break;
              case "path":
                shape = this.path(attr["d"]);
              break;
              case "polygon":
                var point_string = attr["points"].trim();
                var aryPoints = point_string.split(" ");
                var strNewPoints = "M";
                for (var i in aryPoints) {
                    if (i > 0)
                        strNewPoints += "L";
                    strNewPoints += aryPoints[i];
                }
                strNewPoints += "Z";
                shape = this.path(strNewPoints);
              break;
              case "image":
                shape = this.image();
              break;
              case "text":
                  shape = this.text(attr["x"],attr["y"],elShape.text || elShape.textContent);
                  shape.attr("font",m_font);
                  shape.attr("stroke","none");
                  shape.origFontPt = parseInt(attr["font-size"]);
              break;
            }
            
            // put shape into set 
            myNewSet.push(shape);
                        
            shape.attr(attr);
        }
    };
    
    var elShape;
    var m_font;
    var elSVG = svgXML.getElementsByTagName("svg")[0];
    elSVG.normalize();
    for (var i=0;i<elSVG.childNodes.length;i++) {
        elShape = elSVG.childNodes.item(i);
        
        if (elShape.nodeName == "g") {
            // this is a group, parse the children
            for (var o=0;o<elShape.childNodes.length;o++)
                this.parseElement(elShape.childNodes.item(o));
        }
        else
            this.parseElement(elShape);
        
    }

  } catch (error) {
    alert("The SVG data you entered was invalid! (" + error + ")");
  }
  
  // return our new set
  return myNewSet;
  
};
