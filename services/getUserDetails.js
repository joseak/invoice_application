const mysql = require('mysql');
const getProductList = require('./getProductList');

const connection = getProductList.getConnection();

const queryDb = (inv_cd) => {
	let sqlQuery = 'SELECT * FROM user where inv_cd = ?';
	let insertParams = [inv_cd];
	sql = mysql.format(sqlQuery, insertParams);

	return new Promise((resolve, reject) => {
		let query = connection.query(sql, function (error, results, fields) {
			if (error) reject(error);
			resolve(results);
		});
	});
};

const processDate = (dbDate) => {
	const invoiceDate = new Date(dbDate);
	var today = new Date();
	var isToday = (today.toDateString() == invoiceDate.toDateString());
	return isToday ? "Today" : invoiceDate.toLocaleDateString();
}

const formatAsResponse = (results) => {
	let jsonData = {};
	jsonData['inv_cd'] = results[0].inv_cd;
	jsonData['name'] = results[0].inv_cd;
	jsonData['author'] = results[0].user;
	jsonData['email'] = results[0].email;
	jsonData['address'] = results[0].address;
	jsonData['pin_code'] = results[0].pin_code;
	jsonData['phone'] = results[0].phone;
	jsonData['tax_percent'] = results[0].tax_percent;
	jsonData['discount_percent'] = results[0].discount_percent;
	jsonData['date'] = processDate(results[0].created_date);
	return jsonData;
};
 
const queryResults = (inv_cd) => {
	return queryDb(inv_cd)
		.then(formatAsResponse);
};

module.exports.queryDb = queryResults;
