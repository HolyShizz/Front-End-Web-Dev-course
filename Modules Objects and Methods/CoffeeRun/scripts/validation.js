(function (window){
'use strict';
var App = window.App || {};
var Validation = {
    isCompanyEmail: function (email) {
        return /.+@gmail\.com$/.test(email);
    },
    isCoffeeDecaf: function (coffeeOrder, strengthLevel) {
        var decaf = /decaf$/.test(coffeeOrder);
        if (decaf && strengthLevel > 20) {
            return false;
        } else {
            return true;
        }
    }
}
App.Validation = Validation;
window.App = App;
}) (window);