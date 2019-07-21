(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    };

    CheckList.prototype.addClickHandler = function (fn) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            fn(email);
            console.log(email);
        }.bind(this));
    };

    CheckList.prototype.addButtClickHandler = function (fn) {
        this.$element.on("click", "button", function (event) {
            var email = event.target.value;
            fn(email);
            console.log(event);
        }.bind(this));
    }

    CheckList.prototype.reverseRow = function (data) {
        document.getElementById("emailInput").value = data["emailAdress"];
        document.getElementById("coffeeOrder").value = data["coffee"];
        document.querySelector('input[value='+ data["size"] +']').checked = true;
        document.getElementById("flavorShot").value = data["flavor"];
        document.getElementById("strengthLevel").value = data["strengthLevel"];
        document.getElementById("emailId").value = data["emailAdress"];
    }

    CheckList.prototype.addRow = function (coffeeOrder) {
        this.removeRow(coffeeOrder.emailAdress);
        this.removeRow(coffeeOrder.emailId);
        var rowElement = new Row(coffeeOrder);
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function (email) {
       this.$element
       .find('[value="' + email + '"]')
       .closest('[data-coffee-order="checkbox"]')
       .remove();
    };

    function Row(coffeeOrder) {
        var $div = $('<div></div>',  {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });

        var $label = $('<label></label>');

        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAdress
        });

        var description = ' [' + coffeeOrder.strength + 'x]';
        if (coffeeOrder.flavor) {
            description += ' ' + coffeeOrder.flavor + ' ';
        }
        description += coffeeOrder.size + ' ';
        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAdress + ') ';
        var $button = $('<button></button>',  {
            'class': 'btn btn-default',
            type: 'button',
            value: coffeeOrder.emailAdress
        })

        $label.append($checkbox);
        $label.append(description);
        $button.append("Change Order");
        $div.append($label);
        $div.append($button);
        $div.addClass(coffeeOrder.flavor);

        this.$element = $div;
    };

    App.CheckList = CheckList;
    window.App = App;
}) (window);