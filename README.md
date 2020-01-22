# nodejs-mongo

#Rest API using nodejs and mongo

Steps to run the project:
1. cd server
2. npm i
3. node app.js

#Async/Await
    When we use async/await, we rarely need .then, because await handles the waiting for us. And we can use a regular try..catch instead of .catch.

#Example for async in .map refer below link
    https://github.com/RagaviManohar/nodejs-mongo/blob/master/server/services/employee.service.js -> updateMultipleEmployeeByEmail

#Why Promise.all in async .map ?
    1. The problem here is that you are trying to await an array of promises rather than a promise. This doesn't do what you expect.
    2. When the object passed to await is not a Promise, await simply returns the value as-is immediately instead of trying to resolve it. So since you passed await an array (of Promise objects) here instead of a Promise, the value returned by await is simply that array, which is of type Promise<number>[].
    3. What you need to do here is call Promise.all on the array returned by map in order to convert it to a single Promise before awaiting it.
    4. The Promise.all(iterable) method returns a promise that resolves when all of the promises in the iterable argument have resolved, or rejects with the reason of the first passed promise that rejects.
