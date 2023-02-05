const express=require("express");
const  https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");  
});

app.post("/",function(req,res){
    const city=req.body.City;
    const url="https://api.openweathermap.org/data/2.5/weather?&q="+city+"&appid=532e7080dfbbfc422d46ab98b61e185f&units=metric";
    
    https.get(url,function(response){
        
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temperature=weatherData.main.temp;
            const description=weatherData.weather[0].description;
            const code=weatherData.weather[0].icon;
            const imageUrl="http://openweathermap.org/img/wn/"+code+"@2x.png";

            res.write("<h1>The temperature of "+city+" is "+temperature+" degree celcius</h1>");
            res.write("<p>The weather condition is "+description+".</p>");
            res.write("<img src="+imageUrl+"></img>");
            res.send();
        });

    });
});



app.listen(process.env.PORT || 3000,function(req,res){
    console.log("server is started on 3000");
});
