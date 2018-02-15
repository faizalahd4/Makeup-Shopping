/**
* BASE CONTROLLER JS FILE
* @AUTHOR - FAIZAL
* @DATE - 07/02/2018
**/
(function () {
    define(['jquery'], function ($) {
        return ['$scope', '$controller', '$http', function ($scope, $controller, $http) {         

            /**
            * USED TO TOGGLE CLASS NAME
            * @INPUT - CLASSNAME AND EVENT
            * @OUTPUT - NA
            **/
            $scope.toggleClass = function (className, targetId) {
                /* JQUERY USED TO TOGGLE THE CLASSNAME */
                $("#" + targetId).toggleClass(className);
            };

        }];
    });
}());