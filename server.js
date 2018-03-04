const express = require('express');
const app = express();
const path = require('path');
const public = __dirname + "/public/";
const fetch = require("node-fetch");
const apiRequestPrefix =  "https://api.yelp.com/v3/businesses/search?categories=";

var fetchYelpData = function(url, res){
  fetch(url , {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Authorization": "Bearer PUT_YOUR_API_TOKEN_HERE"
      }
    }).then(
      response => {
        return response.json();
      }
    ).then(
      result => {
        // console.log('**************Result content:', result);
        res.header('Access-Control-Allow-Origin', '*');
        res.send(result);
      }
    ).catch(
      err => console.log('Error meesage', err)
  );
};


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(public + "index.html"));
});

app.get('/yelp/restaurants/latitude/:latitudeValue/longitude/:longitudeValue', (req, res) =>{
  console.log(req.params);
  var apiRequestSuffix = "&latitude="+req.params.latitudeValue+"&longitude="+req.params.longitudeValue;
  var categories = "restaurant";
  var url = apiRequestPrefix + categories + apiRequestSuffix;

  fetchYelpData(url, res);
});

app.get('/yelp/groceryStores/latitude/:latitudeValue/longitude/:longitudeValue', (req, res) =>{
  console.log(req.params);
  var apiRequestSuffix = "&latitude="+req.params.latitudeValue+"&longitude="+req.params.longitudeValue;
  var categories = "grocery";
  var url = apiRequestPrefix + categories + apiRequestSuffix;

  fetchYelpData(url, res);
});

app.listen(process.env.PORT || '3000', () => console.log('app listening on port 3000!'))