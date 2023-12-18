install: # install dependencies
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npx jest --coverage

gendiff:
	node bin/gendiff.js