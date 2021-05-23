"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var fs = require("fs");

var http = require("http");

var args = process.argv[2];
http.get("http://restcountries.eu/rest/v2/region/europe", function (response) {
  var apiResponse = "";
  response.on("data", function (data) {
    apiResponse += data;
  });
  response.on("end", function () {
    var parsedApi = JSON.parse(apiResponse);
    var countries = parsedApi.filter(function (item) {
      return item.name.toLowerCase().search(args ? args.toLowerCase() : "") !== -1;
    }).map(function (_ref) {
      var name = _ref.name,
          capital = _ref.capital;
      return {
        countryName: name,
        capitalCity: capital
      };
    });
    var result = {
      results: _toConsumableArray(countries)
    };
    fs.writeFileSync(args + ".json", JSON.stringify(result, 0, 2));
  });
});