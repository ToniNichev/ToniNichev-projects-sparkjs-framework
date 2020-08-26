
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
    
   getPageByURL: async (url) => {
    const result = await mongoDB.find({url}, 'Pages');
    return result;     
   },

   setup: async () => {
     mongoDB.dropDB();
     const obj = module.exports = [
      {
        id: 'home',
        url: '/home',
        layout: [ 
          {
            span: 12,
            components: [
              {
                name: "Header"
              }
            ]
          },
          {
            span: 12,
            components:[
              {
                name: "Home"
              }
            ] 
          }                       
        ]
      }
    ];

    mongoDB.add(obj, 'Pages', () => {
      console.log("DONE");
    });
    //const result = await mongoDB.setup({}, 'Pages');
    //return result;     
   }   

}
