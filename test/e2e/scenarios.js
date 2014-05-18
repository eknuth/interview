'use strict';

describe('my app', function() {
    beforeEach(function() {
        // inject a mock serice for items
        browser.addMockModule('interview.services', function() {
            angular.module('interview.services', [])
                .factory('items', function() {
                    return {
                        getAll: function() {
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
                        }
                    };
                });
        });
        browser.get('index.html');
    });

    it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
        expect(browser.getLocationAbsUrl()).toMatch('/');
    });


    describe('main view', function() {




        it('should have some items, sorted by score (desc) or name', function() {
            var itemNames = [
                'Item C', 'Item B', 'Item A'
            ];
            var itemScores = ['3', '2', '1'];

            var itemNamesSorted = [
                'Item A', 'Item B', 'Item C'
            ];
            var itemScoresSorted = ['1', '2', '3'];
            var sortByScoreBtn = element(by.css('.btn-by-score'));
            var sortByNameBtn = element(by.css('.btn-by-name'));

            // sort by score is the default
            element.all(by.repeater('item in items')).then(function(rows) {
                rows.forEach(function(row, index) {
                    expect(row.findElement(by.css('.item-score'))
                        .getText()).toBe(itemScores[index]);
                    expect(row.findElement(by.css('.item-name'))
                        .getText()).toBe(itemNames[index]);
                });
            });

            // sort by score is the default
            sortByNameBtn.click();
            element.all(by.repeater('item in items')).then(function(rows) {
                rows.forEach(function(row, index) {
                    expect(row.findElement(by.css('.item-score'))
                        .getText()).toBe(itemScoresSorted[index]);
                    expect(row.findElement(by.css('.item-name'))
                        .getText()).toBe(itemNamesSorted[index]);
                });
            });

            // switch back
            sortByScoreBtn.click();
            element.all(by.repeater('item in items')).then(function(rows) {
                rows.forEach(function(row, index) {
                    expect(row.findElement(by.css('.item-score'))
                        .getText()).toBe(itemScores[index]);
                    expect(row.findElement(by.css('.item-name'))
                        .getText()).toBe(itemNames[index]);
                });
            });
        });

        it('should allow the score to be increased or decreased', function() {
            var upvoteBtn = element(by.css('.btn-upvote'));
            var downvoteBtn = element(by.css('.btn-downvote'));
            var score = element(by.css('.item-score'));

            element.all(by.repeater('item in items')).then(function(rows) {
                upvoteBtn = rows[0].findElement(by.css('.btn-upvote'));
                downvoteBtn = rows[0].findElement(by.css('.btn-downvote'));
                score = rows[0].findElement(by.css('.item-score'));

                // initial score
                expect(score.getText()).toBe('3');

                // upvote
                upvoteBtn.click();
                expect(score.getText()).toBe('4');
                upvoteBtn.click();
                expect(score.getText()).toBe('5');

                // downvote
                downvoteBtn.click();
                expect(score.getText()).toBe('4');
                downvoteBtn.click();
                expect(score.getText()).toBe('3');
            });
        });

        it('should allow a new item to be added', function() {
            var addBtn = element(by.css('.btn-add'));
            var sortByScoreBtn = element(by.css('.btn-by-score'));
            var sortByNameBtn = element(by.css('.btn-by-name'));
            var nameInput = element(by.input('newItem.name'));
            var items = element.all(by.repeater('item in items'));

            // all buttons should be disabled by default
            expect(addBtn.isEnabled()).toBeTruthy();
            expect(sortByScoreBtn.isEnabled()).toBeTruthy();
            expect(sortByNameBtn.isEnabled()).toBeTruthy();

            // input should be hidden
            expect(nameInput.isDisplayed()).toBeFalsy();

            // should have three items
            expect(items.count()).toBe(3);

            // clicking add button, disabled other buttons
            addBtn.click();
            expect(nameInput.isDisplayed()).toBeTruthy();
            expect(addBtn.isEnabled()).toBeFalsy();
            expect(sortByScoreBtn.isEnabled()).toBeFalsy();
            expect(sortByNameBtn.isEnabled()).toBeFalsy();

            // entering a name, submitting adds item
            nameInput.sendKeys('a new item\n');
            expect(nameInput.isDisplayed()).toBeFalsy();
            expect(addBtn.isEnabled()).toBeTruthy();
            expect(sortByScoreBtn.isEnabled()).toBeTruthy();
            expect(sortByNameBtn.isEnabled()).toBeTruthy();

            // should have four items
            expect(items.count()).toBe(4);
            expect(items.last().findElement(by.css('.item-name'))
                .getText()).toBe('a new item');

        });
    });
});