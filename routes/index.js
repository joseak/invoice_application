var express = require('express');
var router = express.Router();
const getProductList = require('./../services/getProductList');
const getUserDetails = require('./../services/getUserDetails');
const getInvoiceList = require('./../services/getInvoiceList');

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
			res.render('contact', {rows: rows, items: result.items, total: result.total, element: result.element});
		});
});

module.exports = router;