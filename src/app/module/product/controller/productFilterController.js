/**
* PRODUCT LISTING CONTROLLER JS FILE - USE TO IMPLEMENT PRODUCT LISTING CONTROLLER FEATURE AND HTTP FEATURE
* @AUTHOR - FAIZAL
* @DATE - 07/02/2018
**/
(function () {
    define(['jquery'], function ($) {
        return ['$scope', '$controller', '$http', 'constantService', 'utilService', function ($scope, $controller, $http, constantService, utilService) {         
        	
        	/**
		    * USED TO SET PRODUCT SIZE PER PAGE AND CALL ALL PRODUCT FUNCTION TO GET ALL PRODUCTS DETAILS
		    * @INPUT - PAGE SIZE
		    * @OUTPUT - NA
		    **/
		    $scope.setPageSize = function (pageSize) {
		        /* GENETRATING REQUEST PARAM AND UPDATING PAGESIZE OBJECT INSIDE MAIN REQUEST PARAM OBJECT */
		        var request = "?" + $scope.generateParam("page[size]", pageSize);
		        /* CHANGING THE FILTER TYPE NAME */
		        $scope.filterType = "PAGE_SIZE_FILTER";
		        /* RESETING THE PAGE MAJOR FILTER */
		        $scope.resetPage();
		        /* CALLING GET ALL PRODUCT FUNCTION USING GENERATED PARAM */
		        $scope.getAllProducts(request); 
		    };

		    /**
		    * USED TO SET SORT ORDER BY AND CALL ALL PRODUCT FUNCTION TO GET ALL PRODUCTS DETAILS
		    * @INPUT - PAGE SIZE
		    * @OUTPUT - NA
		    **/
		    $scope.setSortProduct = function (sortProduct) {
		        /* GENETRATING REQUEST PARAM AND UPDATING SORT ORDER BY OBJECT INSIDE MAIN REQUEST PARAM OBJECT */
		        var request = "?" + $scope.generateParam("sort", sortProduct);
		        /* CHANGING THE FILTER TYPE NAME */
		        $scope.filterType = "SORT_ORDER_FILTER";
		        /* CALLING GET ALL PRODUCT FUNCTION USING GENERATED PARAM */
		        $scope.getAllProducts(request); 
		    };

		    /**
		    * USED TO SET PAGINATION CURRENT PAGENO AND CALL ALL PRODUCT FUNCTION TO GET ALL PRODUCTS DETAILS
		    * @INPUT - PAGE SIZE
		    * @OUTPUT - NA
		    **/
		    $scope.setPageNo = function (pageNo) {
		        /* GENETRATING REQUEST PARAM AND UPDATING PAGIATION CURRENT PAGENO OBJECT INSIDE MAIN REQUEST PARAM OBJECT */
		        var request = "?" + $scope.generateParam("page[number]", pageNo);
		        /* CHANGING THE FILTER TYPE NAME */
		        $scope.filterType = "PAGE_NO_FILTER";
		        /* UPDATING THE CURRENT PAGE NO IN SCOPE VARIABLE */
		        $scope.currentPageNo = pageNo;
		        /* CALLING GET ALL PRODUCT FUNCTION USING GENERATED PARAM */
		        $scope.getAllProducts(request); 
		        /* CHECKING WHETHER NEXT PAGE IS AVAILABLE */
		        if ($scope.pageNos[$scope.pageNos.length - 1] < pageNo) {
		            /* PUSHING NEW PAGE NO FROM THE END OF THE ARRAY */
		            $scope.pageNos.push(pageNo);
		            /* DELETING THE OLD PAGE NO FROM THE BEGINNING OF THE ARRAY */
		            $scope.pageNos.shift();
		        /* CHECKING WHETHER PREVIOUS PAGE AVAILABLE */
		        } else if ($scope.pageNos[0] > pageNo) {
		            /* PUSHING NEW PAGE NO FROM THE BEGINNING OF THE ARRAY */
		            $scope.pageNos.unshift(pageNo);
		            /* DELETING THE OLD PAGE NO FROM THE END OF THE ARRAY */
		            $scope.pageNos.pop();
		        }
		        /* UPDATING THE VALUE IN LOCAL STORAGE */
		        utilService.updateLocalStorage("pageNos", JSON.stringify($scope.pageNos));
		    };


		    /**
		    * USED TO SET CURRENT MAKEUP TYPE SELECTED AND CALL ALL PRODUCT FUNCTION TO GET ALL PRODUCTS DETAILS
		    * @INPUT - PAGE SIZE
		    * @OUTPUT - NA
		    **/
		    $scope.setMakeupType = function (value, type, $event) {
		        /* CHANGING THE FILTER TYPE NAME */
		        $scope.filterType = "MAKEUP_FILTER";
		        /* UPDATING SELECTED MAKEUP TYPE IN SCOPE VARIABLE */
		        $scope.currentMakeupType = value;
		        /* RESETTING THE PAGE */
		        $scope.resetPage();
		        /* GENETRATING REQUEST PARAM AND UPDATING MAKEUP TYPE SELECTED OBJECT INSIDE MAIN REQUEST PARAM OBJECT */
		        var request = "?" + $scope.generateParam("filter[category_in]", value);
		        /* CALLING GET ALL PRODUCT FUNCTION USING GENERATED PARAM */
		        $scope.getAllProducts(request); 
		        /* UPDATING THE VALUE IN LOCAL STORAGE */
		        utilService.updateLocalStorage("makeupType", value); 
		    };

		    /**
		    * USED TO SET PRICE RANGE AND CALL ALL PRODUCT FUNCTION TO GET ALL PRODUCTS DETAILS
		    * @INPUT - NA
		    * @OUTPUT - NA
		    **/
		    $scope.setPriceRange = function () {
		        /* LOCAL REQUEST VARIABLE SET */
		        var request = "";
		        /* CHANGING THE FILTER TYPE NAME */
		        $scope.filterType = "PRICE_RANGE_FILTER";
		        /* RESETTING THE PAGE */
		        $scope.resetPage();
		        /* MAPPING LESS THAN VALUES IN ONE ARRAY */
		        var ltValues = $scope.selectedPrices.map(function (obj) {
		            return obj.lt;
		        });
		        /* MAPPING GREATER THAN VALUES IN ONE ARRAY */
		        var gtValues = $scope.selectedPrices.map(function (obj) {
		            return obj.gt;
		        });
		        /* CHECKING WHETHER SELECTED PRICE RANGE IS NOT EMPTY */
		        if ($scope.selectedPrices.length == 0) {
		            /* UPDATING PRICE_LT OBJECT INSIDE MAIN REQUEST PARAM OBJECT AS INFINITE TO REMOVE FROM THE MAIN PARAM */
		            $scope.generateParam("filter[price_lt]", Infinity);
		            /* UPDATING PRICE_GT OBJECT INSIDE MAIN REQUEST PARAM OBJECT AS INFINITE TO REMOVE FROM THE MAIN PARAM */
		            request = "?" + $scope.generateParam("filter[price_gt]", Infinity);
		        } else {
		            /* GENETRATING REQUEST PARAM AND UPDATING PRICE_LT OBJECT INSIDE MAIN REQUEST PARAM OBJECT */
		            $scope.generateParam("filter[price_lt]", Math.max.apply(null, ltValues));
		            /* GENETRATING REQUEST PARAM AND UPDATING PRICE_GT OBJECT INSIDE MAIN REQUEST PARAM OBJECT */
		            request = "?" + $scope.generateParam("filter[price_gt]", Math.min.apply(null, gtValues));
		        }
		        /* CALLING GET ALL PRODUCT FUNCTION USING GENERATED PARAM */
		        $scope.getAllProducts(request);
		        /* UPDATING THE VALUE IN LOCAL STORAGE */
		        utilService.updateLocalStorage("selectedPrices", JSON.stringify($scope.selectedPrices)); 
		    };

		    /**
		    * USED TO SET PAGINATION WHILE USER CHANGE MAKEUP TYPE MENUS, PRICE RANGE AND PAGE SIZE
		    * @INPUT - RESPONSE
		    * @OUTPUT - NA
		    **/
		    $scope.setPagination = function (response) {
		        /* DEFAULT PAGE SIZE 1*/
		        $scope.pageNos = [1];
		        /* CHECKING WHETHER LINKS EXISTS OR NOT */
		        if (response.links && response.links.last) {
		            /* URL OBJECT CREATED */
		            var url = new URL(response.links.last);
		            /* FETCHING THE PAGE NUMBER PARAM */
		            var pages = url.searchParams.get("page[number]");
		            /* CREATING PAGE NO ARRAY */
		            $scope.pageNos = (pages > 2) ? [1, 2, 3] : ((pages == 2) ? [1, 2] : [1]);
		        }
		        /* UPDATING THE VALUE IN LOCAL STORAGE */
		        utilService.updateLocalStorage("pageNos", JSON.stringify($scope.pageNos));
		    };

        }];
    });
}());