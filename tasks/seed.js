import {dbConnection, closeConnection} from '../config/mongoConnection.js';

import * as users from '../data/users.js';

const db = await dbConnection();
await db.dropDatabase();

try
{   
    let user1 = await users.createUser('Calvin', "Garcia", "calvinmgarcia@hotmail.com", 23, 5, ["Chicken", "Broccoli", "Rice"], "YesKing123!", "YesKing123!")
    console.log(user1);
}

catch(e)
{
    console.log(e);
}

console.log('Done seeding database');
await closeConnection();