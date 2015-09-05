app = angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
app.controller('AppCtrl', function($scope, $modal, $log) {
    $scope.Users = [{
        'userN': 'Ariel',
        'PassW': 'Aa123456',
        'Name': 'Ariel',
        'LastName': 'Livshits'
    }, {
        'userN': 'Ariel',
        'PassW': 'Aa123456',
        'Name': 'Ariel',
        'LastName': 'Livshits'
    }, {
        'userN': 'Ariel',
        'PassW': 'Aa123456',
        'Name': 'Ariel',
        'LastName': 'Livshits'
    }];

    $scope.User = {
        'username': '',
        'Password': '',
        'connected': false
    };

    $scope.openR = function() {

        var modalInstance = $modal.open({
            templateUrl: 'table.html',
            controller: 'ModalInstanceCtrl'
        });
        modalInstance.result.then(function(newUser) {
            $scope.Users.push(newUser);
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.openC = function() {

        var modalInstance = $modal.open({
            templateUrl: 'connect.html',
            controller: 'ModalInstanceCtrl'
        });
        modalInstance.result.then(function(conUser) {
            $scope.User = conUser;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function($scope, $modalInstance) {
    $scope.okR = function() {
        $modalInstance.close({
            'userN': $scope.userN,
            'PassW': $scope.PassW,
            'Name': $scope.Name,
            'LastName': $scope.LastName
        });
    };

    $scope.okC = function() {
        $modalInstance.close({
            'username': $scope.username,
            'Password': $scope.password,
            'connected': true
        });
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});