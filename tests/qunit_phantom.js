
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
  $('svg').each(function() {
    var assertions = assertionsLibrary[this.id];
    if (!assertions) {
      return;
    }
    var fixture = $('#qunit-fixture').empty();
    var paper = Raphael(fixture[0], 100, 100);
    var set = paper.importSVG(this);
    assertions.call(this, fixture.find('svg'));
  });
});
