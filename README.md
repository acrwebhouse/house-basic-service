# house-basic-service

build docker
docker build . -t acrwebdev/house-basic-service:0.0.5

docker push
docker push acrwebdev/house-basic-service:0.0.5

docker pull
docker pull acrwebdev/house-basic-service:0.0.5

run docker

docker run -p 14000:14000 --env SERVER_IP=34.80.78.75 --env SERVER_PORT=14000 --env DB_PORT=27017 --env DB_URI="" --env SWAGGER_IP=34.80.78.75 --restart=always --name=house-basic-service -d acrwebdev/house-basic-service:0.0.5
