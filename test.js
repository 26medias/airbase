var hedgejs	= require('./hedgejs');
var moment	= require('moment');

var hedge	= new hedgejs({});

hedge.seasonAvg({
	symbol:	'AAPL',
	from:	'2000',
	to:		'2015'
});