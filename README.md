start mongodb: npm run db

### Kill Mongo Service
find mongodb service:       ps wuax | grep mongo
kill mongodb if needed:     kill 123455 (process number)

### Connect to DataBase
mongo --dbport 3030

### Clear DataBase
use `database`
db.dropDatabase();
