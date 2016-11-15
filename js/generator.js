function test_console() {
	$("#intro_copy").empty().append(generate_bullshit());
}

function get_random_number(min, max) {
	var not_round = Math.random() * (max - min) + min;
	return Math.round(not_round);
}

function get_sentence() {
	var sentence = "";
	word_count = get_random_number(7, 14);
	for (var x = 0; x<word_count; x++) {
		term = terms[get_random_number(0, terms.length - 1)];
		sentence+= x === 0 ? term.charAt(0).toUpperCase() + term.slice(1) : term;
		sentence+= x !== word_count - 1 ? " " : ".";
	}
	return sentence;
}

function get_paragraph() {
	var paragraph = ""; sentence_count = get_random_number(3, 5);
	for (var x =0; x<sentence_count; x++) {
		var sentence = get_sentence();
		paragraph+=sentence;
		if (x !== sentence_count - 1) paragraph += " ";
	}
	return paragraph;
}



function generate_bullshit() {
	var paragraphs = [];
	var p_count = document.getElementById("p_count").value;
	p_count = parseInt(p_count, 10);
	p_count = typeof p_count==='number' && (p_count%1)===0 ? p_count : p_count =5;

	for (var x =0; x<p_count; x++) paragraphs.push(get_paragraph());
	return paragraphs;
}



//loading a GeoJSON file
function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'js/terms.json', false); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
};

//parsing JSON
var terms = null;
(function init() {
	loadJSON(function (response) {
		// Parse JSON string into object
		terms = JSON.parse(response);
		terms = terms.terms;
	});
})();