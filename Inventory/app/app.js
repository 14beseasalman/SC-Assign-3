var app = angular.module('myApp',[]);

getDate = function () {
	var today = new Date();
	var mm = today.getMonth() + 1;
	var dd = today.getDate();
	var yyyy = today.getFullYear();

	var date = dd + "/" + mm + "/" + yyyy

	return date
};
getTime = function(){
	return new Date().toLocaleTimeString('en-US', { hour12: false, 
		hour: "numeric", 
		minute: "numeric",
		second: "numeric"});
}

app.controller('productsCtrl', function ($scope) {
	console.log("WOOT");
	$scope.products = [];
	populateInventoryPage($scope.products);
	
})


app.filter('cafename', function() {
	return function(input) {
		if(input == "cafe-1")
			return "Cafe 1";
		if(input == "cafe-2")
			return "Cafe 2";
		if(input == "cafe-3")
			return "Cafe 3";
		return input;
	}

});