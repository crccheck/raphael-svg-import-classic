lint: node_modules/.bin/eslint
	./node_modules/.bin/eslint raphael-svg-import.js tests/qunit_phantom.js

delint: node_modules/.bin/eslint
	./node_modules/.bin/eslint --fix raphael-svg-import.js tests/qunit_phantom.js

.PHONY: tests/libs
tests/libs:
	cp node_modules/raphael/raphael.js $@
	cp node_modules/jquery/dist/jquery.js $@
	cp node_modules/qunitjs/qunit/qunit.* $@
