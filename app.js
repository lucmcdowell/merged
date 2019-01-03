const express = require ('express');
const router = require('./routes/index');
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;
app.use(router);
app.get('/api/v1', (req, res) => {
    res.send(' Questioner: Crowd-Source questions for meetup');
  });
  app.all('/*', (req, res) => res.status(404).send({ message: 'Invalid request.' }));
app.listen(port, console.log(`Server started on port ${port}`));

module.exports = app;