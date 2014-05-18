(function() {
    'use strict';

    /* jasmine specs for controllers go here */

    describe('controllers', function() {
        var scope, mainCtrl;
        beforeEach(module('interview.controllers'));
        beforeEach(inject(function($controller) {
            scope = {};
            mainCtrl = $controller('MainCtrl', {
                $scope: scope
            });
        }));

        it('should instantiate a controller with some items', inject(function() {
            expect(mainCtrl).toBeDefined();
            expect(scope.items.length).toBe(3);
        }));
    });
})();
