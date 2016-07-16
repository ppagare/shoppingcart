angular.module('phoneModule', ['ngResource'])
.factory('Phone', ['$resource', function($resource) {
      return $resource('../models/phones/:phoneId.json', {}, {
	        query: {
	          method: 'GET',
	          params: {phoneId: 'phones'},
	          isArray: true
	        }
    	});
}]);