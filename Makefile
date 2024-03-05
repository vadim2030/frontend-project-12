build:
	npm run build

npm start:
	npx start-server -s ./frontend/build

install:
	npm ci

deployment:
	make install
	make build