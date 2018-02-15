/**
* PRODUCT LISTING CONTROLLER JS FILE - USE TO IMPLEMENT PRODUCT LISTING CONTROLLER FEATURE AND HTTP FEATURE
* @AUTHOR - FAIZAL
* @DATE - 07/02/2018
**/
(function () {
    define(['jquery'], function ($) {
        return ['$scope', '$controller', '$http', 'constantService', 'utilService', function ($scope, $controller, $http, constantService, utilService) {         
        	$controller('baseController', {$scope: $scope});
        	$controller('productFilterController', {$scope: $scope});
        	
        	/* DECLARING SCOPE VARIABLE */
		    /* ALL PRODUCT SCOPE VARIABLE */
		    $scope.allProducts = [];
		    /* URL PARAM REQUEST (FILTER, SORT) */
		    $scope.paramRequest = {};
		    /* TYPE OF FILTER ACCESSED LASTLY */
		    $scope.filterType = "";
		    /* PRICE LISTING SCOPE VARIABLE */
		    $scope.prices = constantService.getAllProductPrices();
		    /* MAKEUP TYPES MENUS SCOPE VARIABLE */
		    $scope.typeMenus = constantService.getSideMenus();               

		    /**
		    * USE TO GET ALL PRODUCTS
		    * @INPUT - REQUEST
		    * @OUTPUT - NA
		    **/
		    $scope.getAllProducts = function (requestParam) {
		        /* CALLING PRODUCT ACTION WITH DATA TO FETCH DATA FROM DB */
		        $http.get(constantService.getGetAllProductURL() + requestParam).then(function(response) {
		            /* STORING RESPONSE DATA */
		            $scope.productListingOutput = response.data;
		            /* STORING DATA LIST */
		            $scope.allProducts = $scope.productListingOutput.data;
		            /* CHECKING WHETHER TO INITIATE PAGINATION FUNCTION */
		            if ($scope.filterType == "MAKEUP_FILTER" || $scope.filterType == "PRICE_RANGE_FILTER" || $scope.filterType == "PAGE_NO_FILTER") {
		                /* SETTING UP PAGINATION CALL */
		                $scope.setPagination($scope.productListingOutput);
		            }
		        });
		    };   

		    /**
		    * INIT METHOD
		    * @INPUT - NA
		    * @OUTPUT - NA
		    **/
		    $scope.initProductListing = function () {
		        /* RETRIEVE OLD DATA BEFORE REFRESH PAGE */
		        $scope.retrieveRequestParam();
		        /* CALLING ALL PRODUCT FUNCTION THROUGH SETPAGE FILTER CALL */ 
		        $scope.setPageSize($scope.pageSize); 
		    }; 

		    /**
		    * USED TO GENERATE BREADCRUMB ACCORDING TO THE MAKEUP TYPE SELECTED
		    * @INPUT - SELECTED MENU ARRAY
		    * @OUTPUT - NA
		    **/
		    $scope.generateBreadCrumb = function (menus) {
		        /* SAVING SELECTED MENUS IN SCOPE VARIABLE */
		        $scope.breadcrumbMenu = menus;
		        /* UPDATING THE LOCAL STORAGE VALUE*/
		        utilService.updateLocalStorage("breadcrumbMenu", JSON.stringify($scope.breadcrumbMenu));
		    };

		    /**
		    * USED TO GENERATE REQUEST PARAM AND UPDATE
		    * @INPUT - KEY AND VALUE
		    * @OUTPUT - REQUEST PARAM
		    **/
		    $scope.generateParam = function (key, value) {
		        /* LOCAL REQUEST VARIABLE SET */
		        var request = "";
		        /* CHECKING THE VALUE IS NOT INFINITE OR EMPTY */
		        if (value == Infinity || value == "" || value == null) {
		            /* REMOVING THE PROPERTY */
		            delete $scope.paramRequest[key];
		        } else {
		            /* UPDATING THE PROPERTY */
		            $scope.paramRequest[key] = value;    
		        }
		        /* LOOPING THE OBJECT */
		        for (var property in $scope.paramRequest) {
		            /* CHECKING WHETHER PROPERTY EXISTS OR NOT */
		            if ($scope.paramRequest.hasOwnProperty(property)) {
		                /* CHECKING WHETHER ALREADY GENERATED OR NOT TO ADD & OR NOT */
		                request = (request == "") ? "" : request + "&"; 
		                /* GENERATING THE REQUEST PARAM */
		                request += property + "=" + $scope.paramRequest[property];
		            }
		        }
		        /* UPDATING THE VALUE IN LOCAL STORAGE */
		        utilService.updateLocalStorage("requestParam", JSON.stringify($scope.paramRequest));
		        /* RETURNING THE GENERATED REQUEST PARAM */
		        return request;
		    };

		    /**
		    * USED TO RETRIEVE REQUEST PARAM ON REFRESH PAGE
		    * @INPUT - NA
		    * @OUTPUT - NA
		    **/
		    $scope.retrieveRequestParam = function () {
		        /* LOADING THE MAIN REQUEST PARAM */
		        $scope.paramRequest = (utilService.getLocalStorage("requestParam")) ? JSON.parse(utilService.getLocalStorage("requestParam")) : {};
		        /* FETCHING THE PAGE SIZE FROM REQUEST PARAM */
		        $scope.pageSize = ($scope.paramRequest["page[size]"]) ? $scope.paramRequest["page[size]"] : 6;
		        /* FETCHING THE SORT FROM REQUEST PARAM */
		        $scope.sortProduct = ($scope.paramRequest["sort"]) ? $scope.paramRequest["sort"] : "Best Selling";
		        /* FETCHING THE CURRENT PAGE NO FROM REQUEST PARAM */
		        $scope.currentPageNo = ($scope.paramRequest["page[number]"]) ? $scope.paramRequest["page[number]"] : 1;
		        /* FETCHING THE MAKEUP TYPE FROM LOCALSTORAGE */
		        $scope.currentMakeupType = (utilService.getLocalStorage("makeupType")) ? utilService.getLocalStorage("makeupType") : "";
		        /* FETCHING THE BREADCRUMB FROM LOCALSTORAGE */
		        $scope.breadcrumbMenu = (utilService.getLocalStorage("breadcrumbMenu")) ? JSON.parse(utilService.getLocalStorage("breadcrumbMenu")) : ["Makeup", "Sell all Makeup"];
		        /* FETCHING THE CURRENT PAGENO FROM LOCALSTORAGE */
		        $scope.pageNos = (utilService.getLocalStorage("pageNos")) ? JSON.parse(utilService.getLocalStorage("pageNos")) : [1, 2, 3];
		        /* FETCHING THE SELECTED PRICES FROM LOCALSTORAGE */
		        $scope.selectedPrices = (utilService.getLocalStorage("selectedPrices")) ? JSON.parse(utilService.getLocalStorage("selectedPrices")) : [];
		    }

		    /**
		    * USED TO RESET PAGE WHEN USER CHANGE MAKEUP TYPE MENUS, PRICE RANGE AND PAGE SIZE
		    * @INPUT - NA
		    * @OUTPUT - NA
		    **/
		    $scope.resetPage = function () {
		        /* UPDATING THE REQUEST PARAM PAGE NUMBER TO 1*/
		        $scope.paramRequest["page[number]"] = 1;
		        /* CHANGING CURRENT PAGE NO TO 1*/
		        $scope.currentPageNo = 1;
		    };

		    /* INITIATING ONLOAD OF THIS CONTROLLER */
		    $scope.initProductListing();

        }];
    });
}());