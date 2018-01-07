const mysql = require('mysql');
const getProductList = require('./getProductList');

const connection = getProductList.getConnection();

const saveToDB = (dbValues) => {

	return new Promise((resolve, reject) => {
		let query = connection.query('INSERT INTO user SET ?', dbValues, function (error, results, fields) {
			if (error) throw error;
			resolve(results.insertId);
		});
	});
};

const createUserJson = (jsonData) => {
	let dbJson = JSON.parse(JSON.stringify(jsonData));
	delete dbJson['inventory'];
	return saveToDB(dbJson);
};
 
const insertIntoDB = (jsonData) => {
	return createUserJson(jsonData)
		.then((inv_cd) => {
			console.log('Insertion successful');
			jsonData['inv_cd'] = inv_cd
			return Promise.resolve(jsonData);
		});
};

module.exports.insertIntoDB = insertIntoDB;

