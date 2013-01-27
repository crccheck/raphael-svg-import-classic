PORT=8000


help:
	@echo "  make help     - this help"
	@echo "  make serve    - serve this directory from http://localhost:$(PORT)"

serve:
	python -m SimpleHTTPServer $(PORT)

.PHONY: help serve
