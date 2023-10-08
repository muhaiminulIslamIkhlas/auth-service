# auth-service

### Docker command
```
docker build -t auth-service:dev -f docker/dev/Dockerfile .
docker run --rm -it -v $(pwd):/usr/src/app -v /usr/src/app/node_modules --env-file $(pwd)/.env -p 5501:5000 -e NODE_ENV=development auth-service:dev
```