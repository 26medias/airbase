
angular.module('airbase', ['ngMaterial','ngJsonExplorer']).controller('airbaseController', function($scope) {
	
	$scope.safeApply = function(fn) {
		var phase = this.$root.$$phase;
		if(phase == '$apply' || phase == '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	};
	
	$scope.messages	= [];
	
	var firebase = new Firebase('https://airbasedebugger.firebaseio.com/');
	
	
	$scope.emit = function() {
		firebase.push({
			date:	new Date().toISOString(),
			data:	{
				hello:		'world',
				wordking:	true,
				date:		new Date().toISOString()
			}
		});
	}
	
	$scope.input = {
		error:	false,
		query:	"",
		cursor:	0,
		send:	function() {
			if (!$scope.input.query || $scope.input.query == '') {
				return false;
			}
			console.log("Send", $scope.input.query);
			try {
				var obj = $scope.$eval($scope.input.query);
				console.log("obj", obj);
				firebase.push({
					date:	new Date().toISOString(),
					type:	'log',
					data:	obj
				});
				$scope.safeApply(function() {
					$scope.input.error	= false;
					$scope.input.query	= '';
				});
			} catch (e) {
				console.log("error", e);
				$scope.safeApply(function() {
					$scope.input.error = true;
				});
			}
		}
	};
	
	firebase.on('child_added', function(snapshot) {
		$scope.safeApply(function() {
			$scope.messages.push(snapshot.val());
		});
	});
	
}).directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keypress", function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter);
				});
				//event.preventDefault();
			}
		});
	};
}).directive('ngPress', function () {
	return function (scope, element, attrs) {
		/*document.keydown(function (event) {
			console.log("event",event);
		});*/
	};
}).directive('ngEscape', function () {
	return function (scope, element, attrs) {
		var target	= $(element);
		if (attrs.global) {
			target	= $(document);
		}
		target.on("keypress", function (event) {
			if (event.keyCode === 27) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEscape);
				});
				event.preventDefault();
			}
		});
	};
});


