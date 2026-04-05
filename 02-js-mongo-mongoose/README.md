npm init -y
npm i -D typescript
tsc --init
npm i tsc-watch -D
tsc -p .
npm i @types/packagename -D
npm i @types/node -D
npm i @types/express -D
"dev": "tsc-watch --onSuccess \" node dist/index.js \"" //watch the code then compile and run latest code on success

//zod is a runtime validation environment
