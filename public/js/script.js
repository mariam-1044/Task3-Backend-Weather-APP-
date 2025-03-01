
let form = document.getElementById('form1')

let submit = form.addEventListener('submit' , (e) => {
    e.preventDefault()
    weatherFun()
    form.reset()
})

const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const forecastF = document.getElementById('forecast')
const latitudeF = document.getElementById('latitude')
const longitudeF = document.getElementById('longitude')
const descF = document.getElementById('desc')
const div1 = document.getElementById('div1')

if(!submit){
    div1.style.display = "none"
    errorF.style.display = "none"
}else{
    weatherFun()
}

const weatherFun = async()=>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorF.innerText = "ERROR : " + data.error
            errorF.style.display = "block"
            div1.style.display = "none"
            descF.style.display = "none"
        } else {
            locationF.innerText = "Country is " + data.location
            latitudeF.innerText = "Latitude is " + data.latitude
            longitudeF.innerText = "Longitude is " + data.longitude
            forecastF.innerText = data.forecast
            div1.style.display = "block"
            errorF.style.display = "none"
            descF.style.display = "none"
        }
    } 
    catch(e){
        console.log(e)
    }
}