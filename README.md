# house-basic-service

build docker
docker build . -t acrwebdev/house-basic-service:0.0.1

docker push
docker push acrwebdev/house-basic-service:0.0.1

docker pull
docker pull acrwebdev/house-basic-service:0.0.1

run docker
docker run -p 14000:14000 --env SERVER_IP=104.199.204.162 --env SERVER_PORT=14000 --env DB_PORT=27017 --env DB_IP=10.140.0.7 --env SWAGGER_IP=104.199.204.162 --restart=always --name=house-basic-service -d acrwebdev/house-basic-service:0.0.1
