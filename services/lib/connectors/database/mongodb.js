import { MongoClient } from 'mongodb';
import assert from 'assert';

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myproject';

export default {

  add: (docObject, collectionName, callback) => {
    connect(function(db) {        
        db.collection(collectionName).insert(docObject, function(err, res) {
					if (err) throw err;
					if(callback != null) {
						callback();
					}
        });
    });
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
  
  dropDB: (DBName) => {
    connect(function(db) {  
      db.dropDatabase();
    });
  }
}

