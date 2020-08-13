
import mongoDB  from'../connectors/database/mongodb';
 
/*
const getDogsListTest = async () => {      
    return mongoDB.find({}, 'Dogs');
} 
*/ 

export default {
    /*
    getDogByBreed: {
      type: DogType,
      args: {
        breed: { type: graphql.GraphQLString }
      },
      resolve: function (_, {breed}) {      
        return new Promise((resolve, reject) => {
          mongoDB.find({breed: breed}, 'Dogs', function(err, result) {
            if(err) 
              reject(err);
            else 
              resolve(result[0]);                  
          });
        }); 
      },
    },
    */ 

    
    getDogsList: () => {      
        return new Promise((resolve, reject) => {
            mongoDB.find({}, 'Dogs', function(err, result) {
            if(err) 
                reject(err);
            else 
                resolve(result);                  
            });
        }); 
    },

}
