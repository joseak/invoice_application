const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'invoice',
  password : 'weavedIn',
  database : 'weaved_in'
});

const queryDb = (inv_cd, callback) => {
	let sqlQuery = 'SELECT * FROM test where inv_cd = ?';
	let insertParams = [inv_cd];
	sql = mysql.format(sqlQuery, insertParams);

	return new Promise((resolve, reject) => {
		let query = connection.query(sql, function (error, results, fields) {
			if (error) reject(error);
			resolve(results);
		});
	});
};

const formatAsResponse = (results, user) => {
	let elementsArray = [];
	let item_sum = {subTotal: 0, tax: 0, discount: 0, grandTotal: 0};
	results.forEach((rowElement) => {
		let jsonData = {};
		jsonData['name'] = rowElement.name;
		jsonData['quantity'] = rowElement.quantity;
		jsonData['price'] = rowElement.price;
		item_sum.subTotal += jsonData['price'];
		elementsArray.push(jsonData);
	});
	if (user.tax_percent > 0 && user.tax_percent < 100) {
		item_sum.tax = item_sum.subTotal * (user.tax_percent/100);
	}
	if (user.discount_percent > 0) {
		item_sum.discount = (item_sum.subTotal+item_sum.tax) * (user.discount_percent/100);
	}
	item_sum.grandTotal += item_sum.subTotal + item_sum.tax - item_sum.discount;
	return {element: user, items: elementsArray, total: item_sum};
};
 
const queryResults = (user_results) => {
	return queryDb(user_results.inv_cd)
		.then((results) => {
			return formatAsResponse(results, user_results);
		});
};

const createConnection = () => {
	connection.connect();
};

const closeConnection = () => {
	connection.end();
};

const getConnection = () => {
	return connection;
};

module.exports.getConnection = getConnection;
module.exports.createConnection = createConnection;
module.exports.closeConnection = closeConnection;
module.exports.queryDb = queryResults;
