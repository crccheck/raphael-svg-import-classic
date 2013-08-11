
// Each of these maps to a svg in the qunit html, because injecting svg elements
// and long strings in javascript suuuuucccckkksssss.
var assertionsLibrary = {
  line: function($output) {
    var path = $output.find('path').attr('d');
    equal(path, 'M0,10L80,70Z');
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
        $output = $this.children('td:last'),
        paper = Raphael($output[0], 100, 100);
        set = paper.importSVG($originalSVG[0]);
    assertions.call(this, $output.find('svg'));
  });
});
