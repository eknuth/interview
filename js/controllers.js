(function() {
    'use strict';

    angular.module('interview.controllers', [])
        .controller('MainCtrl', ['$scope',
            function($scope) {
                $scope.items = [{
                    name: 'Item A',
                    score: 0
                }, {
                    name: 'Item B',
                    score: 1
                }, {
                    name: 'Item C',
                    score: 2
                }];
            }
        ]);

})();