(function() {
    'use strict';

    angular.module('interview.controllers', ['interview.services'])
        .controller('MainCtrl', ['$scope', 'items',
            function($scope, items) {
                // get items from service, will be []
                $scope.items = items.getAll();

                // set flag to enable/disable buttons
                $scope.addingNewItem = false;

                // sort by score desc default
                $scope.orderBy = '-score';

                // methods for rating items
                $scope.upvote = function (item) {
                    item.score++;
                };
                $scope.downvote = function (item) {
                    item.score--;
                };

                // set up a new item
                $scope.startAddingItem = function () {
                    $scope.addingNewItem = true;
                    $scope.newItem = {
                        name: null,
                        score: 0
                    };
                };

                // add new item to the list
                $scope.addNewItem = function (item) {
                    $scope.addingNewItem = false;
                    $scope.items.unshift(angular.copy(item));
                    delete $scope.newItem;
                };
            }
        ]);

})();