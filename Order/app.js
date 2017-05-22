// Code goes here
var app = angular.module('myApp', []);

app.controller('PosController', function ($scope) {
    
    $scope.drinks = [{id: 0,name: "Water",price: "30",},{id: 1,name: "Energy Drink",price: "110",},
    {id: 2,name: "Espresso",price: "120",},{id: 3,name: "Cappuccino",price: "130",},{id: 4,name: "Tea",price: "90",},
    {id: 5,name: "Hot Chocolate",price: "210",},{id: 6,name: "Coke",price: "40",},{id: 7,name: "Orange Juice",price: "40",}];

    $scope.foods = [{id: 8,name: "Waffle",price: "150",},{id: 9,name: "Samosa",price: "30",},{id: 10,name: "Cheesecake",price: "170",},
    {id: 11,name: "Sandwich",price: "270",},{id: 12,name: "Donuts",price: "190",},{id: 13,name: "Tortilla",price: "190",}];

    $scope.order = [];
    $scope.new = {};
    $scope.totOrders = 0;

    var url = window.location.protocol + "://" + window.location.host + "/" + window.location.pathname;

    $scope.getDate = function () {
        var today = new Date();
        var mm = today.getMonth() + 1;
        var dd = today.getDate();
        var yyyy = today.getFullYear();

        var date = dd + "/" + mm + "/" + yyyy

        return date
    };
    $scope.getTime = function(){
        return new Date().toLocaleTimeString('en-US', { hour12: false, 
                                             hour: "numeric", 
                                             minute: "numeric",
                                                second: "numeric"});
    }

    $scope.addToOrder = function (item, qty) {
        var flag = 0;
        if ($scope.order.length > 0) {
            for (var i = 0; i < $scope.order.length; i++) {
                if (item.id === $scope.order[i].id) {
                    item.qty += qty;
                    flag = 1;
                    break;
                }
            }
            if (flag === 0) {
                item.qty = 1;
            }
            if (item.qty < 2) {
                $scope.order.push(item);
            }
        } else {
            item.qty = qty;
            $scope.order.push(item);
        }
    };

    $scope.removeOneEntity = function (item) {
        for (var i = 0; i < $scope.order.length; i++) {
            if (item.id === $scope.order[i].id) {
                item.qty -= 1;
                if (item.qty === 0) {
                    $scope.order.splice(i, 1);
                }
            }
        }
    };

    $scope.removeItem = function (item) {
        for (var i = 0; i < $scope.order.length; i++) {
            if (item.id === $scope.order[i].id) {
                $scope.order.splice(i, 1);
            }
        }
    };

    $scope.getTotal = function () {
        var tot = 0;
        for (var i = 0; i < $scope.order.length; i++) {
            tot += ($scope.order[i].price * $scope.order[i].qty)
        }
        return tot;
    };

    $scope.clearOrder = function () {
        $scope.order = [];
    };


    $scope.addNewItem = function (item) {
        if (item.category === "Drinks") {
            item.id = $scope.drinks.length + $scope.foods.length
            $scope.drinks.push(item)
            $scope.new = []
            $('#myTab a[href="#drink"]').tab('show')
        } else if (item.category === "Food Items") {
            item.id = $scope.drinks.length + $scope.foods.length
            $scope.foods.push(item)
            $scope.new = []
            $('#myTab a[href="#food"]').tab('show')
        }
    };

    $scope.checkout = function (index) {
        CHECKOUT_ENTRY = {
            _id:    "order-"+thisCafe+"-"+$scope.getDate()+"-"+$scope.getTime(),
            time:   $scope.getTime(),
            date:   $scope.getDate(),
            amount: $scope.getTotal().toFixed(2),
            items:  $scope.order
        };
        writeToDB(CHECKOUT_ENTRY);
        alert("Order Succesfully Placed!\nTotal Amount: "+CHECKOUT_ENTRY.amount);
        $scope.order = [];
        $scope.totOrders += 1;
    };
});
