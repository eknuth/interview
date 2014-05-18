angular.module('interview.services', [])
    .factory('items', function() {
        var items = [];
        return {
            getAll: function(name) {
                return items;
            }
        }
    });