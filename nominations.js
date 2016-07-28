angular.module('App')
.controller('NominationsController', function($scope,$http, Nominees,$ionicPopover,$ionicModal) {
	$scope.nominees = Nominees;
    	       /////////////////////
    $ionicModal.fromTemplateUrl('views/nominations/mylongform.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
  $scope.openModal = function(){
    $scope.modal.show();
  }
  $scope.closeModal = function(){
    $scope.modal.hide();
  }
            //////////////////////
    $ionicPopover.fromTemplateUrl('views/nominations/help-popover.html', {
		scope: $scope
	})
	.then(function(popover) {
		$scope.popover = popover;
	});
	$scope.openHelp = function($event) {
		$scope.popover.show($event);
	};
	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});
    
            //////////////////////
	$scope.state = {
		reordering: false
	};

	$scope.$on('$stateChangeStart', function() {
		$scope.state.reordering = false;
	});

	$scope.move = function(nominee, fromIndex, toIndex) {
		$scope.nominees.splice(fromIndex, 1);
		$scope.nominees.splice(toIndex, 0, nominee);
	};
    
            //////////////////////
    $scope.load = function() {
		$http.get('https://api.bitcoinaverage.com/ticker/all')
			.success(function(tickers) {
				angular.forEach($scope.nominees, function(nominee) {
					nominee.ticker = tickers[nominee.code];
					nominee.ticker.timestamp = new Date(nominee.ticker.timestamp);
				});
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.load();
    
})

