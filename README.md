# Installation #

1. Create app on dokku server
2. create mongodb service for fhnw-coffee-server
3. create mongodb link application with mongodb service
4. get mongodb credentials use in point 5
5. Set node ENV vars

## commands
```dokku config:set fhnw-coffee-server MONGO_URL='mongo-url' PORT=5000 ENV=prod```

## links
- link: https://gist.github.com/fizerkhan/029617fd75cdb167db7c
- access issue: https://github.com/dokku/dokku-postgres/issues/79

