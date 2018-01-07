const mysql = require('mysql');
const getProductList = require('./getProductList');

const connection = getProductList.getConnection();

const saveToDB = (dbValues) => {

	return new Promise((resolve, reject) => {
		let query = connection.query('INSERT INTO inventory (inv_cd, name, quantity, price) VALUES ?', [dbValues], 
		  function (error, results, fields) {
			
			if (error) {
				throw error;
			}
			resolve(results);
		});
	});
};

const createEntryJson = (jsonData) => {
	let bulkInsertArray = [];
	jsonData.inventory.forEach((item) => {
		let data = [];
		if (jsonData.inv_cd) {
			data[0] = jsonData.inv_cd;
		}
		if (item.itemName) {
			data[1] = item.itemName;
		}
		if (item.quantity) {
			data[2] = item.quantity;
		}
		if (item.price) {
			data[3] = item.price;
		}
		bulkInsertArray.push(data);
	});
	return saveToDB(bulkInsertArray);
};
 
const insertIntoDB = (jsonData) => {
	return createEntryJson(jsonData)
		.then((results) => {
			console.log('Insertion successful');
			return results;
		});
};

module.exports.insertIntoDB = insertIntoDB;

