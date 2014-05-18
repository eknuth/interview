(function() {
    'use strict';

    angular.module('interview.controllers', [])
        .controller('MainCtrl', ['$scope',
            function($scope) {
                $scope.items = [{
                    name: 'Item A',
                    score: 1
                }, {
                    name: 'Item B',
                    score: 2
                }, {
                    name: 'Item C',
                    score: 3
                }];

                $scope.orderBy = '-score';
            }
        ]);

})();