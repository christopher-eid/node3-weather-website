const request = require('request')
//x is for longitude, y is for latitude
const forecast = (latitude, longitude, callback)=>{  
    const url = 'http://api.weatherstack.com/current?access_key=4884c5f55ba3110b374ac63c930c72ba&query=' + latitude +',' + longitude +'&units=f'
    //we can write url instead of url:url bcz they are same name(es6 property shorthand)
    //we can write {body} instead of response since we are only accessing this attribute from response
    //and do not forget to remove response. from the inside of the function
    request({url: url, json: true}, (error, response) =>{
       if(error){
           callback('Unable to connect', undefined)
       }else if(response.error){
           callback('Unable to find location', undefined)
       }else{
           const forecast =  response.body.current.weather_descriptions[0] + '. It is ' + response.body.current.temperature + ' degrees out there, but it feels like '+
           response.body.current.feelslike + '.'
           
           callback(undefined, forecast )
       }
   })
}

module.exports = forecast