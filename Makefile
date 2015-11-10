lint: node_modules/.bin/eslint
	./node_modules/.bin/eslint raphael-svg-import.js tests/qunit_phantom.js

delint: node_modules/.bin/eslint
	./node_modules/.bin/eslint --fix raphael-svg-import.js tests/qunit_phantom.js

.PHONY: tests/libs
tests/libs:
	cp node_modules/raphael/raphael.js $@
	cp node_modules/jquery/dist/jquery.js $@
	cp node_modules/qunitjs/qunit/qunit.* $@


# To bump versions, edit the `VERSION` file and then run `make version`, or
# programmatically: `echo "1.2.3" > VERSION && make version`
VERSION = $(shell cat VERSION)
SED = sed
ifeq ($(shell uname), Darwin)
    SED = gsed
endif

.PHONY: version
version:
	@$(SED) -i -r /version/s/[0-9.]+/$(VERSION)/ package.json bower.json

# Only publish a release if the commit is properly tagged
publish:
	git describe --exact-match --tags HEAD | grep --silent $(VERSION)
	# npm publish
