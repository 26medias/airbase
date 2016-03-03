
var _ 				= require('underscore');
var firebase		= require('firebase');

var airbase = function(options) {
	this.options = _.extend({
		channel:	'airbase',
		app:   		'https://airbasedebugger.firebaseio.com/'
	}, options);
	this.firebase = new Firebase(this.options.app);
}
airbase.prototype.log = function(data) {
	this.firebase.push({
		date:	new Date().toISOString(),
		channel:this.options.channel,
		type:	'log',
		data:	data
	});
}
airbase.prototype.info = function(data) {
	this.firebase.push({
		date:	new Date().toISOString(),
		channel:this.options.channel,
		type:	'info',
		data:	data
	});
}
airbase.prototype.warning = function(data) {
	this.firebase.push({
		date:	new Date().toISOString(),
		channel:this.options.channel,
		type:	'warning',
		data:	data
	});
}
airbase.prototype.error = function(data) {
	this.firebase.push({
		date:	new Date().toISOString(),
		channel:this.options.channel,
		type:	'error',
		data:	data
	});
}

module.exports = airbase;
