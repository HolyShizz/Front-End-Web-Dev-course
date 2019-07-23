(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }

        FormHandler.prototype.addSubmitHandler = function (fn) {
            console.log('Setting submit handler for form');
            this.$formElement.on('submit', function (event) {
                event.preventDefault();
                var data = {};
                $(this).serializeArray().forEach(function (item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                fn(data);
                this.reset();
            });
        };

        FormHandler.prototype.addInputHandler = function (fn) {
            console.log('Setting input handler for form');
            this.$formElement.on('input', '[name="emailAddress"]', function (event) {
                var emailAddress = event.target.value;
                var message = '';
                if (fn(emailAddress)) {
                    event.target.setCustomValidity('');
                } else {
                    message = emailAddress + ' is not an authorized email address!';
                    event.target.setCustomValidity(message);
                }
            });
        }
        FormHandler.prototype.addInputHandlerDecaf = function (fn) {
            var coffeeOrder = document.getElementById("coffeeOrder").value;
            var strengthLevel = document.getElementById("strengthLevel").value;
            var message = '';
            console.log('Setting decaf validation');
            this.$formElement.on('input', '[name="coffee"]', function (event) {
                coffeeOrder = event.target.value;
                if (fn(coffeeOrder, strengthLevel)) {
                    event.target.setCustomValidity('');
                } else {
                    message = coffeeOrder + ' contains too much caffeine';
                    event.target.setCustomValidity(message);
                }
            });
            this.$formElement.on('change', '[name="strength"]', function (event) {
                strengthLevel = event.target.value;
                if (fn(coffeeOrder, strengthLevel)) {
                    event.target.setCustomValidity('');
                } else {
                    message = strengthLevel + ' is too much caffeine for ' + coffeeOrder;
                    event.target.setCustomValidity(message);
                };
            })
        }
    }
    App.FormHandler = FormHandler;
    window.App = App;
})(window);