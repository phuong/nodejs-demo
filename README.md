## nodejs-demo

### Transaction solution
In this solution, we just handler transaction at collection tier. We create a clone of collections before write and
revert all related collections when an exception has thrown.


We call `Transaction.start(collections, process, callback)` to run a process which contains
many update database actions. Once method has called, we lock all collections that defined in `collections`, and other 
actions which want to update database have to wait (Need to check write permission before run!).

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
