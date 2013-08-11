
// Each of these maps to a svg in the qunit html, because injecting svg elements
// and long strings in javascript suuuuucccckkksssss.
var assertionsLibrary = {
  line: function($output) {
    equal($output.find('path[d="M0,10L80,70Z"]').length, 1);
  },
  circle: function($output) {
    equal($output.find('circle[cx=50][cy=50][r=40]').length, 1);
  }
};


// TODO
test("rendering", function() {
  $('table.test tr[id]').each(function() {
    var assertions = assertionsLibrary[this.id];
    if (!assertions) {
      // no tests for this svg
      return;
    }
    var $this = $(this),
        $originalSVG = $this.find('svg'),
        $output = $('<td/>').appendTo(this),
        paper = Raphael($output[0], 100, 100);
        set = paper.importSVG($originalSVG[0]);
    assertions.call(this, $output.find('svg'));
  });
});
