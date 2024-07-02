.PHONY: test
test-esbuild:
	rm -rf node_modules public
	rm package-lock.json
	hugo mod npm pack
	npm install
	mkdir -p public
	./node_modules/.bin/esbuild assets/tech-radar/site.js --bundle --outfile=public/tech-radar.js
