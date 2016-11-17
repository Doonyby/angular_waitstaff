angular.module('myApp', [])
	.controller('myCtrl', function() {
		var vm = this;
		vm.redBox = false;
		vm.mealCount = 0;
		vm.tipTotal = 0;
		vm.formSubmit = function() {
			if( vm.myForm.$valid ) {
				console.log('form is valid');
				vm.mealCount++;
				vm.redBox = false;
				var tax = vm.taxRate/100;
				var tip = vm.tipPercent/100;

				vm.custSubtotal = (vm.mealPrice * tax) + vm.mealPrice;
				vm.custTip = vm.custSubtotal * tip;
				vm.custTotal = vm.custSubtotal + vm.custTip;
				vm.tipTotal += vm.custTip

				vm.avgTip = (vm.tipTotal / vm.mealCount);

			} else {
				console.log('form is not valid');
				vm.redBox = true;
			}
		};
	});

