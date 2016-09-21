import './style.css';
import $tpl from './index.html';

const HOME_ROUTER_NAME = 'home';
const SEARCH_ROUTER_NAME = 'search';
const TIMELINE_ROUTER_NAME = 'timeline';
const HOME_BG_COLOR = '#374256';
const KEYCODE_ENTER = 13;
const HEADER_GAP = 30;
const CAN_SEND_PRIVATE_LETTER = [ 1, 2, 3, 4 ];
const CAN_GET_PROJECT_TIMELINE = [ 3 ];
const CAN_GET_PROJECTS = [ 2 ];
const CAN_CHANGE_ROLE = [ 1, 4, 5 ];

export default ($rootScope, $state, Status) => {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: $tpl,
    link: ($scope, $el) => {
      let vm = {
        keyword: '',
        isSearchShow: false
      };
      let defaultBgColor = 'transparent';

      $scope.$$postDigest(_ => {
        let { name } = $state.current;
        if (name !== HOME_ROUTER_NAME) defaultBgColor = HOME_BG_COLOR;

        $el[0].style.backgroundColor = defaultBgColor;
      });

      $rootScope.$on('$stateChangeStart', (_, toState) => {
        let { name } = toState;

        if (name === HOME_ROUTER_NAME) {
          defaultBgColor = 'transparent';
          vm.isSearchShow = false;
          vm.isAppDownloadShow = false;
        } else {
          defaultBgColor = HOME_BG_COLOR;
          vm.isSearchShow = true;
          vm.isAppDownloadShow = true;
        }

        if (name === TIMELINE_ROUTER_NAME) {
          Status.get({ type: 'checked_set', set: true }).$promise
            .then(_ => vm.unreadStatus = 0);
        }

        $scope.$$postDigest(_ => {
          if (name === SEARCH_ROUTER_NAME) {
            let queryString = location.hash.match(/search\/(.*)/)[1];
            vm.keyword = decodeURIComponent(queryString);
          }
        });

        $el[0].style.backgroundColor = defaultBgColor;
      });

      Status.get({ type: 'unchecked_count' }).$promise
        .then(raw => vm.unreadStatus = raw.total >= 100 ? '99+' : raw.total);

      vm.canSendPrivateLetter = _ => {
        return ~CAN_SEND_PRIVATE_LETTER.indexOf(+$scope.$root.user.role);
      };

      vm.canGetProjectTimeline = _ => {
        return ~CAN_GET_PROJECT_TIMELINE.indexOf(+$scope.$root.user.role);
      };

      vm.canGetProjects = _ => {
        return ~CAN_GET_PROJECTS.indexOf(+$scope.$root.user.role);
      };

      vm.canChangeRole = _ => {
        return ~CAN_CHANGE_ROLE.indexOf(+$scope.$root.user.role);
      };

      vm.search = e => {
        let { keyCode } = e;

        if (+keyCode === KEYCODE_ENTER && vm.keyword.trim()) {
          $state.go('search', { q: vm.keyword.trim() });
        }
      }

      $scope.vm = vm;
    }
  };
};

