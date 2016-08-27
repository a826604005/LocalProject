(function(){
    function config($stateProvider, $urlRouterProvider, $httpProvider) {

        //$urlRouterProvider.otherwise('/project_list');
        //
        //var apiInterceptor = function($q, API_HOST, PASSPORT_HOST, $cookieStore, $cookies, $location) {
        //    return {
        //        request: function(config) {
        //            if (config.url.indexOf('/') == 0) {
        //                config.url = API_HOST + config.url;  // 请求url没有host，自动加上
        //                // 添加基础参数，比如用户id&登录token
        //                config.params = config.params? config.params: {};
        //                //config.params._id = $cookies.get('logging_user_id') || '';
        //                //config.params._token = $cookies.get('logging_token') || '';
        //                config.params._id = '7768';
        //                config.params._token = 'sYG7fEFK0d2RTM6TCUL7ZUaDCs7WrRbw+x0kzE2tACk=';
        //                //if (config.params._id && config.params._token && !Raven.getContext().user){
        //                //    Raven.setUserContext({
        //                //        id: config.params._id
        //                //    });
        //                //}
        //            }
        //            return config;
        //        },
        //        responseError: function(rejection) {
        //            // do something when status != 200
        //            // todo
        //            switch(rejection.status) {
        //                case 401:
        //                    break;
        //                case 403:
        //                    if ($cookies.get('logging_token')){
        //                        $cookies.remove('logging_token');
        //                    }
        //                    if ($cookies.get('logging_user_id')){
        //                        $cookies.remove('logging_user_id');
        //                    }
        //                    window.location.href = PASSPORT_HOST + '/login?returnUrl=' + encodeURI($location.absUrl());
        //                    break;
        //                default:
        //                    break
        //            }
        //            return $q.reject(rejection);
        //        }
        //    };
        //};
        //$httpProvider.interceptors.push(apiInterceptor);

        $stateProvider
          .state('content', {
              abstract: true,
              templateUrl: 'view/common/content.html'
          })
          .state('home', {
              url: '/home',
              parent: 'content',
              templateUrl: 'view/home.html',
              controller: 'homeCtrl'
          })
          .state('news', {
              url: '/news',
              parent: 'content',
              templateUrl: 'view/news.html',
              controller: 'newsCtrl'
          })
          .state('cropImg', {
              url: '/cropImg',
              parent: 'content',
              templateUrl: 'view/toolPages/cropperImg.html'
          })
    }
    angular
      .module('localProject')
      .config(config)
      .run();
})();