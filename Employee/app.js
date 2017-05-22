

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

var app = angular.module('myApp', []);
app.controller('PosController', function ($scope) {
	siamese = [];
	persian = [];
	ragdoll = [];
	setEmployees(siamese,persian,ragdoll);

	$scope.ppl = siamese;
	

	var url = window.location.protocol + "://" + window.location.host + "/" + window.location.pathname;

	$scope.PopUp = function (item) {
		alert("Employee Details: "+"\n" + item.fname + " " + item.lname + "\n" + item.contact)
	};

	$scope.changeCafeStaff= function(item){
		if(item == 'ragdoll')
			$scope.ppl = ragdoll;
		if(item == 'persian')
			$scope.ppl = persian;
		if(item == 'siamese')
			$scope.ppl = siamese;

	}

	$scope.addNew = function (item) {
		
		
		console.log($("#category").val());
		if($("#category").val() == "siamese") {
			emp = {
				_id:"emp-cafe-"+"1"+getDate()+getTime(),
				contact:$("#number").val(),
				empid: Math.floor((Math.random() * 100) + 1),
				fname: $("#fname-box").val(),
				lname: $("#lname-box").val()
			};
			writeToDB(emp);
			console.log("AAAA");
			$('#myTab a[href="#siamese"]').tab('show');
		} else if ($("#category").val() === "persian") {
			emp = {
				_id:"emp-cafe-"+"2"+getDate()+getTime(),
				contact:$("#number").val(),
				empid: Math.floor((Math.random() * 100) + 1),
				fname: $("#fname-box").val(),
				lname: $("#lname-box").val()
			};
			console.log("AAAA");
			writeToDB(emp);
			$('#myTab a[href="#persian"]').tab('show');
		} else if ($("#category").val() === "ragdoll") {
			emp = {
				_id: "emp-cafe-"+"3"+getDate()+getTime(),
				contact: $("#number").val(),
				empid: Math.floor((Math.random() * 100) + 1),
				fname: $("#fname-box").val(),
				lname: $("#lname-box").val()
			};
			console.log("AAAA");
			writeToDB(emp);
			$('#myTab a[href="#ragdoll"]').tab('show');
		}
		alert("New Employee Added");
		siamese = [];
		persian = [];
		ragdoll = [];
		setEmployees(siamese,persian,ragdoll);
	};
	
	

});
