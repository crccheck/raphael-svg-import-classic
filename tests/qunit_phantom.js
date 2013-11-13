$('table.test > tbody > tr:not(.heading)').each(function() {
  var $this = $(this),
      title = $.trim($this.find('th').contents().eq(0).text());
  QUnit.test("rendering " + title, function(assert) {
    var $originalSVG = $this.find('svg'),
        $output = $('<td/>').appendTo($this),
        paper = Raphael($output[0], 100, 100),
        set = paper.importSVG($originalSVG[0]);
    $this.find('ul.expect > *').each(function () {
      // the html looks like `<li>circle[x,y,rx]</li>` so run through these and
      // make sure these attributes are found in the output SVG document.
      assert.equal($output.find(this.innerHTML).length, 1,
          "Expected to find: " + this.innerHTML);
    });
  });
});


module("callbacks");
test("parseElement", function () {
  var paper = Raphael(document.getElementById('qunit-fixture')),
      arg1, arg2,
      callback = function (a, b) {
        arg1 = a;
        arg2 = b;
        a.attr('stroke-width', 3.1415);
        return a;
      },
      set = paper.importSVG($('<svg><circle cx="5" cy="5" r="4"/></svg>')[0],
          {parseElement: callback});
  equal(arg1.toString(), "Raphaël’s object",
      "The first argument should be a Raphael object");
  equal(arg2.nodeName, "circle",
      "The second argument should be a SVG Dom Element");
  equal(set[0].attrs["stroke-width"], 3.1415,
      "The callback should be able to modify elements");
});
test("parseElement can filter", function () {
  var paper = Raphael(document.getElementById('qunit-fixture')),
      callback = function (a, b) {
        return b.nodeName === "circle" && a;
      },
      set = paper.importSVG($('<svg><rect x="0" y="0" width="1" height="1" /><circle cx="5" cy="5" r="4"/></svg>')[0],
          {parseElement: callback});
  equal(set.length, 1,
      "The callback should be able to filter elements");
});
