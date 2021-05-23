var fs = require("fs");
var http = require("http");

const args = process.argv[2];

http.get("http://restcountries.eu/rest/v2/region/europe", function (response) {

	var apiResponse = "";

	response.on("data", function (data) {
		apiResponse += data;
	});

	response.on("end", function () {
		const parsedApi = JSON.parse(apiResponse);
		const countries = parsedApi.filter(item => {
			return item.name.toLowerCase().search(args ? args.toLowerCase() : "") !== -1
		}).map(({ name, capital }) => ({ countryName: name, capitalCity: capital }));
		const result = { results: [...countries] };
		fs.writeFileSync(args + ".json", JSON.stringify(result, 0, 2));
	});
});