# house-basic-service
build docker
docker build . -t acrwebdev/house-basic-service

docker push
docker push acrwebdev/house-basic-service

run docker
docker run -p 14000:14000 --env SERVER_IP=35.201.152.0 --env SERVER_PORT=14000 --env DB_PORT=27017 --env DB_IP=10.140.0.2 --env SWAGGER_IP=35.201.152.0 --restart=always -d acrwebdev/house-basic-service