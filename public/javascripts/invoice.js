function clickable(inv_cd) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "http://localhost:3000/detail?inv_cd="+inv_cd, true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	function processRequest(e) {
	    if (xhr.readyState == 4 && xhr.status == 200) {
	    	document.getElementById("right").innerHTML = xhr.responseText;
	    }
	}
}

function modal_display() {
	var modal = document.getElementById('myModal');
    modal.style.display = "block";
}

function inventory_modal_display() {
	var modal = document.getElementById('inventory_modal');
	var user_name = document.getElementById('user_name');
	var email = document.getElementById('email');
	document.getElementById('u_name').innerHTML = user_name.value;
	document.getElementById('u_email').innerHTML = email.value;
    modal.style.display = "block";
}

function add_row() {
	var table = document.getElementById('create_inventory_table');
	var item = document.getElementById('item');
	var qty = document.getElementById('qty');
	var price = document.getElementById('price');
	var sub_total = document.getElementById('sub_total');
	var sub_ttl = parseInt(sub_total.innerHTML, 10);

	if (item.value != '' && parseInt(qty.value, 10) > 0) {
		var row = table.insertRow(table.rows.length -1);
		row.insertCell(0).innerHTML = item.value;
		row.insertCell(1).innerHTML = qty.value;
		row.insertCell(2).innerHTML = price.value;
		sub_total.innerHTML = sub_ttl + parseInt(price.value, 10);
		item.value = "";
		qty.value = "";
		price.value = "";
	}
}

function save_inventory() {
	var jsonData = {
		user: document.getElementById('user_name').value,
		email: document.getElementById('email').value,
		address: document.getElementById('address').value,
		pin_code: document.getElementById('pincode').value,
		phone: document.getElementById('phone').value,
		tax_percent: document.getElementById('tax_percent').value,
		discount_percent: document.getElementById('discount_percent').value,
		inventory: []
	};

	var cols = document.getElementById('create_inventory_table').getElementsByTagName('td'), colslen = cols.length, i = 0;
	while(i < colslen) {
		var item = {
			itemName: cols[i++].innerHTML,
			quantity: cols[i++].innerHTML,
			price: cols[i++].innerHTML
		}
		jsonData.inventory.push(item);
	}
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', "http://localhost:3000/create_invoice", true);
	xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	xhr.onreadystatechange = function () {
	    if (xhr.readyState == 4 && xhr.status == 200) {
	    	window.location.href = 'http://localhost:3000/';
	    }
	}
	xhr.send(JSON.stringify(jsonData));
}