build:
	npm run build

start:
	npx start-server -s ./frontend/build

install:
	npm ci

deployment:
	make install
	make build

lint:
	npx eslint frontend