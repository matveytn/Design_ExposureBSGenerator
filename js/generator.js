var test_console = function () {
	console.log('success');
};

//loading a GeoJSON file
function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'ai.json', false); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
};

//parsing JSON
var aiJSON = null;
(function init() {
	loadJSON(function (response) {
		// Parse JSON string into object
		return aiJSON = JSON.parse(response);
	});
})();