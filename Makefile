.PHONY: test
test:
	hugo mod npm pack
	npm install
	mkdir -p public
	./node_modules/.bin/esbuild assets/tech-radar/site.js --bundle --outfile=public/tech-radar.js
