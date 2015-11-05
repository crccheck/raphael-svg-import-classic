lint: node_modules/.bin/eslint
	./node_modules/.bin/eslint raphael-svg-import.js tests/qunit_phantom.js

delint: node_modules/.bin/eslint
	./node_modules/.bin/eslint --fix raphael-svg-import.js tests/qunit_phantom.js
