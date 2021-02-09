// https://nodejs.org/dist/latest-v14.x/docs/api/path.html
const path = require('path');  
// https://expressjs.com/
const express = require('express');  

const hbs = require('hbs');


const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// https://expressjs.com/en/4x/api.html#express
// Creates an Express application. The express() function is a top-level function exported by the express module.
const app = express();  

//Define paths for Express config
    //  https://nodejs.org/dist/latest-v14.x/docs/api/path.html#path_path_join_paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');  // by default its looking for a "views"-directory when renaming or relocating it, you have to define its name and location
const partialsPath = path.join(__dirname, '../templates/partials');  // create a path to the partials to register to handlebars


// Setup Handlebars engine and views location
    //  https://expressjs.com/en/4x/api.html#app.set
    //  hbs = express view engine for handlebars   // https://www.npmjs.com/package/hbs
    //  https://expressjs.com/en/guide/using-template-engines.html
app.set('view engine', 'hbs');
app.set('views', viewsPath);  // make sure the views get loaded by defining the directory where they're located. this wouldn't have been needed if the directory was called "views" + located in project root folder.
hbs.registerPartials(partialsPath); // lets handlebars know where to locate the partials

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
        title: 'Help',
        name: 'Rohald van Merode',
        message: 'This is some helpful text'
    });
});

app.get('/weather', (req, res) => {
    // https://expressjs.com/en/4x/api.html#req.query
    if(!req.query.address){
        return res.send({
            error: "address must be provided",
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                address: {
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                }
            });
        });
    });
});


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        });
    }
    console.log(req.query.search)
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rohald van Merode',
        error: "Help article not found"
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rohald van Merode',
        error: "Page not found"
})
});


// https://expressjs.com/en/4x/api.html#app.listen
app.listen(3000, () => {  
    console.log('Server is up on port 3000.')
});