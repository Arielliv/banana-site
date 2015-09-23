/**
 * Created by Ariel on 23/09/2015.
 */
app.controller('RegisterModalController',function($scope,$modalInstance ){
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
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
