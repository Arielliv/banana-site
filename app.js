angular.module('ionic.utils', [])

    .factory('$localstorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }]);


app = angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap' , 'ionic.utils']);
app.controller('AppCtrl', function($scope, $modal, $log, $localstorage, $filter) {
    $scope.User = {
        'username': '',
        'Password': '',
        'connected': false,
        'countConnect': 0,
        'countPaging':0,
        'countOrder':0,
        'countTapName':0
    };
    if(window.localStorage.getItem('a')){
        $scope.Users = $localstorage.getObject('a');
        console.log($scope.Users);
    }
    else{
        $scope.Users = [{}];
        console.log($scope.Users);
    }
    $scope.tapName = function(User){ User.countTapName ++; };

    $scope.countOrder = function (User){
        User.countOrder++;
    };
    $scope.viewby = 3;
    $scope.totalItems = $scope.Users.length;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = (($scope.Users.length / 3) + 1) ; //Number of pager buttons to show
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function(User) {
        console.log('Page changed to: ' + $scope.currentPage);
        $scope.User.countPaging ++;
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
            $localstorage.setObject('a',$scope.Users);
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
            conUser.countConnect++;
            $localstorage.setObject('a',$scope.Users);
            $scope.User = $filter('filter')($scope.Users, { userName: "a"})[0];
            console.log($scope.User.userName);
            $scope.User.connected = 'true';
            $scope.User.countConnect ++;
            $localstorage.setObject('a',$scope.Users);
            //// $scope.Users.push(conUser);

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
            'userName': $scope.userN,
            'PassWord': $scope.PassW,
            'Name': $scope.Name,
            'LastName': $scope.LastName,
            'connected': false,
            'countConnect': 0,
            'countPaging':0,
            'countOrder':0,
            'countTapName':0
        });
    };

    $scope.okC = function() {
        $modalInstance.close({
        });
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});


