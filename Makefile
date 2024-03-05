make build:
	npm run build

npm start:
	npx start-server -s ./frontend/build

make install:
	npm ci

make deployment:
	make install
	make build