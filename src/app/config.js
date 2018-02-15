/**
* CONFIG JS FILE
* @AUTHOR - FAIZAL
* @DATE - 07/02/2018
**/
(function () {
    requirejs.config({
        /* BY DEFAULT LOAD ANY MODULE IDS FROM JS/LIB */
        baseUrl: 'src',
        /* EXCEPT, IF THE MODULE ID STARTS WITH "APP",
           LOAD IT FROM THE JS/APP DIRECTORY. PATHS
           CONFIG IS RELATIVE TO THE BASEURL, AND
           NEVER INCLUDES A ".JS" EXTENSION SINCE
           THE PATHS CONFIG COULD BE FOR A DIRECTORY. */
        paths: {
            jquery: 'assets/script/lib/jquery',
            angular: 'assets/script/lib/angular',
            commonRouter: 'app/router',
            baseController: 'app/shared/controller/baseController',
            ajaxErrorHandler: 'app/shared/service/ajaxErrorHandler',
            constantService: 'app/shared/service/constantService',
            utilService: 'app/shared/service/utilService',
            productListingController: 'app/module/product/controller/productListingController',
            productFilterController: 'app/module/product/controller/productFilterController',
            angularCheckList: 'assets/script/lib/angular-checklist-model',
            alertPopup: 'assets/script/plugin/alert-popup',
            uiRouter: 'assets/script/lib/angular-ui-router',
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'jquery': {
                exports: 'jquery'
            },
            'alertPopup': {
                deps: ['jquery']
            },
            'commonRouter': {
                deps: ['uiRouter']
            },
            'uiRouter': {
                deps: ['angular']
            },
            'angularCheckList': {
                deps: ['angular']    
            }
        }
    });
    /* BOOTSTRAPING THE MODULE */
    requirejs(['commonRouter'], function (commonRouter) {
        commonRouter.init();
    });

}());