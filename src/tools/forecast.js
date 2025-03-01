
const request = require("request")

//  API :weatherapi
            
const forecast = (latitude , longitude , callback) => {

    const url = "http://api.weatherapi.com/v1/current.json?key=6169d9ff4d5f44dd92e122745251902&q=" + latitude + "," + longitude +" "

    request ({url , json : true} , (error , response) => {
        if (error){
            callback("ERROR : Unable to connect weather api service " , undefined)
        } else if (response.body.error){
           callback("ERROR : " + response.body.error.message , undefined)
        } else {
           callback(undefined , "Weather of " + response.body.location.name + " is " + response.body.current.condition.text 
            + " and temp is : " + response.body.current.temp_c + " C.")
        }
    })
}
module.exports = forecast