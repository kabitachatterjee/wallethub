console.log('app.js is linked');
var app = angular.module('sampleApp', []);


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

app.controller('Ctrl', ['$scope', function($scope) {
  //$scope.phoneNumber = 6503078070;
}]).filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});
app.controller('SumCtrl', function($scope) {

    $scope.total = function() {
        var total = parseFloat($scope.txtAmount1 || 0) + parseFloat($scope.txtAmount2 || 0) +
                    parseFloat($scope.txtAmount3 || 0);
        return total || 0;
    }
});

// app.directive("limitTo", [function() {
//     return {
//         restrict: "A",
//         link: function(scope, elem, attrs) {
//             var limit = parseInt(attrs.limitTo);
//             angular.element(elem).on("keypress", function(e) {
//                 if (this.value.length == limit) e.preventDefault();
//             });
//         }
//     }
// }]);

app.directive('moveFocus', function() {
    function getCaretPosition(elem) {
      // Internet Explorer Caret Position
      if (document.selection && document.selection.createRange) {
        var range = document.selection.createRange();
        var bookmark = range.getBookmark();
        return bookmark.charCodeAt(2) - 2;
      }

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
        {name: "Alison", position: "13", age: 25}
	];
}]);
