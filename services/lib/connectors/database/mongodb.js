const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';
 

function connect(callback) {
  MongoClient.connect(
    url, 
    { useNewUrlParser: true },
    function(err, client) {
      assert.equal(null, err);
      if(err == null) {
        const db = client.db(dbName);
        callback(db);
      }
      else {
        console.log("Can't connect to mongodb!");
      }

      client.close();
  });
}

module.exports = {

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
	
	find: (searchObject, collectionName, callback) => {
    connect(function(db) {        
			db.collection(collectionName).find(searchObject).toArray(function(err, result) {
				if (err) throw err;
				if(callback != null) {
					callback(err, result);
				}
			});
		});
  },
  
  dropDB: (DBName) => {
    connect(function(db) {  
      db.dropDatabase();
    });
  }
}

