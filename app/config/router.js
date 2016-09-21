import Content from 'pages/common/content/router';
import Home from 'pages/home/router';

export default ($StateProvider,$UrlRouterProvider) => {
  $UrlRouterProvider.otherwise('/home');

  $StateProvider
    .state('content', Content)
    .state('home', Home);
}