app = angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
app.controller('AppCtrl', function($scope, $modal, $log ) {
    $scope.Users = [{
        'userN': 'Ariel1',
        'PassW': 'Aa123456',
        'Name': 'Ariel',
        'LastName': 'Livshits'
    }, {
        'userN': 'Ariel2',
        'PassW': 'Aa123456',
        'Name': 'Ariel',
        'LastName': 'Livshits'
    }, {
        'userN': 'Ariel3',
        'PassW': 'Aa123456',
        'Name': 'Ariel',
        'LastName': 'Livshits'
    }, {
        'userN': 'Ariel4',
        'PassW': 'Aa123456',
        'Name': 'Ariel',
        'LastName': 'Livshits'
    }, {
        'userN': 'Ariel5',
        'PassW': 'Aa123456',
        'Name': 'Ariel',
        'LastName': 'Livshits'
    }, {
        'userN': 'Ariel6',
        'PassW': 'Aa123456',
        'Name': 'Ariel',
        'LastName': 'Livshits'
    }, {
        'userN': 'Ariel6',
        'PassW': 'Aa123456',
        'Name': 'Ariel',
        'LastName': 'Livshits'
    }, {
        'userN': 'Ariel6',
        'PassW': 'Aa123456',
        'Name': 'Ariel',
        'LastName': 'Livshits'
    }];
    $scope.saveUsers = function() {window.localStorage.setItem("tableData", JSON.stringify($scope.Users));};
    $scope.Users = JSON.parse(window.localStorage.getItem("tableData"));
    $scope.saveNewUser = function(newUser) { window.localStorage.setItem("newUser", JSON.stringify(newUser));};
    $scope.User = {
        'username': '',
        'Password': '',
        'connected': false
    };
    $scope.viewby = 3;
    $scope.totalItems = $scope.Users.length;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = (($scope.Users.length / 3) + 1) ; //Number of pager buttons to show
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.setItemsPerPage = function(num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first paghe
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
            'userN': $scope.newUser.userN,
            'PassW': $scope.newUser.PassW,
            'Name': $scope.newUser.Name,
            'LastName': $scope.newUser.LastName
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


