// https://nodejs.org/dist/latest-v14.x/docs/api/path.html
const path = require('path');  
// https://expressjs.com/
const express = require('express');  



// https://expressjs.com/en/4x/api.html#express
// Creates an Express application. The express() function is a top-level function exported by the express module.
const app = express();  

//  https://expressjs.com/en/4x/api.html#app.use
//  https://nodejs.org/dist/latest-v14.x/docs/api/path.html#path_path_join_paths
app.use(express.static(path.join(__dirname, '../public')))

//  https://expressjs.com/en/4x/api.html#app.get
app.get('', (req, res) => {  
    res.send('<h1>Weather</h1>');
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: "rainy",
        location: 'Amsterdam'
    });
});


// https://expressjs.com/en/4x/api.html#app.listen
app.listen(3000, () => {  
    console.log('Server is up on port 3000.')
});