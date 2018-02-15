/**
* PRODUCT LISTING CONTROLLER JS FILE - USE TO IMPLEMENT PRODUCT LISTING CONTROLLER FEATURE AND HTTP FEATURE
* @AUTHOR - FAIZAL
* @DATE - 07/02/2018
**/

/* BOOSTRAPING THE ANGULAR MODULE */
var app = angular.module('myApp', ["checklist-model"]);

/* DECLARING PRODUCT LISTING CONTROLLER - STARTS */
app.controller('productListingCtrl', function($scope, $http) {
    
    /* DECLARING SCOPE VARIABLE */
    /* ALL PRODUCT SCOPE VARIABLE */
    $scope.allProducts = [];
    /* URL PARAM REQUEST (FILTER, SORT) */
    $scope.paramRequest = {};
    /* TYPE OF FILTER ACCESSED LASTLY */
    $scope.filterType = "";
    /* PRICE LISTING SCOPE VARIABLE */
    $scope.prices = [{text: "Under $25", value: {gt: "", lt: 25}},
                    {text: "$25 - $50", value: {gt: 25, lt: 50}},
                    {text: "$50 - $100", value: {gt: 50, lt: 100}},
                    {text: "$100 - $150", value: {gt: 100, lt: 150}},
                    {text: "$150 - $300", value: {gt: 150, lt: 300}},
                    {text: "Above $300", value: {gt: 300, lt: 1/0}}];
    /* MAKEUP TYPES MENUS SCOPE VARIABLE */
    $scope.typeMenus = [{text: "See all Makeup", value: "", breadCrumb: ['Makeup', 'Sell all Makeup']},
                        {text: "Tools", value: "tools", breadCrumb: ['Makeup', 'Tools']},
                        {text: "Brushes", value: "brushes", breadCrumb: ['Makeup', 'Brushes']},
                        {text: "Eyes", value: "tools", breadCrumb: ['Makeup', 'Eyes']},
                        {text: "Lips", value: "brushes", breadCrumb: ['Makeup', 'Lips']},
                        {text: "Nails", value: "tools", breadCrumb: ['Makeup', 'Nails']}]                

    /**
    * USE TO GET ALL PRODUCTS
    * @INPUT - REQUEST
    * @OUTPUT - NA
    **/
    $scope.getAllProducts = function (requestParam) {
        /* CALLING PRODUCT ACTION WITH DATA TO FETCH DATA FROM DB */
        $http.get('https://sephora-api-frontend-test.herokuapp.com/products' + requestParam).then(function(response) {
            /* STORING RESPONSE DATA */
            $scope.productListingOutput = response.data;
            /* CHECKING WHETHER RESPONSE IS EMPTY OR NOT */
            if (response.data && response.data.length > 0) {
                /* STORING DATA LIST */
                $scope.allProducts = $scope.productListingOutput.data;
            }
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
        var request = $scope.retrieveRequestParam();
        /* CALLING ALL PRODUCT FUNCTION THROUGH SETPAGE FILTER CALL */ 
        $scope.setPageSize($scope.pageSize); 
    }; 

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
    * USED TO GENERATE BREADCRUMB ACCORDING TO THE MAKEUP TYPE SELECTED
    * @INPUT - SELECTED MENU ARRAY
    * @OUTPUT - NA
    **/
    $scope.generateBreadCrumb = function (menus) {
        /* SAVING SELECTED MENUS IN SCOPE VARIABLE */
        $scope.breadcrumbMenu = menus;
        /* UPDATING THE LOCAL STORAGE VALUE*/
        localStorage.setItem("breadcrumbMenu", JSON.stringify($scope.breadcrumbMenu));
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
        localStorage.setItem("pageNos", JSON.stringify($scope.pageNos));
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
        $scope.currentMakeupType = type;
        /* RESETTING THE PAGE */
        $scope.resetPage();
        /* GENETRATING REQUEST PARAM AND UPDATING MAKEUP TYPE SELECTED OBJECT INSIDE MAIN REQUEST PARAM OBJECT */
        var request = "?" + $scope.generateParam("filter[category_in]", value);
        /* CALLING GET ALL PRODUCT FUNCTION USING GENERATED PARAM */
        $scope.getAllProducts(request); 
        /* UPDATING THE VALUE IN LOCAL STORAGE */
        localStorage.setItem("makeupType", type); 
    };

    /**
    * USED TO TOGGLE SECTION BY SLIDE UP AND DOWN
    * @INPUT - TARGETID AND EVENT
    * @OUTPUT - NA
    **/
    $scope.toggleSection = function (targetId, $event) {
        /* USING JQUERY TO SLIDE TOGGLE UP AND DOWN*/
        $(targetId).slideToggle("slow");
    };

    /**
    * USED TO TOGGLE CLASS NAME
    * @INPUT - CLASSNAME AND EVENT
    * @OUTPUT - NA
    **/
    $scope.toggleClass = function (className, $event) {
        /* JQUERY USED TO TOGGLE THE CLASSNAME */
        $($event.target).toggleClass(className);
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
        localStorage.setItem("selectedPrices", JSON.stringify($scope.selectedPrices)); 
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
        if (value == Infinity || value == "") {
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
        localStorage.setItem("requestParam", JSON.stringify($scope.paramRequest));
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
        $scope.paramRequest = (localStorage.getItem("requestParam")) ? JSON.parse(localStorage.getItem("requestParam")) : {};
        /* FETCHING THE PAGE SIZE FROM REQUEST PARAM */
        $scope.pageSize = ($scope.paramRequest["page[size]"]) ? $scope.paramRequest["page[size]"] : 6;
        /* FETCHING THE SORT FROM REQUEST PARAM */
        $scope.sortProduct = ($scope.paramRequest["sort"]) ? $scope.paramRequest["sort"] : "Best Selling";
        /* FETCHING THE CURRENT PAGE NO FROM REQUEST PARAM */
        $scope.currentPageNo = ($scope.paramRequest["page[number]"]) ? $scope.paramRequest["page[number]"] : 1;
        /* FETCHING THE MAKEUP TYPE FROM LOCALSTORAGE */
        $scope.currentMakeupType = (localStorage.getItem("makeupType")) ? localStorage.getItem("makeupType") : "Sell all Makeup";
        /* FETCHING THE BREADCRUMB FROM LOCALSTORAGE */
        $scope.breadcrumbMenu = (localStorage.getItem("breadcrumbMenu")) ? JSON.parse(localStorage.getItem("breadcrumbMenu")) : ["Makeup", "Sell all Makeup"];
        /* FETCHING THE CURRENT PAGENO FROM LOCALSTORAGE */
        $scope.pageNos = (localStorage.getItem("pageNos")) ? JSON.parse(localStorage.getItem("pageNos")) : [1, 2, 3];
        /* FETCHING THE SELECTED PRICES FROM LOCALSTORAGE */
        $scope.selectedPrices = (localStorage.getItem("selectedPrices")) ? JSON.parse(localStorage.getItem("selectedPrices")) : [];
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
        localStorage.setItem("pageNos", JSON.stringify($scope.pageNos));
    };

    /* INITIATING ONLOAD OF THIS CONTROLLER */
    $scope.initProductListing();
    
});
/* DECLARING PRODUCT LISTING CONTROLLER - ENDS */


app.config(function ($provide, $httpProvider) {  
  /*  INTERCEPT HTTP CALLS */
  $provide.factory('MyHttpInterceptor', function ($q) {
    return {
      /*  ON REQUEST SUCCESS */
      request: function (config) {
        /* FADEIN THE LOADER */
        $("#loader").fadeIn();
        /*  RETURN THE CONFIG OR WRAP IT IN A PROMISE IF BLANK */
        return config || $q.when(config);
      },

      /* ON REQUEST FAILURE */
      requestError: function (rejection) {
        /* FADEOUT THE LOADER */
        $("#loader").fadeOut();
        /* RETURN THE PROMISE REJECTION */
        return $q.reject(rejection);
      },

      /* ON RESPONSE SUCCESS */
      response: function (response) {
        /* FADEOUT THE LOADER */
        $("#loader").fadeOut();
        /* RETURN THE RESPONSE OR PROMISE */
        return response || $q.when(response);
      },

      /* ON RESPONSE FAILURE */
      responseError: function (rejection) {
        /* FADEOUT THE LOADER */
        $("#loader").fadeOut();
        /* RETURN THE PROMISE REJECTION */
        return $q.reject(rejection);
      }
    };
  });

  /* ADD THE INTERCEPTOR TO THE $HTTPPROVIDER */
  $httpProvider.interceptors.push('MyHttpInterceptor');

});