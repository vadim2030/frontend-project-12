deployment:
	make install
	make build

install:
	npm ci && npm run postinstall && npm run build

start:
	npx start-server -s ./frontend/build

build:
	npm run build