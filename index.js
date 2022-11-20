const express = require('express');
const app = express();
const cors = require('cors');
const videoRoutes = require('./routes/video');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/', videoRoutes);


app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});