(function() {
    'use strict';

    /* jasmine specs for controllers go here */

    describe('controllers', function() {
        // save references
        var scope, mainCtrl, _items;

        beforeEach(module('interview.controllers'));

        beforeEach(inject(function($controller, items) {
            scope = {};
            _items = items;

            // items mock.
            spyOn(items, 'getAll').andCallFake(function() {
                return [{
                    name: 'Item A',
                    score: 1
                }, {
                    name: 'Item B',
                    score: 2
                }, {
                    name: 'Item C',
                    score: 3
                }];
            });

            mainCtrl = $controller('MainCtrl', {
                $scope: scope,
                items: items
            });
        }));

        it('should instantiate a controller with some items', inject(function() {
            // we have a controller with some mock items
            expect(mainCtrl).toBeDefined();
            expect(scope.items.length).toBe(3);

            // our mock service has been called
            expect(_items.getAll).toHaveBeenCalled();
        }));

        it('should allow the item score to be increased and decreased', inject(function () {
            var item = {
                name: 'test item',
                score: 0
            };
            expect(item.score).toBe(0);

            scope.upvote(item);
            expect(item.score).toBe(1);
            scope.upvote(item);
            expect(item.score).toBe(2);

            scope.downvote(item);
            expect(item.score).toBe(1);
            scope.downvote(item);
            expect(item.score).toBe(0);
            scope.downvote(item);
            expect(item.score).toBe(-1);
        }));

        it('should allow a new item to be staged', inject(function () {
            expect(scope.newItem).toBeUndefined();
            scope.startAddingItem();
            expect(scope.newItem).toBeDefined();
            expect(scope.newItem.score).toBe(0);
            expect(scope.newItem.name).toBe(null);

        }));

        it('should allow a new item to be added to the list', inject(function () {
            expect(scope.items.length).toBe(3);

            scope.addNewItem({
                name: 'New Item',
                score: 0
            });

            expect(scope.items.length).toBe(4);
            expect(scope.items[0].name).toBe('New Item');
            expect(scope.items[0].score).toBe(0);
            expect(scope.newItem).toBeUndefined();
        }));
    });
})();
