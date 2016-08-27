(function() {
    'use strict';

    angular
        .module('localProject', [
            'ui.router',
            'ngJcrop'
        ])
        .constant('API_HOST', 'http://dataapi-staging.fellowplus.com')
        .constant('PASSPORT_HOST', 'https://passport.fellowplus.com')
})();