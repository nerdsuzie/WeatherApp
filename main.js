var request = require('request')
var readline = require('readline') //asking for input from user
var config = require ("./config.js")

console.log (config.zipToken)

//Get longitude and latitude
//https://www.zipcodeapi.com/rest/<api_key>/info.<format>/<zip_code>/<units>
getLonLat = (zipCode)=>{
    var units = 'degrees'
    var format = 'json'
    request (`https://www.zipcodeapi.com/rest/${config.zipToken}/info.${format}/${zipCode}/${units}`,(error,response,body)=>{
    var zipObject = JSON.parse (response.body) 
    var lat = zipObject.lat
    var lon = zipObject.lng
    getWeather (lat,lon)    })
}
//Get Weather
//https://api.darksky.net/forecast/0123456789abcdef9876543210fedcba/42.3601,-71.0589

getWeather = (lat, lon) => {
    request (`https://api.darksky.net/forecast/${config.weathToken}/${lat},${lon}`,(error,response,body) => {
    var weathObject = JSON.parse (response.body)
console.log (`Your current temp is ${weathObject.currently.temperature} degrees`)
    })

}
//Get zip code from user

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });  //Some things you just copy and paste!

  rl.question('Please enter your zipcode: ',(answer)=>{
    getLonLat (answer)  
  })