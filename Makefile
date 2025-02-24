.PHONY: clean
clean:
	rm -rf node_modules public
	rm -f package.json package-lock.json

.PHONY: install-dependencies
install-dependencies: | clean
	hugo mod npm pack
	npm install

.PHONY: build
build: | install-dependencies
	mkdir -p public
	./node_modules/.bin/esbuild assets/tech-radar/site.js --bundle --outfile=public/tech-radar.js

.PHONY: build-clean
build-clean: clean install-dependencies build
