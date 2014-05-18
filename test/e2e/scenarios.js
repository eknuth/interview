'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

    browser.get('index.html');

    it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
        expect(browser.getLocationAbsUrl()).toMatch('/');
    });


    describe('main view', function() {

        beforeEach(function() {
            browser.get('index.html#/');
        });


        it('should have some items', function() {
            var itemNames = [
                'Item C', 'Item B', 'Item A'
            ];
            var itemScores = [3, 2, 1]
            element.all(by.repeater('item in items')).then(function(rows) {
                rows.forEach(function(row, index) {
                    expect(row.getText()).toContain(itemNames[index]);
                    expect(row.getText()).toContain(itemScores[index]);
                });
            });
        });
    });
});