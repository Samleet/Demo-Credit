# Demo Credit

This is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

Disclaimer: This is not a real project but an assessment for the application of a  Backend Developer for [LendsQR](https://lendsqr.com).

## Technologies

* Node.js v18.x
* Typescript
* KnexJS ORM
* MySQL
    
## Installation

in the project root directory run the "npm install" command to install all required dependencies.

### KnexJS ORM
Setting KnexJS with Typescript isn't pretty straight forward due to the lack of native support out of the box. To get the next step working - we need to temporarily switch the project from ES6. To do this edit the "package.json" file and set the type to *CommonJS"

```json
{
	...
	"type": "CommonJS",
	...
}
```
Next we're going to comment  the "module" option from the "tsconfig.json" file so Typescript does not infer with KnexJS when running database migrations.
```json
{
	...
	"compilerOptions": {
        "target": "es6",
        
        //comment line when running Knex CLI
        //using "CommonJS" as [package.type]
        //"module": "ESNext",
        
        "moduleResolution": "Node",
        ...
    }
}
```

Finally we will configure "dotenv" path to point to the ".env" file located in the project root by rewriting the "config.ts" file used by KnexJS to configure our database instance.
```typescript
//project/src/configs/database/knex/config.ts

import dotenv  from  "dotenv";
import type { Knex } from  "knex";

/**
* Database config for different environments
*/

//change to this
dotenv.config({path: "../../../../.env"})
```

### DB Migration

Upon creating a mysql database (e.g knex_db) and configuring the database options in your ".env" file - run the following command to run table migration. on the database.

```bash
npm run knex migration:latest
```

Next you can optionally seed the database, which will populated the database with some test data.
```bash
npm run knex seed:run

```
  
## Start server

Expose the server on given host & port specified on the ".env" to get the application running.

##### NOTE: You should undo all the changes that were previously done before the migration was ran else server will fail!
 
```bash
npm run dev
```

## Demo Login

##### Test URL: https://samsonorode-lendsqr-be-test.onrender.com

Email: lendsqrhr@gmail.com

Password: 123456

Email: smithjohn@gmail.com

Password: 123456

Email: maryparker@gmail.com

Password: 123456

##  Thank You! 😉