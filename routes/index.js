var express = require('express');
var router = express.Router();
const getProductList = require('./../services/getProductList');
const getUserDetails = require('./../services/getUserDetails');
const getInvoiceList = require('./../services/getInvoiceList');
const saveInventory = require('./../services/saveInventory');
const saveUserDetails = require('./../services/saveUserDetails');

router.get('/detail', function(req, res) {
	getUserDetails.queryDb(req.query.inv_cd)
		.then(getProductList.queryDb)
		.then((result) => {
			res.render('right_pane', {items: result.items, total: result.total, element: result.element})
		});
});

router.get('/', (req, res) => {
	let rows;
	getInvoiceList.queryDb()
		.then((invoice) => {
			rows = invoice;
			return getUserDetails.queryDb(invoice[0].inv_cd);
		}).then(getProductList.queryDb)
		.then((result) => {
			res.render('right_pane_extension', {rows: rows, items: result.items, total: result.total, element: result.element});
		});
});

router.post('/invoice', (req, res) => {
	saveUserDetails.insertIntoDB(jsonData)
		.then(saveInventory.insertIntoDB)
		.then(getInvoiceList.queryDb)
		.then((invoice) => {
			rows = invoice;
			return getUserDetails.queryDb(invoice[0].inv_cd);
		}).then(getProductList.queryDb)
		.then((result) => {
			res.render('right_pane_extension', {rows: rows, items: result.items, total: result.total, element: result.element});
		});
});

module.exports = router;