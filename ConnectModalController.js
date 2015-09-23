/**
 * Created by Ariel on 23/09/2015.
 */
app.controller('ConnectModalController',function($scope,$modalInstance ){
    $scope.okC = function() {
        $modalInstance.close({'u' : $scope.username
        });
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});