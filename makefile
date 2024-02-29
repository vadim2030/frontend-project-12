make build:
	npm run build

make start:
	make build
	npm run start

make install:
	npm ci

make deployment:
	make install
	make build