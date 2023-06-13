const express = require('express');

const {router} = require('./routes/index');
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors())

app.set('host', process.env.HOST || 'http://localhost');
app.set('port', process.env.PORT || 9000);

app.use(router);

app.listen(app.get('port'), () => {
  console.log('info', `App is running at ${app.get('host')}:${app.get('port')}`);
});

module.exports = app;