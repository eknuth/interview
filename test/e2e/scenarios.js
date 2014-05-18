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


        it('should have some items, sorted by score (desc) or name', function() {
            var itemNames = [
                'Item C', 'Item B', 'Item A'
            ];
            var itemScores = [3, 2, 1];

            var itemNamesSorted = [
                'Item A', 'Item B', 'Item C'
            ];
            var itemScoresSorted = [1, 2, 3];
            var sortByScoreBtn = element(by.css('.by-score'));
            var sortByNameBtn = element(by.css('.by-name'));

            // sort by score is the default
            element.all(by.repeater('item in items')).then(function(rows) {
                rows.forEach(function(row, index) {
                    expect(row.getText()).toContain(itemNames[index]);
                    expect(row.getText()).toContain(itemScores[index]);
                });
            });

            // sort by score is the default
            sortByNameBtn.click();
            element.all(by.repeater('item in items')).then(function(rows) {
                rows.forEach(function(row, index) {
                    expect(row.getText()).toContain(itemNamesSorted[index]);
                    expect(row.getText()).toContain(itemScoresSorted[index]);
                });
            });

            // switch back
            sortByScoreBtn.click();
            element.all(by.repeater('item in items')).then(function(rows) {
                rows.forEach(function(row, index) {
                    expect(row.getText()).toContain(itemNames[index]);
                    expect(row.getText()).toContain(itemScores[index]);
                });
            });
        });
    });
});