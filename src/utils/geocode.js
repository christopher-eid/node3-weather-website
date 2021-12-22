const request = require('request')
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiY2hyaXMzaWQiLCJhIjoiY2t4ZWdvY3owMDlibTJ3bnBnOTV3dWE0aiJ9.2zcdx3qvoL2uuwzSsgPFUg&limit=1'

    //we can write url instead of url:url bcz they are same name(es6 property shorthand)
    //we can write {body} instead of response since we are only accessing this attribute from response
    //and do not forget to remove response. from the inside of the function
    

    request({url: url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if (response.body.features.length === 0){
            callback('Unable to find location, try again search', undefined)
        }else{
            const a = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }
            callback(undefined, a)
        }
    })


}

module.exports = geoCode
