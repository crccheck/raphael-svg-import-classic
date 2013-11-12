$('table.test > tbody > tr:not(.heading)').each(function() {
  var $this = $(this),
      title = $.trim($this.find('th').contents().eq(0).text());
  QUnit.test("rendering " + title, function(assert) {
    var $originalSVG = $this.find('svg'),
        $output = $('<td/>').appendTo($this),
        paper = Raphael($output[0], 100, 100);
        set = paper.importSVG($originalSVG[0]);
    $this.find('ul.expect > *').each(function () {
      // the html looks like `<li>circle[x,y,rx]</li>` so run through these and
      // make sure these attributes are found in the output SVG document.
      assert.equal($output.find(this.innerHTML).length, 1);
    });
  });
});
