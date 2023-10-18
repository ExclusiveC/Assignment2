const express = require('express')
const https = require('node:https');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/assignment.html");
    });
app.post("/", function(req, res){
   const query = req.body.cityName;
   console.log(req.body.cityName);
   const units = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=39bbea0d705ae708c51775870ee02964&units=metric&lang=eng";
   
   https.get(url, function(response){
       response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feels = weatherData.main.feels_like;
            const humidity = weatherData.main.humidity;
            const pressure = weatherData.main.pressure;
            const wspeed = weatherData.wind.speed;
            const countryCode = weatherData.sys.country;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>Temperature in " + query +" with country code = " + countryCode + " is " + temp + " but feels like " + feels +"</h1>");
            res.write("<h1>Humidity is "+ humidity +"</h1>");
            res.write("<h1>Pressure is "+ pressure +"</h1>");
            res.write("<h1> Wind speed is "+ wspeed+"</h1>");
            res.write("<h1> The weather is " + description + "</h1>");
            res.write("<img src= " + imageURL + "> <br>");
        })
      
    });
    https.get('https://catfact.ninja/fact', function(catFactResponse) {
    catFactResponse.on('data', function(catFactData){
      const catFact = JSON.parse(catFactData);
      const fact = catFact.fact;
      res.write(`<h1>Cat Fact: ${fact}</h1>`);
    });
  });
    https.get('https://random.dog/woof.json', function(dogDataResponse){
    dogDataResponse.on('data',function(dogData){
        const dogPic = JSON.parse(dogData);
        const picURL = dogPic.url;
        console.log(picURL);
        if (picURL.slice(-3) === "mp4") {
        res.write('<br><video width="320" height="240"><source src=' + picURL + '> </video>');
        } else {
        res.write('<img width="320" height="240" src= ' + picURL + '>');
        }
    });
  });
});


app.listen(3000, function(){
console.log("Server is running on port 3000");
}); 