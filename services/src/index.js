// import http from 'http';
import express from 'express';
import queries from './queries';

const sendJsonResponse = (responce, res) => {
  const result = JSON.stringify(responce, null, 2);
  res
    .status(200)
    .set('Content-Type', 'application/json')  
    .send(result);    
}


const app = express();


app.get('*', async (req, res) => {
  //let result = await queries.getDogsList();

  let result = await queries.getDogByBreed('akita');
  sendJsonResponse(result, res);
});


app.listen(3600,()=>
console.log(`Server is listening on port 3600`));

export default app;