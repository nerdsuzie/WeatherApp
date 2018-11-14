var request = require('request')
var readline = require('readline') //asking for input from user
var config = require ("./config.js")
var validator = require ('validator')

console.log (config.zipToken)//Must name the variable.variable from other file.

//Get longitude and latitude
//https://www.zipcodeapi.com/rest/<api_key>/info.<format>/<zip_code>/<units>
getLonLat = (zipCode)=>{//function to get the zip code
    var units = 'degrees'
    var format = 'json'
    request (`https://www.zipcodeapi.com/rest/${config.zipToken}/info.${format}/${zipCode}/${units}`,(error,response,body)=>{
    var zipObject = JSON.parse (response.body) 
    var lat = zipObject.lat
    var lon = zipObject.lng

    if(response.body.error_code === 404){
        console.log ('That is an invalid zip code. Please try again')
        rl.prompt()
     }else {
        getWeather (lat,lon)  
 }
   
  })
}
//Get Weather
//https://api.darksky.net/forecast/0123456789abcdef9876543210fedcba/42.3601,-71.0589

getWeather = (lat, lon) => {
    request (`https://api.darksky.net/forecast/${config.weathToken}/${lat},${lon}`,(error,response,body) => {
    var weathObject = JSON.parse (response.body)
    try {
        if (weathObject.currently.precipType === undefined) {
            var weathType = "Clear"
        }else {
            var weathType = weathObject.currently.precipType
        }  
        console.log (`Your current outlook is ${weathType}`)
        console.log (`Your current temp is ${weathObject.currently.temperature} F`)
        console.log (`Here is what is in store: ${weathObject.hourly.summary}`)
        rl.prompt ()
    } catch (error) {
        console.log (`Your zipcode was not found. Please try again.`)
        rl.prompt ()
    }
    
    })
}
//Get zip code from user


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Please enter your zipcode: "
  });  //Some things you just copy and paste!
  rl.prompt ()
rl.on ("line", (answer)=> {
    if (!validator.isPostalCode(answer,"US")){
        console.log('Only numbers are allowed')
        rl.prompt()
    } else {
        (getLonLat(answer))
    }
//   rl.question('Please enter your zipcode: ',(answer)=>{
      //This allows us to present the question/answer to the console, could be webpage...
     
        //   console.log (answer)
        //   getLonLat (answer)
    //   }
          
 
  })
