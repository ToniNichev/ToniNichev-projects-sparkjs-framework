// import http from 'http';
import express from 'express';
import queries from './queries';

const app = express();

app.get('/', (req, res) => {
  const dogs = queries.getDogsList();
  dogs.then(
    function (result) {
      console.log(result);
      res.send(result);
    }
  )
});

app.listen(3600,()=>
console.log(`Server is listening on port 3400`));

export default app;