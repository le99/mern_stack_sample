The Swagger documentation will be in `/api-docs`


## Running in dev
```bash
cd ./app/client
npm start
```

```bash
cd ./app/server
npm start
```

## Running in minikube
```bash
./docker-build.sh
cd ./k8s
  ./up.sh
cd -
192.168.99.100:30100  #Ip of server
```




## Based on:

```bash
npx express-generator

```

https://expressjs.com/en/starter/generator.html
https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
https://nodejs.org/api/process.html
