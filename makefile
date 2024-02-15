make build:
	npm run build

make start:
	npm run start

make install:
	npm ci

make deployment:
	make install
	make build