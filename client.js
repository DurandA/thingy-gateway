//Example POST method invocation
var rest = require('restler');

module.exports = function(base_uri) {
	var module = {};

	module.logResponse = function (data, response) {
		// parsed response body as js object
		console.log(data);
		// raw response
		console.log(response);
	};

	function sendSensorData (data) {
		var jsonDate = (new Date()).toJSON();
		var jsonData = { timestamp: jsonDate, sensors: data };
		return rest.postJson(base_uri +'/'+this.id+'/sensors/', jsonData);
	}

	module.sendTemperature = function (temperature) {
		return sendSensorData.call(this, {temperature: temperature});
	};

	module.sendPressure = function (pressure) {
		return sendSensorData.call(this, {pressure: pressure});
	};

	module.sendHumidity = function (humidity) {
		return sendSensorData.call(this, {humidity: humidity});
	};

	module.sendColor = function (color) {
		return sendSensorData.call(this, {color: color});
	};

	module.sendGas = function (gas) {
		return sendSensorData.call(this, {gas: gas});
	};

	module.setButton = function (state) {
		return rest.putJson(base_uri +'/'+this.id+'/sensors/button', {state: state});
	};

	module.getSettings = function () {
		return rest.get(base_uri+'/'+this.id+'/setup');
	};

	module.getLed = function () {
		return rest.get(base_uri+'/'+this.id+'/actuators/led');
	};

	return module;
};
