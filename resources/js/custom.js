(function(){
  function mainCtrl($scope) {

  }
  function homeCtrl($scope) {

  }
  function newsCtrl($scope) {

  }
  function menuCtrl($scope) {

  }
  function topnavbarCtrl($scope) {

  }
  function CropperImageCtrlUpload($scope,DateService){
    console.log(DateService.format(new Date(),'yyyy-mm-dd'));
    $scope.obj = {src:"", selection: [], thumbnail: true};
  }
  angular
    .module('localProject')
    .controller('mainCtrl', ['$scope',mainCtrl])
    .controller('homeCtrl', ['$scope',homeCtrl])
    .controller('topnavbarCtrl', ['$scope',topnavbarCtrl])
    .controller('menuCtrl', ['$scope',menuCtrl])
    .controller('newsCtrl', ['$scope',newsCtrl])
    .controller('CropperImageCtrlUpload',['$scope','DateService',CropperImageCtrlUpload])
    .config(function(ngJcropConfigProvider){
      ngJcropConfigProvider.setJcropConfig('upload', {
        bgColor: 'black',
        bgOpacity: .4,
        aspectRatio: 1,
        maxWidth: 300,
        maxHeight: 300
      });
    })
})();