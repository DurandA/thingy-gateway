//Example POST method invocation
var rest = require('restler');
var EventSource = require('eventsource');

module.exports = function(base_uri, headers = {}) {
	var module = {};
	var options = {headers : headers};

	module.logResponse = function (data, response) {
		// parsed response body as js object
		console.log(data);
		// raw response
		console.log(response);
	};

	function sendSensorData (data) {
		var jsonDate = (new Date()).toJSON();
		var jsonData = { timestamp: jsonDate, sensors: data };
		return rest.postJson(base_uri +'/'+this.id+'/sensors/', jsonData, options);
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
		return rest.putJson(base_uri +'/'+this.id+'/sensors/button', {state: state}, options);
	};

	module.getSettings = function () {
		return rest.get(base_uri+'/'+this.id+'/setup', options);
	};

	module.getLed = function () {
		return rest.get(base_uri+'/'+this.id+'/actuators/led', options);
	};

	module.getLedSource = function (onmessage, onerror) {
		var source = new EventSource(base_uri+'/'+this.id+'/actuators/led', options);
		source.onmessage = onmessage;
		if (onerror) source.onerror = onerror;
	}

	return module;
};
