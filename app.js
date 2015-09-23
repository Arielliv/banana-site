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
app.controller('AppCtrl', function($scope, $modal, $localstorage, $filter) {
    if(window.localStorage.getItem('f')){
        $scope.Users = $localstorage.getObject('f');
        console.log($scope.Users);
    }
    else{
        $scope.Users = [{}];
        console.log($scope.Users);
    }
    $scope.User = {

    };
    $scope.tapName = function(user){
    if(user.userName == $scope.User.userName){
            user.countTapName ++;}

    };

    $scope.countOrder = function (User){
        User.countOrder++;
    };

    $scope.totalItems = $scope.Users.length;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 3;
    $scope.maxSize = (($scope.Users.length / 3) + 1) ; //Number of pager buttons to show
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChange = function(pageNo) {
        $scope.totalItems = pageNo;
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
            controller: 'RegisterModalController'
        });
        modalInstance.result.then(function(newUser) {
            $scope.Users.push(newUser);
            $localstorage.setObject('f',$scope.Users);
            $scope.$watch('totalItems', function(newValue, oldValue) {
                $scope.pageChange($scope.Users.length);
            });
        });
    };
    $scope.openC = function() {

        var modalInstance = $modal.open({
            templateUrl: 'connect.html',
            controller: 'ConnectModalController'
        });
        modalInstance.result.then(function(conUser) {
            var promise = new Promise(function(resolve, reject) {
                // do f thing, possibly async, then…
                resolve("Stuff worked!",
                conUser.countConnect++,
                $localstorage.setObject('f',$scope.Users),
                $scope.User = $filter('filter')($scope.Users, { userName: conUser.u})[0],
                console.log($scope.User.userName),
                $scope.User.connected = 'true',
                $scope.User.countConnect ++,
                $localstorage.setObject('f',$scope.Users)
                //// $scope.Users.push(conUser);
                );

                reject(Error("It broke"));
            });
            promise.then(function(result) {
                console.log(result); // "Stuff worked!"
            }, function(err) {
                console.log(err); // Error: "It broke"
            });

        });
    };
});

// Please note that $modalInstance represents n modal window (instance) dependency.
// It is not the same as the $modal service used above.






