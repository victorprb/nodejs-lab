# Automobil
Application to manage vehicles

## Dependencies
- docker >= 20.10
- docker-compose >= v2.7.0
- node >= v18.8.0

## Running

### backend
```
npm install

docker-compose up -d

npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all

npm run start
```

### frontend
> NOTE: the commands below need to be executed on `frontend` dir
```
npm install

npm run start
```