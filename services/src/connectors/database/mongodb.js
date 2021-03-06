import { MongoClient } from 'mongodb';
import assert from 'assert';

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'sparkjs';

const connect = async () => {
  let db = null;
  try {
    const client = await MongoClient.connect(url);
    console.log("Connected correctly to server");
    db = client.db(dbName);    
  } 
  catch (err) {
    console.log(err.stack);
  }     
  return db;
}

export default {

  add: async (docObject, collectionName) => {
    let result;

    try  {
      const db = await connect();
      result = await db.collection(collectionName).insert(docObject);
      return result;
    }
    catch (err) {
      console.log(err.stack);
    }  
	},
	
	find: async (searchObject, collectionName) => {
    let client;
    let result;

    try  {
      client = await MongoClient.connect(url);
      console.log("Connected correctly to server");
  
      const db = client.db(dbName);

      result = await db.collection(collectionName).find(searchObject).toArray();
    }
    catch (err) {
      console.log(err.stack);
    }    
    // Close connection
    if(client)
      client.close();
    return result;
  },
  
  dropDB: async (DBName) => {
    try  {
      const db = await connect();
      db.dropDatabase();
    }
    catch (err) {
      console.log(err.stack);
    }  
  }
}

