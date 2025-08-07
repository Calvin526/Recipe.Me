import {dbConnection, closeConnection} from '../config/mongoConnection.js';


const db = await dbConnection();
await db.dropDatabase();

try
{
   
}

catch(e)
{
    console.log(e);
}

console.log('Done seeding database');
await closeConnection();