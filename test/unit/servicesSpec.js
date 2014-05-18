(function() {
    'use strict';

    describe('item service service', function() {
        beforeEach(module('interview.services'));


        describe('items', function() {
            it('getAll: should return an empty list', inject(function(items) {
                expect(items.getAll()).toEqual([]);
            }));
        });
    });
})();