/*
Copyright [2019] [NatWest Markets Plc]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

const axios = require('axios');
const https = require('https');
const fs=require('fs');
var PropertiesReader = require('properties-reader');
var prop = PropertiesReader('request.properties');
const options = {
		pfx: fs.readFileSync(prop.get('certPath')),
		passphrase: prop.get('passphrase')
	};

const agent = new https.Agent(options)

function getRates() {
 axios({
      method: "post",
      url: prop.get('ratesAPIURI'),
      data: JSON.stringify({
        'schemeId': prop.get('schemeId')
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      httpsAgent: agent
    })
    .then(function(response) {
      console.log('GetRates Response:: ',response.data)
    })
    .catch(function (error) {
		console.log(error);    	
  });
}

function getRatesBySegment() {
  axios({
      method: "POST",
      url:  prop.get('ratesAPIURI'),
      data: JSON.stringify({
        'schemeId': prop.get('schemeId'),
        'segmentId': prop.get('segmentId'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    httpsAgent: agent
    })
    .then(function(response) {
		console.log('GetRatesBySegment Response:: ', response.data)
	})
	.catch(function (error) {
		console.log(error);
	});	
}
function getRatesByCurrencyPair() {
    axios({
      method: "post",
      url: prop.get('ratesAPIURI'),
      data: JSON.stringify({
        'schemeId': prop.get('schemeId'),
        'segmentId': prop.get('segmentId'),
        'schemeBuyCurrency':'USD',
        'schemeSellCurrency':'CAD'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    httpsAgent: agent
    })
    .then(function(response) {
	 console.log('GetRatesByCurrencypair Response:: ',response.data);
	})
	.catch(function (error) {
		console.log(error);
	});	
}

 function main() {
  
  getRates();
   getRatesBySegment();
   getRatesByCurrencyPair();
  

}

main();