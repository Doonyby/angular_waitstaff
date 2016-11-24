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
		$scope.formSubmit = function() {
			if( $scope.myForm.$valid ) {
				console.log('form is valid');
				$rootScope.mealCount++;
				var tax = $scope.taxRate/100;
				var tip = $scope.tipPercent/100;
				$scope.custSubtotal = ($scope.mealPrice * tax) + $scope.mealPrice;
				$scope.custTip = $scope.custSubtotal * tip;
				$scope.custTotal = $scope.custSubtotal + $scope.custTip;
				$scope.mealPrice = "";
				$scope.taxRate = "";
				$scope.tipPercent = "";
				$scope.myForm.$setPristine();
			} else {
				console.log('form is not valid');
				$rootScope.redBox = true;
			}
		};
		$rootScope.cancelMeal = function() {
			$scope.myForm.$setPristine();
			$rootScope.redBox = false;
			$scope.mealPrice = "";
			$scope.taxRate = "";
			$scope.tipPercent = "";
		};

	}]).controller('EarningsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
		$rootScope.tipTotal += $rootScope.custTip
		$rootScope.avgTip = ($rootScope.tipTotal / $rootScope.mealCount);

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

