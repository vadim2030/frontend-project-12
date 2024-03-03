make build:
	npm run build

make start:
	npx start-server -s ./frontend/build

make install:
	npm ci

make deployment:
	make install
	make build