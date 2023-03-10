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
var rateID;
var rateQuoteId;
var ratesResponse;



function getRates() {
  axios({
		method: 'post',
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
		rate = response.data
		console.log("RATE RESPONSE: ", rate)
		submitTransaction(rate[0].rateQuoteId)
	})
	.catch(function (error) {
		console.log(error);
	});	
}

function submitTransaction(rateId) {
  
	axios({
		method: 'POST',
		url: prop.get('txnAPIURI'),
		data: JSON.stringify({
		  "schemeId" : prop.get('schemeId'),
		  "transactionType" : "QUOTED",
		  "transactionRequests": 
		[
			{  
			"segmentId" : prop.get('segmentId'),
			"counterparty1" : prop.get('counterparty'),
			"customField1" : 'sample',
			"customField2" : 'Cust field2',
			"dealtAmount" : 100,
			"dealtCurrency" : 'USD',
			"rateQuoteId" : rateId,
			"schemeBatchId" : '12',
			"schemeTransactionId" : 'SAMPLE|TXN|'+Date.now()
			}
		]
		}),
		headers: {
			'Content-Type': 'application/json',
		},
		httpsAgent: agent
	})
	.then(function(response) {
		txn = response.data
		console.log("TRANSACTION DATA:", txn)
		cancelTransaction(txn[0].schemeTransactionId)
	})
	.catch(function (error) {
		console.log(error);
	});	
}

function cancelTransaction(id) {
	axios({
		method: 'post',
		url: prop.get('txnAPIURI'),
		data: JSON.stringify({
		  "schemeId" :  prop.get('schemeId'),
		  "transactionType" : "CANCEL",
		  "transactionRequests": 
		[
			{  
				"customField1" : 'sample',
				"customField2" : 'Cust field2',
				"amount" : 100,
				"currency" : 'USD',
				"schemeBatchId" : '12',
				"schemeTransactionId" : 'SAMPLE|TXN|'+Date.now(),
				"originalSchemeTransactionId" : id
			}
		]
		}),
		headers: {
			'Content-Type': 'application/json',
		},
		httpsAgent: agent
	})
	.then(function(response) {
		txn = response.data
		console.log("CANCELLED TRANSACTION DATA:", txn)
	})
	.catch(function (error) {
		console.log(error);
	});	
}

function main() {
	rateId = getRates();
}

main();