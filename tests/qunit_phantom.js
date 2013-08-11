
// Each of these maps to a svg in the qunit html, because injecting svg elements
// and long strings in javascript suuuuucccckkksssss.
var assertionsLibrary = {
  line: function($output) {
    this.equal($output.find('path[d="M0,10L80,70Z"]').length, 1);
  },
  circle: function($output) {
    this.equal($output.find('circle[cx=50][cy=50][r=40]').length, 1);
  }
};


// TODO
$('table.test tr[id]').each(function() {
  var $this = $(this), id = this.id;
  QUnit.test("rendering " + id, function(assert) {
    var assertions = assertionsLibrary[id];
    if (!assertions) {
      // no tests for this svg
      return;
    }
    var $originalSVG = $this.find('svg'),
        $output = $('<td/>').appendTo($this),
        paper = Raphael($output[0], 100, 100);
        set = paper.importSVG($originalSVG[0]);
    assertions.call(assert, $output.find('svg'));
  });
});
