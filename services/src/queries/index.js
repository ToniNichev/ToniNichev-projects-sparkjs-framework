
import mongoDB  from'../connectors/database/mongodb';
 
/*
const getDogsListTest = async () => {      
    return mongoDB.find({}, 'Dogs');
} 
*/ 

export default {


    getDogByBreed: async (breed) => {
      const result = await mongoDB.find({breed: breed}, 'Dogs');
      return result;
    },

   getDogsList: async () => {      
    const result = await mongoDB.find({}, 'Dogs');
    return result;
   }, 
    
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
