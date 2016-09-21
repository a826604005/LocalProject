class Ctrl {
  constructor(
    $scope,
    $state,
    $http,
    ModalService
  ) {
    let menutimeout = null;

    $scope.select = link => $state.go(link);

    public_fellowdata.initPage = initPage;

    initPage();
    nimationEnd();

    //页面重新设置
    $(window).resize(_ => {
      initPage();

      public_fellowdata.commonInitFun.forEach(func => {
        if (typeof func === 'function') func.call(public_fellowdata.commonInitFun);
      });
    });

    //处理菜单动画效果
    $(".ui-layout-west").hover(function(){
      $(".home-seacon-val").width(727);
      $(".home-seacon-prompt,.home-seacon-list").hide();
      public_fellowdata.menuopenFlag = "open";
      resizeBox("menubox","west_open");
        //resizeBox("centerbox","center_open");
      },function(){
        if(menutimeout!=null){
          clearTimeout(menutimeout);
        }
        menutimeout = setTimeout(function(){
         if(public_fellowdata.mouseoutFlag) return;
         $(".ui-accordion-header-icon,.menu-link,.not-online-box").hide();
         public_fellowdata.menuopenFlag = "close";
         resizeBox("menubox","west_close");
            //resizeBox("centerbox","center_close");
          },100);
      });

    //动画执行函数
    function resizeBox(id,animationName){

      var x = document.getElementById(id),
      progressStr = animationName + " 0.1s linear 0s 1 alternate forwards";
      x.style.WebkitAnimation = progressStr;
      x.style.animation = progressStr;
      animationName == 'west_open' ? $('.ui-layout-west').addClass('ui-layout-west-in') : $('.ui-layout-west').removeClass('ui-layout-west-in');
    }


    //动画的结束事件统一绑定(防止重复绑定)
    function nimationEnd(){
      var ids = ["menubox","centerbox"];
      for(var i = 0; i < ids.length; i++){
        var x = document.getElementById(ids[i]);
        if(x){
          x.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
            if(public_fellowdata.menuopenFlag && public_fellowdata.menuopenFlag == "open"){
              $(".ui-accordion-header-icon,.menu-link,.not-online-box").show();
            }else if(public_fellowdata.menuopenFlag && public_fellowdata.menuopenFlag == "close"){
              $(".ui-accordion-header-icon,.menu-link,.not-online-box").hide();
            }
            for(var i=0; i<public_fellowdata.commonInitFun.length; i++){
              if(typeof public_fellowdata.commonInitFun[i] == "function"){
                public_fellowdata.commonInitFun[i]();
              }
            }
          }, false);
          x.addEventListener("animationend", function(){ //动画结束时事件
            if(public_fellowdata.menuopenFlag && public_fellowdata.menuopenFlag == "open"){
              $(".ui-accordion-header-icon,.menu-link,.not-online-box").show();
            }else if(public_fellowdata.menuopenFlag && public_fellowdata.menuopenFlag == "close"){
              $(".ui-accordion-header-icon,.menu-link,.not-online-box").hide();
            }
            for(var i=0; i<public_fellowdata.commonInitFun.length; i++){
              if(typeof public_fellowdata.commonInitFun[i] == "function"){
                public_fellowdata.commonInitFun[i]();
              }
            }
          }, false);
        }
      }
      initPage();
    }

    //初始化左侧菜单栏
    var icons = {
      header: "ui-icon-triangle-1-s",
      activeHeader: "ui-icon-triangle-1-n"
    };
    public_fellowdata.accordion = $("#accordion").accordion({
      active: 1,
      icons: icons,
      heightStyle: "content",
      activate: function(event, ui) {
       $(".ui-menu-icon").each(function(){
        var imgsrc = $(this).attr("defsrc");
        $(this).attr("src",imgsrc);
      });
       var $header = ui.newHeader,
       defsrc = $header.find("img").attr("defsrc"),
       selsrc = $header.find("img").attr("selsrc");
       $header.find("img").attr("src",selsrc);
     }
   });

    setTimeout(function(){
        //处理左侧鼠标移出,菜单栏不隐藏
        $("body").mouseleave(function(e){
          var $ele = $(e.srcElement);
          if($ele.hasClass("memedaiMerchant") || $ele.hasClass("ui-layout-west")){
            public_fellowdata.mouseoutFlag = true;
          }
        });
        $("body").mouseenter(function(e){
          public_fellowdata.mouseoutFlag = false;
        });


        //封装插件部分
        $(".home-seacon-val").focus(function(){
          var val = $(this).val();
          if(val.length){
            $(".home-seacon-prompt").hide();
            $(".home-seacon-list").show();
          }else{
            $(".home-seacon-prompt").show();
            $(".home-seacon-list").hide();
          }

        });

        /*提示框消失的处理*/
        //点击空白处
        $("#centerbox").click(function(e){
          var $div = $(e.target);
          if(!($div.hasClass("home-seacon-val") ||
            $div.hasClass("home-seacon-prompt") ||
            $div.hasClass("home-seacon-list"))){
            $(".home-seacon-prompt,.home-seacon-list").hide();
        }

      });

        //输入内容后
        $(".home-seacon-val").keyup(function(){
          var val = $(this).val();
          if(val.length){
            $(".home-seacon-prompt").hide();
            $(".home-seacon-list").show();
          }else{
            $(".home-seacon-prompt").show();
            $(".home-seacon-list").hide();
          }
        });

        //点击提示框内容
        $(".home-prompt-list").click(function(){
          $(this).parent().hide();
        });
      },1);

    //页面滚动后
    $(".home-load-page").scroll(function(){
      $(".home-seacon-prompt,.home-seacon-list").hide();
    });
    
    $scope.showFeedback = function () {
      $http.get('/feedback', {params: {'page_url':encodeURI(location.href)}}).success(function(data){
        if(data.error_code == 0){
          ModalService.showModal({
            templateUrl: "views/mods/feedback-input.html",
            controller: function($scope,close) {
              $scope.feedbackContent ='';
              $scope.close = function(){
                close();
              }
              $scope.submit = function(){
                close();
                if(data.status == 'ok'){
                  var params = {
                    id:data.id,
                    content:$scope.feedbackContent
                  }
                  $http.get('/feedback', {params: params}).success(function(){
                    ModalService.showModal({
                      templateUrl: "views/mods/feedback.html",
                      controller: function ($scope, close) {
                        $scope.close = function () {
                          close();
                        }
                      }
                    });
                  });
                }
              }
            }
          });
        }
      })
    }
  }
}

Ctrl.$inject = [
  '$scope',
  '$state',
  '$http',
  'ModalService'
];

export default Ctrl;
