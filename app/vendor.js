import 'jquery-ui/themes/base/core.css';
import 'angular-material/angular-material.min.css';
import 'css/bootstrap.min.css';
import 'css/datetimepicker.css';
import 'animate.css/animate.min.css';
import 'fullpage.js/jquery.fullPage.css';
import 'css/ui-tools.css';
import 'css/icon.css';
import 'css/style.css';

import Raven from 'raven-js';

import 'bootstrap-datetime-picker';
import 'ng-raven';
import 'angular-ui-router';
import 'angular-resource';
import 'angular-material';
import 'angular-cookies';
import 'angular-modal-service';
import 'angular-cookies';
import 'angular-animate';
import 'ng-infinite-scroll';
import 'ng-dialog';
import 'jquery-ui';

window.$ = window.jQuery = require('jquery');
window.echarts = require('echarts');

Raven
  .config('http://c09de43f02f64d188601f5ad301c1fba@114.55.82.117/2')
  .addPlugin(require('raven-js/plugins/angular'), require('angular'))
  .install();

require('bootstrap');
require('jquery-migrate');
require('bootstrap/echarts-theme');
