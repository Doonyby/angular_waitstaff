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
		$rootScope.mealCount = 0;
		$rootScope.tipTotal = 0;
		$rootScope.avgTip = 0;	    
	})
	.controller('HomeCtrl', ['$rootScope', function($rootScope) {

	}])
	.controller('MealCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

		$scope.formSubmit = function() {
			if( $scope.myForm.$valid ) {
				$rootScope.mealCount++;
				var tax = $scope.taxRate/100;
				var tip = $scope.tipPercent/100;
				$scope.custSubtotal = ($scope.mealPrice * tax) + $scope.mealPrice;
				$scope.custTip = $scope.custSubtotal * tip;
				$rootScope.tipTotal += $scope.custTip;
				$rootScope.avgTip = ($rootScope.tipTotal / $rootScope.mealCount);
				$scope.custTotal = $scope.custSubtotal + $scope.custTip;
				$scope.mealPrice = "";
				$scope.taxRate = "";
				$scope.tipPercent = "";
				$scope.myForm.$setPristine();
			}
		};
		$scope.cancelMeal = function() {
			$scope.myForm.$setPristine();
			$scope.mealPrice = "";
			$scope.taxRate = "";
			$scope.tipPercent = "";
		};

	}]).controller('EarningsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
		
		$scope.reset = function() {
			$rootScope.mealCount = 0;
			$rootScope.tipTotal = 0;
			$rootScope.avgTip = 0;			
		};
	}]);

