var myApp = angular.module('shoppingCart', ['ngRoute', 'saveCartModule', 'phoneModule']);



	// inject the Todo service factory into our controller
	myApp.controller('mainController', ['$scope', '$rootScope', '$http', '$location', 'saveCartService', 'Phone', function($scope, $rootScope, $http, $location, saveCartService, Phone) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.phones = Phone.query();
		$scope.orderCount = 0;
		$scope.orders = saveCartService.getOrders();
		$scope.vat = 10;
		$scope.discount = 5;

		$scope.addtoCart = function(phone, option) {		
			saveCartService.saveOrder(phone, option);
			$scope.orderCount += 1;
		};	

		$scope.viewCart = function() {
			$location.url('/viewcart');
		};

		for(var ii=0; ii<$scope.orders.length; ii+=1)
		{
			$scope.$watch('orders['+ii+']', function(changed) {
				$scope.calculate();
	        }, true);
		}

		$scope.calculate = function() {
			$scope.totalprice = 0;
			$scope.fitems = 0;
			$scope.orders.forEach(function(order){
				$scope.totalprice += (order.count * order.phone.price);
				$scope.fitems += order.count;
			});
			$scope.dprice = $scope.totalprice * $scope.discount/100;
			$scope.vprice = ($scope.totalprice - $scope.dprice) * $scope.vat/100;
			$scope.finalprice = $scope.totalprice - $scope.vprice; 
			saveCartService.savePriceItems($scope.finalprice, $scope.fitems);
		};

		$scope.goBack = function() {
			$location.url('/');
		};

		$scope.countItems = function() {
			$scope.finalprice = saveCartService.getFinalPrice();
			$scope.itemcount = saveCartService.getItemCount()
		};

		$scope.gopay = function() {
			$location.url('/pgateway');
			saveCartService.initOrders();
		};

		$scope.removeItem = function(index) {
			saveCartService.removeItem(index);
		};

		$scope.logout = function() {
			$rootScope.loggedin = false;
			$http.get('/logout').success(function(response){
				console.log('logged out');
			}).error(function(err){
				console.log(err);
			});
		}

		$scope.login = function() {
			$scope.jdata = {
				email: $scope.email,
				password: $scope.password
			};

			$http({
	          method  : 'POST',
	          url     : '/login',
	          data    : $scope.jdata,
			  transformRequest: function(obj) {			
			    var str = [];
			    for(var p in obj)
			    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    return str.join("&");
			  },	          
	          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         	})
          	.success(function(data) {
          		$rootScope.loggedin = true;
          		$rootScope.lemailid = data.uemail;          		
          		$location.url('/confirmation');
          	})
          	.error(function(err){
          		$scope.loginerr = err;
          	});
		}

		$scope.signup = function() {
			$scope.jdata = {
				email: $scope.email,
				password: $scope.password
			};

			$http({
	          method  : 'POST',
	          url     : '/signup',
	          data    : $scope.jdata,
			  transformRequest: function(obj) {			
			    var str = [];
			    for(var p in obj)
			    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    return str.join("&");
			  },	          
	          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         	})
          	.success(function(data) {
          		$rootScope.loggedin = true;
          		$rootScope.lemailid = data.uemail;          		
          		$location.url('/confirmation');
          	})
          	.error(function(err){
          		$scope.signuperr = err;
          	});
		}


		$scope.makePayment = function() {
			if($rootScope.loggedin)
				$location.url('/confirmation');
			else
				$location.url('/login');
		}

	}]);