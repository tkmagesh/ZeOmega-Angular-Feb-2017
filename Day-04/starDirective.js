<body ng-app="starDirective" ng-controller="starCtrl">
  Rating is {{rating}} <br/>
  Clickable Rating <br/>
  <div star-rating rating-value="rating" max="10" on-rating-selected="saveRatingToServer(rating)"></div>
  <br/>
  Readonly rating <br/>
  <div fundoo-rating rating-value="rating" max="10" readonly="true"></div>
</body>

.rating{
  color: #a9a9a9;
  margin: 0;
  padding: 0;
}

ul.rating {
  display: inline-block;
}

.rating li {
  list-style-type: none;
  display: inline-block;
  padding: 1px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}

.rating .filled {
  color: #21568b;
}

angular.module('starDirective', [])
  .controller('starCtrl', function($scope, $window) {
    $scope.rating = 5;
    $scope.saveRatingToServer = function(rating) {
      $window.alert('Rating selected - ' + rating);
    };
  })
  .directive('starRating', function () {
    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                    '\u2605' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=',
        max: '=',
        readonly: '@',
        onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {

        var updateStars = function() {
          scope.stars = [];
          for (var  i = 0; i < scope.max; i++) {
            scope.stars.push({filled: i < scope.ratingValue});
          }
        };

        scope.toggle = function(index) {
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
          scope.ratingValue = index + 1;
          scope.onRatingSelected({rating: index + 1});
        };

        scope.$watch('ratingValue', function(oldVal, newVal) {
          if (newVal) {
            updateStars();
          }
        });
      }
    }
  });