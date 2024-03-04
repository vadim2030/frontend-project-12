make build:
	npm run build

npm start:
	npx start-server -s ./frontend-project-12/build

make install:
	npm ci

make deployment:
	make install
	