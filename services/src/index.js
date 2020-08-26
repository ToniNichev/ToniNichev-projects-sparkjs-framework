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

// override send functon and add aditional work before sending to the browser.
app.use(function(req, res, next) {
  const temp = res.send;
  res.send = function(...args) {
    (typeof args[0] !== 'undefined')
      args[0] = args[0].replace(/https:\/\/images/gm, 'https://sandbox');
    temp.apply(this, args);
  }
  next();
});

app.get('/query', async (req, res) => {
  let result = await queries.getPageByURL('akita');
  sendJsonResponse(result, res);
});

app.get('/test', async (req, res) => {
  //let result = await queries.getDogsList();
  let result = await queries.getDogByBreed('akita');
  sendJsonResponse(result, res);
});

app.get('/setup', async (req, res) => {
  queries.setup();
  sendJsonResponse("SET UP!", res);
});

app.listen(3600,()=>
console.log(`Server is listening on port 3600`));

export default app;