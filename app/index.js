import Config from 'bootstrap/config';
import Router from 'bootstrap/router';

import 'pages/common/index';
import 'common/api';
import 'common/directives/index';
import 'common/services/index';
import 'common/filters/index';

/**
 * 全局变量池
 * 创建人:姜应伟
 * 创建时间: 2016.01.28
 */
 window.public_fellowdata = {
  initPage: (flag) => {
    let bodyheight = $('#menubox').height()
      , seaconheight = $('.home-seacon-box').height()
      , conwidth = $('.home-seacon-box').width();

    $('#centerbox').height(bodyheight);
    $('.home-load-page').height(bodyheight - 50);

    let inplen = $('.home-seacon-box').width() - 
      $('.home-seaicon-box').width() - 
      4*$('.home-sealink-box').width() -
      20;

    $('.home-seacon-val').width(inplen);
  },
  gridObj : null, //公用的grid数据结构对象
  mouseoutFlag: false, //判断鼠标是否移出了浏览器
  menuopenFlag: "open", //标示菜单栏是打开还是关闭的状态
  commonInitFun: [],
  accordion: null,
  firstEnter:true,//第一次进入系统，在弹提示浏览器兼容时使用到
  timeout: 5000,     //ajax请求默认失效时限
  navi: (function(){
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    (!!ua.match(/applewebkit.*mobile.*/)) ? Sys.mobile = true :
    (!!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/)) ? Sys.ios = true :
    (ua.indexOf('android') > -1 || ua.indexOf('linux') > -1) ? Sys.android = true : false;

    return Sys;
  })(),
  verifyFlag:true,  //输入验证是否通过
  searchFlag: ['search','','',''],    //设置按下enter键时, 第一个代表触发时间的类型,第二个代表跳转的地址(url),第三个代表搜索内容(q),第四个代表id(id)
  alert: function(msg){
    var $alert = $('<div class="fme-dlg-box">').appendTo('body');
    $alert.load('/views/mods/alert-model.html',function(){
      $alert.find('.fem-confirm-selval').text(msg);
      $alert.find('.fme-dlg-btn').focus();
    });
    $alert.delegate('.fme-dlg-btn','click',function(){
      $alert.remove();
    });
  }
};

/**
 * 拓展功能型函数
 * 创建于 2016.2.12
 * 创建人 姜应伟
 */

//根据索引 dx 删除掉数组中对应的元素
Array.prototype.remove = function(dx)
{
  if(isNaN(dx)||dx>this.length){return false;}
  for(var i=0,n=0;i<this.length;i++)
  {
    if(this[i]!=this[dx])
    {
      this[n++]=this[i]
    }
  }
  this.length-=1
};
//根据下表插入元素
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

Date.prototype.utc2date = function (utc) {
  new Date(parseInt(utc) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
};

window.CookieTool = {
  setCookie : function(cname, cvalue, exdays){
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  getCookie : function(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  },
  clearCookie : function(name){
    setCookie(name, "", -1);
  }
};

window.fellowdata_tools = {
  formatChartData: function(data){
   var tempnum = parseInt(data);
   var lnum = '';
   if(tempnum >= 10000){
     lnum = (tempnum/10000).toFixed(2);
   }else{
     return "";
   }
   if(lnum){
     return '(' + lnum + '万)';
   }else{
     return '';
   }
 }
}

/****判断浏览器来确定是否弹框****/
var navi = (function(){
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
  (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
  (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
  (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
  (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
  (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

  (!!ua.match(/applewebkit.*mobile.*/)) ? Sys.mobile = true :
  (!!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/)) ? Sys.ios = true :
  (ua.indexOf('android') > -1 || ua.indexOf('linux') > -1) ? Sys.android = true : false;

  return Sys;
})();
var firstEnter = CookieTool.getCookie("firstEnter");
if( !firstEnter && !(navi.firefox || navi.safari || navi.chrome )){
  $('#checkNavi').show();
  CookieTool.setCookie("firstEnter",true,1);
};
$('body').on('click','#checkNavi a',function(){
  $('#checkNavi').hide();
});
$('body').on('click','#mobileNotice a',function(){
  $('#mobileNotice').hide();
});

if( navi.mobile || navi.ios || navi.android){
  $('#mobileNotice').show();
}

/****end判断浏览器来确定是否弹框****/

angular
  .module('fellowdata', [
    'ui.router',
    'angularModalService',
    'ngResource',
    'ngDialog',
    'ngMaterial',
    'ngAnimate',
    'ngCookies',
    'ngRaven',
    'infinite-scroll',
    'fellowdata.api',
    'fellowdata.common',
    'fellowdata.directives',
    'fellowdata.services',
    'fellowdata.filters'
  ])
  .constant('API_HOST', 'http://dataapi.fellowplus.com')
  .constant('ROUNDS', ['种子轮/天使轮', 'Pre-A轮', 'A轮', 'B轮', 'C轮', 'D轮', '成熟期', 'IPO'])
  .constant('DOMAINS', [
    '汽车交通', '游戏动漫', '旅游户外', '社交网络',
    '广告营销', '生活服务', '硬件', '文化娱乐',
    '金融', '工具软件', '教育培训', '电子商务',
    '媒体', '房产家居', '医疗健康', '企业服务'])
  .constant('PASSPORT_HOST', 'https://passport.fellowplus.com')
  .config(Config)
  .config(Router)
  .run(['$rootScope', '$state', ($rootScope, $state) => $rootScope.$state = $state ]);
