/**
* AJAX ERROR HANDLER JS FILE
* @AUTHOR - FAIZAL
* @DATE - 07/02/2018
**/
(function () {
    define(['jquery'], function ($) {
        return ['$q', function ($q) {
            var globalAjaxErrorHandler = {
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
                    /* SHOWING ERROR MESSAGE */
                    $(".error-alert").alertpopup({msg: "Please try again later.", type: "ERROR"});
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
                    /* SHOWING ERROR MESSAGE */
                    $(".error-alert").alertpopup({msg: "Please try again later.", type: "ERROR"});
                    /* RETURN THE PROMISE REJECTION */
                    return $q.reject(rejection);
                  }
                };
            return globalAjaxErrorHandler;
        }];
    });
}());
