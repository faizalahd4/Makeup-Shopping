/**
* ROUTER JS FILE
* @AUTHOR - FAIZAL
* @DATE - 07/02/2018
**/
(function () {
    /* DEFINING THE MODULE */
    define([
        'jquery',
        'angular',
        'constantService',
        'baseController',
        'productListingController',
        'productFilterController',
        'ajaxErrorHandler',
        'utilService',
        'alertPopup',
        'uiRouter',
        'angularCheckList'
    ], function (jquery, angular, constantService, baseController, productListingController, productFilterController, ajaxErrorHandler, utilService) {
        /* DECLARING THE ANGULAR MODULE */
        var app = angular.module('myApp', ['ui.router', 'checklist-model']);

        /* BOOSTRAPING THE ANGULAR MODULE */
        app.init = function () {
            angular.bootstrap(document, ['myApp']);
        };

        /* ANGULAR CONFIGURATION - STARTS */
        app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 
        	function ($stateProvider, $urlRouterProvider, $httpProvider) {
        	
            /* ANGULAR ROUTER FOR PRODUCTS PAGE */
            $urlRouterProvider.when("/products", "/products");
            /* ANGULAR ROUTER FOR DEFAULT PAGE */
            $urlRouterProvider.otherwise("/");

            /* HEADER LAYOUT - STARTS */
            var header = {
			   templateUrl: 'src/view/layout/header.html'
			}
            /* HEADER LAYOUT - ENDS */

            /* FOOTER LAYOUT - STARTS */
			var footer = {
			   templateUrl: 'src/view/layout/footer.html'
			}
            /* FOOTER LAYOUT - ENDS */

            /* HTTP INTERCEPTORS */
            $httpProvider.interceptors.push('ajaxErrorHandler');

            /* STATE PROVIDER - STARTS */
            $stateProvider.state('home', {
                url: "/",
                views: {
                	header: header,
	               	content: {
	                    templateUrl: 'src/view/module/product/product-listing.html',
                		controller: 'productListingController'
	                },
	                footer: footer,
	            }
            });
            /* STATE PROVIDER - ENDS */
        }]);
        /* ANGULAR CONFIGURATION - ENDS */

        /* ANGULAR CONTROLLER */
        app.controller('baseController', baseController);
        app.controller('productListingController', productListingController);
        app.controller('productFilterController', productFilterController);

        /* ANGULAR FACTORY */
        app.factory("ajaxErrorHandler", ajaxErrorHandler);
        app.factory("constantService", constantService);
        app.factory("utilService", utilService);
        return app;
    });
}());