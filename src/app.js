// https://nodejs.org/dist/latest-v14.x/docs/api/path.html
const path = require('path');  
// https://expressjs.com/
const express = require('express');  



// https://expressjs.com/en/4x/api.html#express
// Creates an Express application. The express() function is a top-level function exported by the express module.
const app = express();  

//Define paths for Express config
    //  https://nodejs.org/dist/latest-v14.x/docs/api/path.html#path_path_join_paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');  // by default its looking for a "views"-directory when renaming or relocating it, you have to define its name and location


// Setup Handlebars engine and views location
    //  https://expressjs.com/en/4x/api.html#app.set
    //  hbs = express view engine for handlebars   // https://www.npmjs.com/package/hbs
    //  https://expressjs.com/en/guide/using-template-engines.html
app.set('view engine', 'hbs');
app.set('views', viewsPath);  // make sure the views get loaded by defining the directory where they're located. this wouldn't have been needed if the directory was called "views" + located in project root folder.

// Setup static directory to serve
    //  https://expressjs.com/en/4x/api.html#app.use
app.use(express.static(publicDirectoryPath));

//  https://expressjs.com/en/4x/api.html#app.get
app.get('', (req, res) => {  
    res.render('index', {
        title: 'Weather',
        name: 'Rohald van Merode'
    });
});

app.get('/about', (req, res) => {  
    res.render('about', {
        title: 'About Me',
        name: 'Rohald van Merode'
    });
});

app.get('/help', (req, res) => {  
    res.render('help', {
        message: 'This is some helpful text'
    });
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