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