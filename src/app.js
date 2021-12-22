const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const path = require('path') //to use path.join
const express = require('express')//here express is a function not an object like chalk or fs, we can directly call it to create a new express app
const { title } = require('process')

const app = express() //app is a variable to store our express application

/*Define paths for Express congifuration*/

const fileDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/*setup handlebars engine and views location*/

app.set('view engine', 'hbs')//app.set(key, value), now u should put our files in a file called views
app.set('views', viewsPath) //if we wanted to use a file name other than views for our hbs files
hbs.registerPartials(partialsPath)

/*setup static directory to serve*/

app.use(express.static(fileDirectory)) //to use the html files from our pc






app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Christopher Eid'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'chris'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'he is escaping, the killer is escaping',
        title: 'Help',
        name: 'christopher eid'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }



    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
           return res.send({
               error: error
           })
        }
        forecast(latitude , longitude, (error, forecastData)=>{
            if(error){
               return res.send({
                   error: error
                })
            }

                res.send({
                    location: location,
                    latitude: latitude,
                    longitude: longitude,
                    forecast: forecastData,
                    title: 'Weather App',
                    name: 'Christopher Eid'
                })

                

        })
    })


})

//in case we entered help/smthg , it will give us this specific text
app.get('/help/*',(req, res) => {
    res.render('404',{
        title: 'Error 404 Page',
        errorMessage: 'Help Article Not Found',
        name: 'Christopher Eid'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })

    }else{

    res.send({
        products: []
    })

    }   
})


//ALWAYS PUT GET FOR 404NOT FOUND AFTER ALL THE OTHER GET
app.get('*', (req, res) => {
    res.render('404',{
        title: 'Error 404 Page',
        errorMessage: 'Page Not Found',
        name: 'Christopher Eid'

    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})































/* WHEN WE USED APP.USE , THE FUNCTION GET WILL BE IGNORED WHEN AN HTML FILE IS FOUND FOR THE REQUESTED SITE

app.get('', (req, res) => {
    res.send('<h1>HELLO </h1>')
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'andrew'
    },{
        name: 'batata'
    }])
})


app.get('/about', (req, res) => {
    res.send('<h1>ABOUT PAGE</h1>')
})
*/