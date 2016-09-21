import './style.css';
import echartsConfig from './config';

const TITLE = '首页 丨 FellowData';
const KEYCODE_ENTER = 13;

const TREND_SEARCH_KEYWORDS = [ '蚂蚁金服', '阿里巴巴', '百度', '滴滴打车' ];
const PROJECT_ITEM_WIDTH = 240 * 2 - 60;
const INTRO_LIMIT = 35;

~function() {
  let $hiddenDom = document.createElement('span');

  $hiddenDom.setAttribute('id', 'hidden-dom');

  $hiddenDom.setAttribute('style', `\
    visibility: hidden;\
    position: absolute\
  `);

  document.body.appendChild($hiddenDom);
}();

function shortenText(value) {
  let $dom = document.querySelector('#hidden-dom');

  $dom.innerHTML = '';

  for (let i in value) {
    $dom.innerHTML += value[i];
    let width = $dom.getBoundingClientRect().width;

    if (width >= PROJECT_ITEM_WIDTH) {
      return $dom.innerHTML + '...';
    }
  }

  return value;
}

class Ctrl {
  constructor(
    $scope,
    $q,
    Projects,
    Project
  ) {
    document.title = TITLE;
    
    let $chartContainer = document.querySelector('#chart-container');
    let chart = echarts.init($chartContainer);
    let projectStatParams = {
      all_project_count: true,
      good_project_count: true,
      group_by: 'biz_domain'
    };
    let projectParams = {
      start: 0,
      limit: 8,
      order_by: '-last_round_created_at'
    }; 

    $q.all([
      Project.get(Object.assign({ type: 'stat' }, projectStatParams)).$promise,
      Projects.get(projectParams).$promise
    ]).then(raw => {
      let projectStatData = raw[0];
      let projectsData = raw[1];

      this.totalProjects = projectStatData.all_project_count;
      this.uniqueProjects = projectStatData.good_project_count;

      echartsConfig.xAxis.data = [];
      echartsConfig.series[0].data = [];

      projectStatData.group_by.biz_domain.forEach(raw => {
        for (let i in raw) {
          echartsConfig.xAxis.data.push(i);
          echartsConfig.series[0].data.push(raw[i]);
        }
      });

      chart.setOption(echartsConfig);

      projectsData.projects.forEach(project => {
        let { brief_intro } = project;
        project.brief_intro = shortenText(brief_intro);
      });

      this.projects = projectsData.projects;
    });

    this.trendKeywords = TREND_SEARCH_KEYWORDS;
    this.keyword = '';
    this.currentSlideIndex = 1;

    this.search = function(e) {
      if (e) {
        let { keyCode } = e;

        if (+keyCode !== KEYCODE_ENTER) return;
      }

      if (!this.keyword.trim()) return;

      $scope.$root.$state.go('search',{ q: this.keyword });
    };

    this.setupQrcode();
    this.setupScroll($scope);
  }

  setupQrcode() {
    let $container = document.querySelector('#wechat-qrcode');
    let $dom = document.querySelector('.qrcode-container');

    $container.addEventListener('mouseenter', _ => $dom.style.display = 'block');
    $container.addEventListener('mouseleave', _ => $dom.style.display = 'none');
  }

  setupScroll($scope) {
    let $dom = document.querySelector('.home-load-page');
    let $header = document.querySelector('#header');

    $dom.addEventListener('scroll', _ => {
      let { scrollTop } = $dom;

      if (scrollTop > $header.clientHeight) {
        $header.setAttribute('style', `\
          background-color: #374256;
        `);
      } else {
        $header.setAttribute('style', `\
          background-color: transparent;
        `);
      }
    });
  }
}

Ctrl.$inject = [
  '$scope',
  '$q',
  'Projects',
  'Project'
];

export default Ctrl;
