// import http from 'http';
import express from 'express';
import queries from './queries';
import bodyParser from 'body-parser';

const sendJsonResponse = (responce, res) => {
  const result = JSON.stringify(responce, null, 2);

  //res.header('Access-Control-Allow-Origin', '*')
  //res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  //res.header('Access-Control-Allow-Credentials', true)
  //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Methods, Credentials')

  res
    .status(200)
    //.set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    //.set('Access-Control-Allow-Headers', '*')
    //.set('Access-Control-Allow-Headers', 'Content-Type')
    .send(result);    
}


const app = express();

app.use(express.json());
app.use(express.urlencoded({xtended: true}));
app.use(express.text())

app.use(bodyParser.text({ type: 'text/*' }));

// override send functon and add aditional work before sending to the browser.
/*
app.use(function(req, res, next) {
  const temp = res.send;
  res.send = function(...args) {
    (typeof args[0] !== 'undefined')
      args[0] = args[0].replace(/https:\/\/images/gm, 'https://sandbox');
    temp.apply(this, args);
  }
  next();
});
*/

app.get('/query', async (req, res) => {
  let result = await queries.getPageByURL('/home');
  sendJsonResponse(result, res);
});

app.post('/page', async (req, res) => {
  const response = JSON.parse(req.body);
  console.log(">>>", response);
  let result = await queries.getPageByURL('/home');
  result[0].user = response.user;
  console.log(result);
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