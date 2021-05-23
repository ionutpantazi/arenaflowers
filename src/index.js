document.getElementById("searchButton").onclick = function () {
	search();
};

function search() {
	var input = document.getElementById("searchBox").value;
	if (input) {
		var xmlhttp = new XMLHttpRequest(),
			method = 'GET',
			url = `./node/${input}.json`;
		xmlhttp.open(method, url, true);
		xmlhttp.onload = function () {
			var data = xmlhttp.response
			console.log(data)
			render(JSON.parse(data).results);
		};
		xmlhttp.send();
	}
}

function arrToUl(data, container, element) {
	var ul = document.createElement("ul");
	var li1 = document.createElement("li");
	li1.appendChild(document.createTextNode(data.countryName));
	li1.classList.add("Name");
	var li2 = document.createElement("li");
	li2.appendChild(document.createTextNode(data.capitalCity));
	li2.classList.add("City");
	ul.appendChild(li1);
	ul.appendChild(li2);
	ul.style.backgroundColor = element & 1 ? "#fafafa" : "#e3e1e1";
	container.appendChild(ul);
}

function render(data) {
	var container = document.getElementById("Results");
	if (container.hasChildNodes()) {
		container.innerHTML = "";
	}
	Object.keys(data).map((element) =>
		arrToUl(data[element], container, element)
	);
}
