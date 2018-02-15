/**
* UTIL SERVICE
* @AUTHOR - FAIZAL
* @DATE - 07/02/2018
**/
(function () {
    define(['jquery'], function ($) {
        return [function () {
            function updateLocalStorage(key, value) {
                return localStorage.setItem(key, value);
            }

            function getLocalStorage(key) {
                return localStorage.getItem(key);
            }

            function removeLocalStorage(key) {
                localStorage.removeItem(key);
            }

            return {
                updateLocalStorage: function (key, value) {
                    return updateLocalStorage(key, value);
                },
                getLocalStorage: function (key) {
                    return getLocalStorage(key);
                },
                clearLocalStorage: function () {
                    return clearLocalStorage();
                }
            };
        }];
    });
}());
