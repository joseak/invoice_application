const mysql = require('mysql');
const getProductList = require('./getProductList');

const connection = getProductList.getConnection();

const queryDb = () => {
	let sqlQuery = 'select a.*, b.count, b.price from user a left join (' + 
		'select inv_cd, count(*) as count, sum(price) as price from test group by inv_cd) b on a.inv_cd = b.inv_cd';
	sql = mysql.format(sqlQuery);

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
};

const calculatePrice = (subTotal, tax_percent, discount_percent) => {
	let grandTotal = tax = discount = 0;
	if (tax_percent > 0 && tax_percent < 100) {
		tax = subTotal * (tax_percent/100);
	}
	if (discount_percent > 0) {
		discount = (subTotal+tax) * (discount_percent/100);
	}
	grandTotal += subTotal + tax - discount;
	return grandTotal;
}

const formatAsResponse = (results) => {
	let elementsArray = [];
	results.forEach((rowElement) => {
		let jsonData = {};
		jsonData['inv_cd'] = rowElement.inv_cd;
		jsonData['name'] = rowElement.inv_cd;
		jsonData['author'] = rowElement.user;
		jsonData['email'] = rowElement.email;
		jsonData['phone'] = rowElement.phone;
		jsonData['tax_percent'] = rowElement.tax_percent;
		jsonData['discount_percent'] = rowElement.discount_percent;
		jsonData['date'] = processDate(rowElement.created_date);
		jsonData['items'] = rowElement.count ? rowElement.count : 0;
		jsonData['price'] = calculatePrice(rowElement.price, rowElement.tax_percent, rowElement.discount_percent);
		elementsArray.push(jsonData);
	});
	return elementsArray.reverse();
};
 
const queryResults = () => {
	return queryDb()
		.then(formatAsResponse);
};

module.exports.queryDb = queryResults;
