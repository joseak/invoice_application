// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'invoice',
//   password : 'weavedIn',
//   database : 'weaved_in'
// });

// const insertIntoDB = (dbValues) => {
// 	// let data = {'inv_cd': 2, 'name': "Bottle", 'quantity': 10, 'price': 2500};
// 	let query = connection.query('INSERT INTO test SET ?', dbValues, function (error, results, fields) {
// 		if (error) throw error;
// 	});
// 	console.log(query.sql);
// };

// const createEntryJson = (jsonData) => {
// 	let data = {};
// 	if (jsonData.itemName) {
// 		data['name'] = jsonData.itemName;
// 	}
// 	if (jsonData.quantity) {
// 		data['quantity'] = jsonData.quantity;
// 	}
// 	if (jsonData.price) {
// 		data['price'] = jsonData.price;
// 	}
// 	if (jsonData.inv_cd) {
// 		data['inv_cd'] = jsonData.inv_cd;
// 	}
// 	insertIntoDB(data);
// };
 
// connection.connect();
 
// let data = {'inv_cd': 2, 'itemName': "Phone", 'quantity': 1, 'price': 10000};
// createEntryJson(data);
 
// connection.end();
