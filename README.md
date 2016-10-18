# Installation #

1. Create app on dokku server
2. create mongodb service for fhnw-coffee-server
3. create mongodb link application with mongodb service
4. get mongodb credentials use in point 5
5. Set node ENV vars
$ dokku config:set fhnw-coffee-server MONGO_URL=mongo-url PORT=5000 ENV=prod
