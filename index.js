'use strict';
let express = require('express');
let hexMath = require('./libs/hexMath');
let helmet = require('helmet');
const asyncHandler = require('express-async-handler');
const jayson = require('jayson');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(helmet());

const client = jayson.client.http({
  port: process.env.HOST_PORT
});


let discriminatePath = function (req, res, next) {
  let arrayStr = req.originalUrl.split('/');
  let kind = arrayStr.pop();
  if(!['wei','dec'].includes(kind)) {
    res.render('index', { title: 'Petra Stats', message: 'Wrong path to Petra statistic', result: '' , passed: false });
  } else {
    next();
  }
};

app.use(discriminatePath);

app.get('/totalSupply/:kind', asyncHandler(async (req, res, next) => {
  req.setTimeout(50000);
  client.request('eth_getTotalSupply', {} ,  function(err, response) {
  if(err){
    res.render('index', { title: 'Petra Stats', message: 'Failed to retrieve information from server!', result: '' , passed: false});
  } else {
    let computedValue = hexMath.convertToWeiNumberOrDecimal(response.result, req.params['kind']);
    res.render('index', { title: 'Petra Stats', message: `Petra: Total Supply in ${req.params['kind']}`,result: `${computedValue}`, passed: true});
  }})})
);


app.get('/circulatingSupply/:kind', asyncHandler(async (req, res, next) => {
  req.setTimeout(50000);
  client.request('eth_getCirculatingSupply', {} ,  function(err, response) {
  if(err){
    res.render('index', { title: 'Petra Stats', message: 'Failed to retrieve information from server!',result: '', passed: false});
  } else {
    let computedValue = hexMath.convertToWeiNumberOrDecimal(response.result, req.params['kind']);
    res.render('index', { title: 'Petra Stats', message: `Petra: Circulating Supply in ${req.params['kind']}` ,result: `${computedValue}`, passed: true});  
  }})})
);


app.listen(process.env.PORT, () => {
  console.log(`Server running at Port:  ${process.env.PORT}!`); }
);
