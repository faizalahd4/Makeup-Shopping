/**
* CONSTANT SERVICE JS FILE
* @AUTHOR - FAIZAL
* @DATE - 07/02/2018
**/
(function () {
    define([], function () {
        return ['$location', function ($location) {
            var getGetAllProductURL = 'https://sephora-api-frontend-test.herokuapp.com/products',
            	getAllProductPrices = [{text: "Under $25", value: {gt: "", lt: 25}},
		                    {text: "$25 - $50", value: {gt: 25, lt: 50}},
		                    {text: "$50 - $100", value: {gt: 50, lt: 100}},
		                    {text: "$100 - $150", value: {gt: 100, lt: 150}},
		                    {text: "$150 - $300", value: {gt: 150, lt: 300}},
		                    {text: "Above $300", value: {gt: 300, lt: 1/0}}],
		        getSideMenus = [{text: "See all Makeup", value: "", breadCrumb: ['Makeup', 'Sell all Makeup']},
		                        {text: "Tools", value: "tools", breadCrumb: ['Makeup', 'Tools']},
		                        {text: "Brushes", value: "brushes", breadCrumb: ['Makeup', 'Brushes']}],
                constantService = {
                    /* GET ALL PRODUCT URL FUNCTION */
                    getGetAllProductURL: function () {
                        return getGetAllProductURL;
                    },
                    /* GET ALL PRODUCT PRICES */
                    getAllProductPrices: function () {
                        return getAllProductPrices;
                    },
                    /* SIDE MENUS */
                    getSideMenus: function () {
                        return getSideMenus;
                    }
                };
            return constantService;
        }];
    });

}());
