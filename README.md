## nodejs-demo

### Transaction solutions
  We call `Transaction.start(collections, process, callback)` to run a process which contains
many update database actions.

Once method has called, we lock all collections that defined in 'collections', and other 
actions want to update database have to wait.

Before run `process`, we create backups of `collections`, then call `proccess`.
After `process` ran completely, if no exception has thrown, we clean backup collections and unlock database.


### Install and run
install dependencies:
```
    $ cd nodejs-demo && npm install
```

run the app:
```
    $ DEBUG=nodejs-demo:* npm start
```
