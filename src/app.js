
const express = require("express")        
const app = express()

const port = process.env.PORT || 3000 

const path = require("path")
const x = path.join(__dirname , '../public')
app.use(express.static(x))

app.set('view engine' , 'hbs')   
const viewsDirectory = path.join(__dirname , "../temp1/views")
app.set('views' , viewsDirectory)

app.get('/' , (req , res) => { 
    res.render('index' , {
        title : "HOME WEATHER" ,
        desc : "Welcome To Our Website..To Know Your Country's Weather,Longitude and Latitude,Please Enter The Name Of Your Country." ,

    })
})

const geocode = require('./tools/geocode')
const forecast = require('./tools/forecast')
const { error } = require("console")

app.get('/weather' , (req , res) => {
    if(!req.query.address){
        return res.send({
            error : "You must provide an address"
        })
    }
    geocode(req.query.address , (error , data) =>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude , data.longitude , (error , forcastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forcastData ,
                latitude : data.latitude ,
                longitude : data.longitude ,
                location : req.query.address
            })
        })
    } )
})

app.get('*' , (req , res) => {
    res.send("404 page not found")
})

app.listen(port , () => {
    console.log("APP is listening on port 3000")
})