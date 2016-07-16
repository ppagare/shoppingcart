angular.module('saveCartModule', [])

	// super simple service
	// each function returns a promise object 
	.factory('saveCartService', function() {
		var orders = [];
		var fprice = 0;
		var itemcount = 0;
	    return {
	        getOrders: function () {
	            //You could also return specific attribute of the form data instead
	            //of the entire data
	            return orders;
	        },
	        saveOrder: function (item, qnty) {
	        	orders.push({ 'phone': item, 'count': qnty });
	        },
	        savePriceItems: function(price, count) {
	        	fprice = price;
	        	itemcount = count;
	    	},
	    	getFinalPrice: function() {
	    		return fprice;
	    	},
	    	getItemCount: function() {
	    		return itemcount;
	    	},
	    	removeItem: function(index) {
	    		orders.splice(index, 1);
	    	},
	    	initOrders: function() {
	    		orders = [];
	    	}
	    };
	});