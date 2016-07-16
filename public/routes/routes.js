angular.module('shoppingCart')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  //$locationProvider.hashPrefix('!');
  	$locationProvider.html5Mode(true);
	$routeProvider
	    .when('/', 
	        {
	        	controller:'mainController',
	            templateUrl: 'views/phonelist.html'
	        })
	   	.when('/viewcart', 
	        {
	        	controller:'mainController',
	            templateUrl: 'views/viewCart.html'
	        })
	   	.when('/makepayment', 
	        {
	        	controller:'mainController',
	            templateUrl: 'views/makepayment.html'
	        })
	    .when('/login', 
	    	{
	    		controller: 'mainController',
	    		templateUrl: 'views/login.html'
	    	})	 
	    .when('/signup', 
	    	{
	    		controller: 'mainController',
	    		templateUrl: 'views/signup.html'
	    	})	 
	    .when('/confirmation', 
	    	{
	    		controller: 'mainController',
	    		templateUrl: 'views/confirmation.html'
	    	})
	    .when('/pgateway', 
	    	{
	    		controller: 'mainController',
	    		templateUrl: 'views/pgateway.html'
	    	})	    
    		
	    .otherwise({ redirectTo: '/' });
}]);
