const express = require('express');
app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', __dirname+'/server/views')

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());

app.use(express.static(__dirname+'/public/dist/public'));

require('./server/config/routes.js')(app)

server=app.listen(4000, ()=>console.log('listening on port 4000'))