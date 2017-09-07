console.log('app.js is linked');
var app = angular.module('sampleApp', []);

// Directive for accepting only numeric input
app.directive('numericOnly', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render('hello');
                }

                return transformedInput;
            });
        }
    };
}).controller('CurrencyController', ['$scope', function($scope) {
}]);

// Formatting a numeric input as a phone number
app.controller('Ctrl', ['$scope', function($scope) {
  }]).filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        if (value.length <= 10) {
          country = 1;
          city = value.slice(0, 3);
          number = value.slice(3);
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});

// Summing 3 inputs
app.controller('SumCtrl', function($scope) {

    $scope.total = function() {
        var total = parseFloat($scope.txtAmount1 || 0) + parseFloat($scope.txtAmount2 || 0) +
                    parseFloat($scope.txtAmount3 || 0);
        return total || 0;
    }
});


// Moving cursor between input boxes
app.directive('moveFocus', function() {
    function getCaretPosition(elem) {
      // Firefox Caret Position
       return elem.setSelectionRange && elem.selectionStart;
     }

    return {
      restrict: 'A',
      link: function(scope, elem, attr) {
        var tabindex = parseInt(attr.tabindex);
        var maxlength = parseInt(attr.maxlength);

        elem.on('input, keydown', function(e) {
          var val = elem.val(),
              cp,
              code = e.which || e.keyCode;

          if (val.length === maxlength && [8, 37, 38, 39, 40, 46].indexOf(code) === -1) {
            var next = document.querySelectorAll('#input' + (tabindex + 1));
            next.length && next[0].focus();
            return;
          }

          cp = getCaretPosition(this);
          if ((cp === 0 && code === 46) || (cp === 1 && code === 8)) {
            var prev = document.querySelectorAll('#input' + (tabindex - 1));
            e.preventDefault();
            elem.val(val.substring(1));
            prev.length && prev[0].focus();
            return;
          }
        });
      }
    };
  });

//Ordering an array of objects by 2 properties- age and position
app.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }


    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return a - b;
    });

    return array;
 }
});

app.controller('OrderController', ['$scope', function ($scope) {
    $scope.orderByAttribute = '';

    $scope.testData = [
        {name: "Mark", position: "2", age: 33},
        {name: "Richard", position: "1", age: 29},
        {name: "Derek", position: "3", age: 35},
        {name: "Adam", position: "4", age: 30},
        {name: "Mira", position: "7", age: 33},
        {name: "Jones", position: "9", age: 29},
        {name: "Alison", position: "5", age: 35},
        {name: "Reed", position: "6", age: 30},
        {name: "April", position: "10", age: 25},
        {name: "Isobel", position: "8", age: 35},
        {name: "Alison", position: "12", age: 31},
        {name: "Matt", position: "13", age: 25},
        {name: "Cindy", position: "11", age: 26},
        {name: "Kat", position: "15", age: 28},
        {name: "Ali", position: "14", age: 33},
        {name: "Bill", position: "16", age: 26},
        {name: "John", position: "18", age: 30},
        {name: "Mary", position: "19", age: 31},
        {name: "Jack", position: "17", age: 29},
        {name: "Cristina", position: "20", age: 29},
        {name: "Chris", position: "23", age: 34},
        {name: "Preston", position: "21", age: 31},
        {name: "Riley", position: "22", age: 30},
        {name: "Jenny", position: "26", age: 26},
        {name: "Ben", position: "27", age: 27},
        {name: "Jill", position: "24", age: 24},
        {name: "Sherry", position: "25", age: 25},
        {name: "Shirley", position: "28", age: 28},
        {name: "Milan", position: "30", age: 30},
        {name: "Justin", position: "29", age: 29},
        {name: "Mark", position: "32", age: 33},
        {name: "Richard", position: "31", age: 29},
        {name: "Derek", position: "33", age: 35},
        {name: "Adam", position: "34", age: 30},
        {name: "Mira", position: "37", age: 33},
        {name: "Jones", position: "39", age: 29},
        {name: "Alison", position: "35", age: 35},
        {name: "Reed", position: "36", age: 30},
        {name: "April", position: "40", age: 25},
        {name: "Isobel", position: "38", age: 35},
        {name: "Alison", position: "42", age: 31},
        {name: "Matt", position: "43", age: 25},
        {name: "Cindy", position: "41", age: 26},
        {name: "Kat", position: "45", age: 28},
        {name: "Ali", position: "44", age: 33},
        {name: "Bill", position: "46", age: 26},
        {name: "John", position: "48", age: 30},
        {name: "Mary", position: "49", age: 31},
        {name: "Mary Ann", position: "47", age: 32},
        {name: "Megan", position: "50", age: 27}
	];
}]);
