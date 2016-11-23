angular.module('myApp', ['ngRoute', 'ngAnimate'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'HomeCtrl',
            controllerAs: 'vm'			
		}).when('/meal', {
			templateUrl : 'meal.html',
            controller : 'MealCtrl',
            controllerAs: 'vm'
		}).when('/earnings', {
			templateUrl : 'earnings.html',
            controller : 'EarningsCtrl',
            controllerAs: 'vm'
		}).when('/error', {
		    template : '<p>Error - Page Not Found</p>'
		}).otherwise('/error');
	}])
	.run(function($rootScope, $location, $timeout) {
	    $rootScope.$on('$routeChangeError', function() {
	        $location.path("/error");
	    });
	    $rootScope.$on('$routeChangeStart', function() {
	        $rootScope.isLoading = true;
	    });
	    $rootScope.$on('$routeChangeSuccess', function() {
	      $timeout(function() {
	        $rootScope.isLoading = false;
	      }, 1000);
	    });
	})
	.controller('HomeCtrl', ['$rootScope', function($rootScope) {

	}])
	.controller('MealCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
		
		$rootScope.redBox = false;
		$rootScope.mealCount = 0;
		$rootScope.tipTotal = 0;
		$rootScope.formSubmit = function() {
			if( $rootScope.myForm.$valid ) {
				console.log('form is valid');
				$rootScope.mealCount++;
				var tax = $rootScope.taxRate/100;
				var tip = $rootScope.tipPercent/100;
				$rootScope.custSubtotal = ($rootScope.mealPrice * tax) + $rootScope.mealPrice;
				$rootScope.custTip = $rootScope.custSubtotal * tip;
				$rootScope.custTotal = $rootScope.custSubtotal + $rootScope.custTip;
				$rootScope.tipTotal += $rootScope.custTip
				$rootScope.avgTip = ($rootScope.tipTotal / $rootScope.mealCount);
				$rootScope.mealPrice = "";
				$rootScope.taxRate = "";
				$rootScope.tipPercent = "";
				$rootScope.myForm.$setPristine();
			} else {
				console.log('form is not valid');
				$rootScope.redBox = true;
			}
		};
		$rootScope.cancelMeal = function() {
			$rootScope.myForm.$setPristine();
			$rootScope.redBox = false;
			$rootScope.mealPrice = "";
			$rootScope.taxRate = "";
			$rootScope.tipPercent = "";
		};

	}]).controller('EarningsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

			$rootScope.reset = function() {
			$rootScope.redBox = false;
			$rootScope.mealCount = 0;
			$rootScope.tipTotal = 0;
			$rootScope.mealPrice = "";
			$rootScope.taxRate = "";
			$rootScope.tipPercent = "";
			$rootScope.custSubtotal = "";
			$rootScope.custTip = "";
			$rootScope.custTotal = "";
			$rootScope.tipTotal = "";
			$rootScope.avgTip = "";			
		};
	}]);

